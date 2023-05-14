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
        <h2 className={`${style['title-text']}`}>
          절약적인 <br />
          소비가 <br />
          가능해요! <br />
        </h2>
        <p className={`${style['sub-text']}`}>
          <span className={`${style.emphasis}`}>
            현명한 소비습관 <br />
          </span>
          음식을 싸게 구해요 뭐라하지?
        </p>
      </div>
    </div>
  );
};

export default Section3;
