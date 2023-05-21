/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie-player';

import foodfall from '@public/assets/lottie/food fall.json';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import style from '../index.module.scss';

import Container from '@/components/Container';

const login = () => {
  const defferedPropmt = useRef(null);

  const topSheetRef = useRef(false);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(prev => !prev);
  };

  useEffect(() => {
    const beforeInstallPromptHandler = e => {
      e.preventDefault();
      defferedPropmt.current = e;
      setShow(true); // 모달을 보이도록 설정
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler,
      );
    };
  }, []);
  const installApp = () => {
    if (!defferedPropmt.current) {
      return false;
    }

    defferedPropmt.current.prompt();
    defferedPropmt.current.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        return 'User accepted the A2HS prompt';
      }
      // 설치 하지 않았을 때
      return 'User dismissed the A2HS prompt';
    });
    return true;
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (topSheetRef.current && !topSheetRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [topSheetRef]);
  return (
    <Container>
      {show && (
        <div
          onClick={showModal} // Overlay 클릭 시 모달 닫힘
          style={{
            position: 'fixed', // 화면 전체를 차지하도록
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경색을 약간 투명하게
            zIndex: 11, // 다른 요소보다 앞에 보이도록
          }}
        />
      )}

      <div
        className={cn(
          'z-20 px-4 shadow-lg rounded-b-xl bg-bgcolor',
          style.topSheet,
          style[`${show ? 'show' : ''}`],
        )}
        ref={topSheetRef}
      >
        <div className="flex w-full items-center justify-center mt-4">
          <span className="text-center">
            <span className="text-secondary font-bold">Green</span>{' '}
            <span className="text-primaryevent font-bold"> Cherry</span>는 앱을
            지원합니다.
            <br />
            <span className="text-xl">설치하시겠습니까?</span>
          </span>
        </div>
        <div className="flex justify-center w-full mt-5">
          <button
            type="button"
            className={cn(
              style.topSheetBtn,
              'w-1/5 p-2 mx-0.5 rounded-full text-primaryfont',
            )}
            onClick={installApp}
          >
            설치
          </button>
          <button
            type="button"
            className={cn(
              style.topSheetBtn,
              'w-1/5 p-2 mx-0.5 rounded-full text-primaryfont',
            )}
            onClick={() => setShow(false)}
          >
            취소
          </button>
        </div>
      </div>
      <div className=" bg-itembg relative h-full w-full">
        <Lottie
          className="w-full h-screen bg-itembg"
          loop
          animationData={foodfall}
          play
          speed={1.2}
        />
        <div>
          <Link
            href={`${process.env.NEXT_PUBLIC_LOGIN_SERVER_URI}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_OAUTH2_REDIRECT_URI}`}
          >
            <Image
              className=" absolute bottom-48 m-auto left-0 right-0"
              src="/assets/logo/kakaoLogin.svg"
              width={250}
              height={180}
              alt="kakaoLogin"
            />
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_LOGIN_SERVER_URI}/oauth2/authorize/google?redirect_uri=${process.env.NEXT_PUBLIC_OAUTH2_REDIRECT_URI}`}
          >
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
