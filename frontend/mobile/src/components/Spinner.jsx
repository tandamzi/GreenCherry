import React from 'react';
import Lottie from 'react-lottie-player';

import forkSpoonLoading from '@public/assets/lottie/forkSpoonLoading.json';

import Container from './Container';

function Spinner() {
  const options = {
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // 애니메이션의 종횡비 유지
    },
  };
  return (
    <Container>
      <Container.Body>
        <Lottie
          loop
          animationData={forkSpoonLoading}
          play
          option={options}
          speed={0.7}
        />
      </Container.Body>
    </Container>
  );
}

export default Spinner;
