import React from 'react';

import classnames from 'classnames';

import useMember from '@/hooks/memberHook';

const CarbonContainer = ({ amount, className }) => {
  const { memberAttributes } = useMember();
  return (
    <div
      className={classnames(
        'bg-secondary opacity-50 text-bgcolor w-full text-3xl text-center rounded-full py-2 shadow-second',
        className,
      )}
    >
      {memberAttributes.storeName} 가게는 {amount}Kg CO<sub>2</sub>e 만큼
      줄였어요!
    </div>
  );
};

export default CarbonContainer;
