import React, { useState, useEffect, useRef } from 'react';

import cn from 'classnames';
import Image from 'next/image';

import style from './index.module.scss';

const data = [
  {
    id: 1,
    content: (
      <div>
        <p className="text-bgcolor text-center text-2xl leading-none	">
          먹기도 전에 버려지는 음식 <br />
          <div className="text-warning mt-4 text-5xl font-bold">
            약 3,000만톤 <br />
          </div>
          <div className="mt-2">
            Green Cherry는 <br />
            여기에 집중했습니다.
          </div>
        </p>
      </div>
    ),
    imgSrc: `/assets/icons/etcIcons/crying-face.svg`,
  },
  {
    id: 2,
    content: (
      <div>
        <p className="text-bgcolor text-5xl leading-none	">
          절약적인
          <br />{' '}
          <span className="text-pass font-bold">
            소비가
            <br />
          </span>{' '}
          가능해요!
        </p>
      </div>
    ),
    imgSrc: `/assets/icons/etcIcons/crying-face.svg`,
  },
  {
    id: 3,
    content: (
      <div>
        <p className="text-bgcolor text-5xl leading-none	">
          절약적인
          <br />{' '}
          <span className="text-pass font-bold">
            소비가
            <br />
          </span>{' '}
          가능해요!
        </p>
        <p className="text-bgcolor text-5xl leading-none mt-10	">
          손해를 <br />
          <span className="text-danger font-bold ">
            수익으로
            <br />
          </span>{' '}
          전환해요!
        </p>
      </div>
    ),
    imgSrc: `/assets/icons/etcIcons/crying-face.svg`,
  },
  {
    id: 4,
    content: 'Page 4',
    imgSrc: `/assets/icons/etcIcons/crying-face.svg`,
  },
];

const intro = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
          'z-20 px-4 py-6 shadow-lg rounded-b-xl bg-bgcolor',
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

      {data.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(style.slide, {
            [style.active]: index === currentSlide,
          })}
        >
          <div>
            <div className="text-bgcolor text-2xl leading-none	">
              소비자는
              <br /> <span className="text-5xl text-warning">지출을</span>{' '}
              줄이고
            </div>
            <div className="text-bgcolor text-2xl leading-none mt-10	">
              판매자는 <br />
              <span className="text-danger font-bold ">
                손해를
                <span className="text-pass">수익으로</span>
              </span>
            </div>
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
    </div>
  );
};

export default intro;
