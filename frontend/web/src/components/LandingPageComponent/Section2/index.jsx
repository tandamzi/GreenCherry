import React from 'react';

import Image from 'next/image';

import style from './index.module.scss';

const Section2 = () => {
  const [device, setDevice] = React.useState('');
  React.useEffect(() => {
    setDevice(navigator.userAgent);
  }, []);
  return (
    <div className={`${style['section-item']}`}>
      <div className={`${style['text-container']}`}>
        <p className={`${style['sub-text']}`}>
          음식점과 가정에서 버려지는 음식
        </p>
        <h2 className={`${style['title-text']}`}>약 11,000만톤</h2>
        <p className={`${style['sub-text']}`}>
          이 중 먹기도 전에 버지는 음식
          <br /> 약 <span className={`${style.emphasis}`}>3000만 </span> 톤
        </p>
      </div>
      {device}
      <div className={`${style['image-container']}`}>
        <Image
          src="/assets/images/save-earth.svg"
          width={498}
          height={498}
          alt="save-earth"
          className={`${style['save-earth']}`}
        />
      </div>
    </div>
  );
};

export default Section2;
