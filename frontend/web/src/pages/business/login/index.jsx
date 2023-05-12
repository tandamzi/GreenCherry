import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import style from './index.module.scss';

import Container from '@/components/Container';

const Login = () => {
  return (
    <Container>
      <Container.MainHeader />
      <Container.MainBody className="bg-secondary h-full">
        <div className="text-bgcolor text-center mb-24">
          <h1 className="text-7xl mb-6">LOGIN INTO MYSTORE</h1>
          <h3 className="text-4xl font-thin">남은 음식을 수익으로 바꿔봐요</h3>
        </div>
        <div className={style['login-container']}>
          <Link
            href={`http://k8C207.p.ssafy.io:5000/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_OAUTH2_BUSINESS_REDIRECT_URI}`}
            className={`${style['kakao-btn']}`}
          >
            <div className={`${style['login-btn-img']}`} />
            카카오로 로그인하기
          </Link>

          <Link
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorize/google?redirect_uri=${process.env.NEXT_PUBLIC_OAUTH2_BUSINESS_REDIRECT_URI}`}
            className={`${style['google-btn']}`}
          >
            <div className={style['login-btn-img']} />
            <p>구글로 로그인하기</p>
          </Link>
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Login;
