import React from 'react';

import Image from 'next/image';

import style from './index.module.scss';

const Section4 = () => {
  return (
    <div className={`${style['section-item']}`}>
      <div>
        <h2 className={`${style['title-text']}`}>
          손해를 <br />
          수익으로 <br />
          전환해요! <br />
        </h2>
        <p className={`${style['sub-text']}`}>
          <span className={`${style.emphasis}`}>
            그렇군요 <br />
          </span>
          음식을 팔아 뭐라하지?
        </p>
      </div>
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
    </div>
  );
};

export default Section4;
