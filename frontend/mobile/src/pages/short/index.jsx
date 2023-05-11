import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import Container from '@/components/Container';
import createYoutubeIntstacne from '@/utils/youtube';

const Short = () => {
  const youtube = createYoutubeIntstacne();
  const [videos, setVideos] = useState([]);
  const API_KEY = 'AIzaSyDqpr0jDZkl6gn60l0jTef3R2PvWJHmqnc';
  // API_KEY 100번이상 호출시, 콜백에러

  useEffect(() => {
    try {
      youtube
        .get(
          `search?part=snippet&type=video&key=${API_KEY}&q=toogoodtogo&maxResults=10&order=date&videoDuration=short`,
        )
        .then(response => {
          const itemRandom = Math.floor(Math.random() * 10);
          setVideos(response.data.items);
        });
    } catch (error) {
      // console.log('api error : ', error);
    }
  }, []);

  return (
    <Container>
      <Container.SubPageHeader title="short" />
      <Container.MainBody>
        <div>쇼츠 페이지 입니다</div>
        <div>
          <ul>
            {videos &&
              videos.map(video => (
                <li key={video.id.videoId}>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={video.snippet.thumbnails.default.url}
                      alt={video.snippet.title}
                      width={640}
                      height={360}
                    />
                    <p>{video.snippet.title}</p>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Short;
