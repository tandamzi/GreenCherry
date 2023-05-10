import React from 'react';

import classnames from 'classnames';

import useMember from '@/hooks/memberHook';

const CarbonCircleContainer = ({ amount, className }) => {
  const { memberAttributes } = useMember();
  return (
    <div
      className={classnames(
        'bg-secondary text-bgcolor text-center rounded-full shadow-second text-',
        className,
      )}
    >
      {memberAttributes.storeName} 가게는 <br />
      <span className="font-bold">
        {amount}Kg CO<sub>2</sub>e
      </span>
      <br /> 만큼 줄였어요!
    </div>
  );
};

export default CarbonCircleContainer;
