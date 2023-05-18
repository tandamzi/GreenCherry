import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

import Image from 'next/image';

import Container from '@/components/Container';
import clientHttp from '@/utils/csr/clientHttp';
import createYoutubeIntstacne from '@/utils/youtube';

const Short = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    clientHttp.get(`home/youtube-short`).then(res => {
      setVideos(res.data);
    });
  }, []);
  // API_KEY 100번이상 호출시, 콜백에러
  const opts = {
    height: '224',
    width: '126',
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
      <Container.MainBody>
        <div className="grid grid-cols-3">
          {videos &&
            videos.map((item, idx) => {
              return <YouTube opts={opts} videoId={item.videoId} key={idx} />;
            })}
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Short;
