/* eslint-disable react/button-has-type */
import React from 'react';
import Lottie from 'react-lottie-player';

import foodfall from '@public/assets/lottie/food fall.json';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Container from '@/components/Container';

const login = () => {
  const router = useRouter();

  return (
    <Container>
      <div className=" bg-itembg relative h-full w-full">
        <Lottie
          className="w-full h-full bg-itembg"
          loop
          animationData={foodfall}
          play
          speed={1.2}
        />
        <div>
          <Link href="http://k8C207.p.ssafy.io:5000/oauth2/authorize/kako?redirect_uri=http://localhost:3000/redirect">
            <Image
              className=" absolute bottom-48 m-auto left-0 right-0"
              src="/assets/logo/kakaoLogin.svg"
              width={250}
              height={180}
              alt="kakaoLogin"
            />
          </Link>
          <Link href="http://k8C207.p.ssafy.io:5000/oauth2/authorize/google?redirect_uri=http://localhost:3000/redirect">
            <Image
              className=" absolute bottom-32 m-auto left-0 right-0"
              src="/assets/logo/googleLogin.svg"
              width={250}
              height={180}
              alt="googleLogin"
            />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default login;
