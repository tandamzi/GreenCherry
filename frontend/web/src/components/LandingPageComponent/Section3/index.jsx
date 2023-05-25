import React from 'react';

import Image from 'next/image';

import style from './index.module.scss';

const Section3 = () => {
  return (
    <div className={`${style['section-item']}`}>
      <div className={`${style['image-container']}`}>
        <Image
          src="/assets/images/saving-money.svg"
          width={462}
          height={462}
          alt="saving-money"
          className={`${style['saving-money']}`}
        />
      </div>
      <div>
        <p className={`${style['sub-text']}`}>
          환경도 지키고 합리적인 가격에 <br /> 만나보는 체리박스.
        </p>
        <h2 className={`${style['title-text']}`}>
          최대
          <span className={`${style.emphasis}`}>70%</span>
          <br />
          할인된 가격에 <br />
          만나보세요! <br />
        </h2>
      </div>
    </div>
  );
};

export default Section3;
