import React from 'react';
import Lottie from 'react-lottie-player';

import foodfall from '@public/assets/lottie/food fall.json';
import Image from 'next/image';

import Container from '@/components/Container';

const login = () => {
  return (
    <Container>
      <div className=" bg-itembg">
        <Lottie loop animationData={foodfall} play speed={1.2} />
        <Image
          className=" absolute bottom-40"
          src="/assets/icons/selectBoxIcons/orderBox.svg"
          width={180}
          height={180}
          alt="greencherry orderBox"
        />
      </div>
    </Container>
  );
};

export default login;
