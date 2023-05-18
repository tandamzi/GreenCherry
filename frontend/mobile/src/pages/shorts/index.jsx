/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

import Image from 'next/image';

import Container from '@/components/Container';
import clientHttp from '@/utils/csr/clientHttp';
import createYoutubeIntstacne from '@/utils/youtube';

const Shorts = () => {
  const [videos, setVideos] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    clientHttp.get(`home/youtube-short`).then(res => {
      setVideos(res.data);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getVideoWidth = () => {
    if (windowWidth >= 768) {
      // 화면 너비가 768px 이상인 경우
      return windowWidth / 3;
    } else if (windowWidth >= 480) {
      // 화면 너비가 480px 이상인 경우
      return windowWidth / 2;
    } else {
      // 화면 너비가 480px 미만인 경우
      return windowWidth;
    }
  };

  const opts = {
    height: '224',
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
    },
  };

  return (
    <Container>
      <Container.SubPageHeader title="short" />
      <div className="grid grid-cols-3 justify-items-center ">
        {videos &&
          videos.map((item, idx) => {
            const videoWidth = getVideoWidth();
            return (
              <YouTube
                opts={opts}
                videoId={item.videoId}
                key={idx}
                width={videoWidth}
              />
            );
          })}
      </div>
    </Container>
  );
};

export default Shorts;
