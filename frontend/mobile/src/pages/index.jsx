import React, { useState, useEffect, useRef } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';

import style from './index.module.scss';

const INTRO1_URL = `/assets/icons/introIcons/intro1.svg`;
const INTRO2_URL = `/assets/icons/introIcons/intro2.svg`;
const INTRO3_URL = `/assets/icons/introIcons/intro3.svg`;
const INTRO4_URL = `/assets/icons/introIcons/intro4.svg`;

const data = [
  {
    id: 1,
    content: (
      <div className="text-bgcolor text-center text-3xl leading-none	">
        먹기도 전에
        <br /> 버려지는 음식 <br />
        <span className="text-warning2 text-6xl font-bold">
          3,000만톤 <br />
        </span>
        <div className="text-bgcolor text-center text-3xl leading-none mt-1">
          이들의 가치
          <br />
          <span className="text-danger2 text-6xl font-bold">약 3조원</span>
        </div>
      </div>
    ),
    imgSrc: INTRO1_URL,
  },
  {
    id: 2,
    content: (
      <div className="text-bgcolor text-center text-3xl leading-none">
        <span>저희</span>
        <p className="text-6xl font-bold text-primaryevent">green cherry</p>
        <span>여기에 집중했습니다.</span>
      </div>
    ),
    imgSrc: INTRO2_URL,
  },
  {
    id: 3,
    content: (
      <div>
        <div className="text-bgcolor text-3xl leading-none -ml-9">
          <span className="ml-1"> 소비자는</span>
          <p className="text-6xl font-bold">
            <span className="text-warning2">합리적인</span> <br />
            <span className="text-pass2">소비를</span>
          </p>
        </div>
        <div className="text-bgcolor text-right text-3xl leading-none mt-4 -mr-9	">
          <span className="mr-1"> 판매자는 </span>
          <p className="text-danger2 text-6xl font-bold ">
            손해를 <p className="text-pass2">수익으로</p>
          </p>
        </div>
      </div>
    ),
    imgSrc: '',
  },
  {
    id: 4,
    content: (
      <div className="text-center">
        <div className="text-3xl text-bgcolor leading-none">
          <div>환경도 지키고</div>
          <div className="mt-0.5">지갑도 지키는</div>
        </div>
        <div className="text-primaryevent text-6xl my-1 font-bold">
          체리박스
        </div>
        <div className="text-bgcolor text-3xl leading-none  	">
          <span className="text-warning2 font-bold">지금 바로</span>
          <br />
          시작하세요
        </div>
      </div>
    ),
    imgSrc: INTRO4_URL,
  },
];

const intro = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === data.length - 1 ? 0 : prev + 1));
    }, 3000); // Every 3 seconds

    return () => clearInterval(timer);
  }, []);

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

  const goToLogin = () => {
    router.push(`/login`);
  };
  return (
    <div className={cn(style.intro, 'bg-secondary')}>
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
            <span className="text-secondary font-bold">Green</span>
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

      {data.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(style.slide, {
            [style.active]: index === currentSlide,
          })}
        >
          <div className="flex relative">
            <div className="absolute left-1/2 top-1/4 opacity-90 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative" style={{ width: 400, height: 400 }}>
                {slide.imgSrc && slide.imgSrc !== '' && (
                  <Image src={slide.imgSrc} fill alt={slide.id} />
                )}
              </div>
            </div>
            <div className="z-10 pb-40">{slide.content}</div>
          </div>
        </div>
      ))}

      <div className={cn(style.slideControls)}>
        {data.map((_, index) => (
          <button
            type="button"
            key={index}
            className={cn(style.slideButton, {
              [style.active]: index === currentSlide,
            })}
            onClick={() => setCurrentSlide(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className={cn(style.buttonControls)}>
        <button
          type="button"
          onClick={goToLogin}
          className=" text-primaryfont font-bold text-sm px-2 py-1.5  w-20 opacity-80"
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default intro;
