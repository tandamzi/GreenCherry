import React from 'react';

import CarbonCircleContainer from '@/components/CarbonCircleContainer';
import useStore from '@/hooks/storeHook';

const BeforeOpen = () => {
  const totalStoreCount = 1231; // TODO: store count 가져오기
  const { storeAttributes } = useStore();
  return (
    <div className="h-full">
      <p className="text-center text-4xl mt-10 tablet:text-3xl">
        지금까지 얼마나 <br /> 지구를 <br />
        아꼈을까요?
      </p>
      <CarbonCircleContainer className="px-28 py-20 text-4xl leading-snug mt-5 tablet:px-10 tablet:text-3xl tablet:py-10" />
      <p className="text-center text-2xl mt-10 tablet:text-xl">
        지구를 생각하는 마음으로
        <br />
        지금까지 {totalStoreCount}가게들이 함께해주셨어요
      </p>
    </div>
  );
};

export default BeforeOpen;
