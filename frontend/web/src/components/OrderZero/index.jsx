import React from 'react';

import Image from 'next/image';

import CarbonCircleContainer from '@/components/CarbonCircleContainer';

const OrderZero = () => {
  return (
    <div className="mt-10">
      <h2 className="text-center font-sans text-5xl tablet:text-4xl">
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
        <CarbonCircleContainer className="px-20 py-10 text-4xl leading-snug mt-5 tablet:px-10 tablet:text-3xl max-w-sm absolute top-40 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
};

export default OrderZero;
