import React from 'react';

import Image from 'next/image';

import style from './index.module.scss';

const Section1 = () => {
  return (
    <div className={`${style['section-item']}`}>
      <h2 className={`${style['title-text']}`}>
        <span className={`${style['line-wrapper']}`}>지구상에서 굶주리는</span>
        <br />
        <span className={`${style.emphasis}`}>815만명</span>의 <br />
        사람들에게 <br />
        <span className={`${style['line-wrapper']}`}>
          1년 치 식량을 <span className={`${style.emphasis}`}>4번씩</span>
        </span>{' '}
        <br />
        주고도 남는 양 <br />
      </h2>

      <div className={`${style['image-container']}`}>
        <div className={`${style['image-relative']}`}>
          <Image
            src="/assets/images/money-growth.svg"
            width={156}
            height={156}
            alt="money-growth"
            className={`${style['money-growth']}`}
          />
          <Image
            src="/assets/images/love-ecology.svg"
            width={213}
            height={213}
            alt="love-ecology"
            className={`${style['love-ecology']}`}
          />
          <Image
            src="/assets/images/food-box.svg"
            width={400}
            height={400}
            alt="greencherry box"
            className={`${style['greencherry-box']}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Section1;
