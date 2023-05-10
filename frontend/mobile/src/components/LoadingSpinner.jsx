import React from 'react';
import Lottie from 'react-lottie-player';

import loading from '@public/assets/lottie/loading-process.json';

import Container from './Container';

function LoadingSpinner() {
  const options = {
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // 애니메이션의 종횡비 유지
    },
  };
  return (
    <Lottie loop animationData={loading} play option={options} speed={0.7} />
  );
}

export default LoadingSpinner;
