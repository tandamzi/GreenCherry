/* eslint-disable no-else-return */
import React, { useState, useEffect, useRef } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import YouTube from 'react-youtube';

import Image from 'next/image';

import Container from '@/components/Container';
import ShortsPlayModal from '@/components/modal/ShortsPlayModal';
import clientHttp from '@/utils/csr/clientHttp';
import createYoutubeIntstacne from '@/utils/youtube';

const Shorts = () => {
  const [videos, setVideos] = useState([]);

  const maxWidth = 575;
  const [videoWidth, setVideoWidth] = useState(() => {
    if (window.innerWidth <= maxWidth) {
      return parseInt(window.innerWidth / 3);
    } else {
      return parseInt(maxWidth / 3);
    }
  });

  useEffect(() => {
    clientHttp.get(`home/youtube-short`).then(res => {
      setVideos(res.data);
    });
  }, []);

  // 창의 크기가 변경될 때마다 너비 값을 업데이트
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= maxWidth) {
        setVideoWidth(parseInt(window.innerWidth / 3));
      } else {
        setVideoWidth(parseInt(maxWidth / 3));
      }
    };

    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const opts = {
    width: videoWidth,
    height: '220',
    playerVars: {
      controls: 0,
      loop: 1,
      disablekb: 1,
      autohide: 0,
      autoplay: 0,
      fs: 0,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      modestbranding: 1,
    },
  };

  return (
    <Container>
      <Container.SubPageHeader title="short" />
      <div className="grid grid-cols-3 justify-items-center">
        {videos &&
          videos.map((item, idx) => {
            return <YouTube opts={opts} videoId={item.videoId} key={idx} />;
          })}
      </div>
    </Container>
  );
};

export default Shorts;
