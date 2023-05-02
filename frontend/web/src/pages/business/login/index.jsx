import React from 'react';

import style from './index.module.scss';

import Container from '@/components/Container';

const Login = () => {
  return (
    <Container>
      <Container.MainHeader />
      <Container.MainBody className="bg-secondary">
        <div>
          <div className="text-bgcolor text-center mb-24">
            <h1 className="text-7xl mb-6">LOGIN INTO MYSTORE</h1>
            <h3 className="text-4xl font-thin">
              남은 음식을 수익으로 바꿔봐요
            </h3>
          </div>
          <div className={style['login-container']}>
            <button
              type="button"
              // onClick={() => socialLogin('kakao')}
              className={`${style['kakao-btn']}`}
            >
              <div className={`${style['login-btn-img']}`} />
              <p>카카오로 로그인하기</p>
            </button>

            <button
              type="button"
              // onClick={() => socialLogin('google')}
              className={`${style['google-btn']}`}
            >
              <div className={style['login-btn-img']} />
              <p>구글로 로그인하기</p>
            </button>
          </div>
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Login;
