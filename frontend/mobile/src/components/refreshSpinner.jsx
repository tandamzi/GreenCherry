import React from 'react';
import Lottie from 'react-lottie-player';

import refresh from '@public/assets/lottie/refresh.json';

function refreshSpinner() {
  const options = {
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // 애니메이션의 종횡비 유지
    },
  };
  return (
    <Lottie loop animationData={refresh} play option={options} speed={0.7} />
  );
}

export default refreshSpinner;
