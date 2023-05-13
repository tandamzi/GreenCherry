import React from 'react';

import Image from 'next/image';

import style from './index.module.scss';

const Section2 = () => {
  return (
    <div className={`${style['section-item']}`}>
      <div className={`${style['text-container']}`}>
        <h2 className={`${style['title-text']}`}>환경을 생각해요!</h2>
        <p className={`${style['sub-text']}`}>
          <span className={`${style.emphasis}`}>
            지구를 위한 작은 소비 <br />
          </span>
          버려질 위기의 음식을 구해서 환경을 살리는
          <br /> 가치있는 소비에 동참해주세요!
        </p>
      </div>

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
