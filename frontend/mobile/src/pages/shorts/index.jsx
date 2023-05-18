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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const videosRef = useRef(null);

  const openModal = (videoId, index) => {
    setSelectedVideoId(videoId);
    setCurrentIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedVideoId('');
    setCurrentIndex(0);
    setModalIsOpen(false);
  };

  const handleModalClose = () => {
    closeModal();
    scroll.scrollToTop();
  };

  const handleVideoEnd = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setSelectedVideoId(videos[currentIndex + 1].videoId);
    }
  };

  const handleModalScroll = () => {
    const modalContent = document.querySelector('.modal-content');
    if (
      modalContent.scrollTop + modalContent.clientHeight >=
      modalContent.scrollHeight
    ) {
      handleVideoEnd();
    }
  };

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
      rel: 0,
      iv_load_policy: 3,
      modestbranding: 1,
    },
  };

  return (
    <Container>
      <Container.SubPageHeader title="short" />
      <div className=" justify-items-center">
        {/* {videos &&
          videos.map((item, idx) => {
            return <YouTube opts={opts} videoId={item.videoId} key={idx} />;
          })} */}
        {videos &&
          videos.map((item, idx) => {
            return (
              <div
                className="mb-3 flex flex-row"
                key={idx}
                onClick={() => openModal(item.videoId, idx)}
              >
                <Image
                  className="rounded-lg"
                  src={item.thumbnails.standard.url}
                  alt="Thumbnail"
                  width={videoWidth}
                  height={300}
                />
                <p className="ml-3 font-bold text-sm">{item.title}</p>
              </div>
            );
          })}
        <div>
          <div
            type="button"
            onClick={e => {
              setModalIsOpen(prev => !prev);
            }}
          >
            {' '}
            modal
          </div>
        </div>
      </div>
      <ShortsPlayModal
        selectedVideoId={selectedVideoId}
        videos={videos}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        handleModalScroll={handleModalScroll}
        currentIndex={currentIndex}
        handleVideoEnd={handleVideoEnd}
      />
    </Container>
  );
};

export default Shorts;
