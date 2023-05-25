import React from 'react';

import Image from 'next/image';

import CarbonCircleContainer from '@/components/CarbonCircleContainer';

const OrderZero = () => {
  return (
    <div className="mt-5 flex flex-col items-center">
      <h2 className="text-center font-sans text-4xl tablet:text-2xl">
        아직 주문이 안 들어왔어요!
      </h2>
      <div className="relative">
        <Image
          src="/assets/images/food-box.svg"
          width={386}
          height={69}
          alt="greencherry box"
          className="mx-auto opacity-50 max-w-md width-full"
        />
        <CarbonCircleContainer className="px-10 py-10 text-3xl leading-snug mt-5 tablet:text-2xl tablet:py-5 tablet:w-5/6 absolute top-40 w-11/12 -translate-x-1/2 left-1/2" />
      </div>
    </div>
  );
};

export default OrderZero;
