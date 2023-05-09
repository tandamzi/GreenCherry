import React from 'react';

import CarbonCircleContainer from '@/components/CarbonCircleContainer';

const BeforeOpen = () => {
  const totalStoreCount = 1231; // TODO: store count 가져오기
  return (
    <div>
      <p className="text-center text-4xl mt-10">
        지금까지 얼마나 <br /> 지구를 <br />
        아꼈을까요?
      </p>
      <CarbonCircleContainer
        className="px-28 py-20 text-4xl leading-snug mt-5"
        amount={10000}
      />
      <p className="text-center text-2xl mt-10">
        지구를 생각하는 마음으로
        <br />
        지금까지 {totalStoreCount}가게들이 함께해주셨어요
      </p>
    </div>
  );
};

export default BeforeOpen;
