import React from 'react';

import Image from 'next/image';

import style from './index.module.scss';

const Section4 = () => {
  return (
    <div className={`${style['section-item']}`}>
      <div className={`${style['image-container']}`}>
        <div className={`${style['image-relative']}`}>
          <Image
            src="/assets/images/money.svg"
            width={91}
            height={91}
            alt="money"
            className={`${style.money}`}
          />
          <Image
            src="/assets/images/coins-chart.svg"
            width={294}
            height={294}
            alt="coins-chart"
            className={`${style['coins-chart']}`}
          />
          <Image
            src="/assets/images/money-bag.svg"
            width={342}
            height={342}
            alt="money-bag"
            className={`${style['money-bag']}`}
          />
        </div>
      </div>
      <div>
        <p className={`${style['sub-text']}`}>
          먹지않고 버려지는 <br />
          음식의 경제가치
        </p>
        <h2 className={`${style['title-text']}`}>
          약 <span className={`${style.emphasis}`}>3조</span>원
        </h2>
      </div>
    </div>
  );
};

export default Section4;
