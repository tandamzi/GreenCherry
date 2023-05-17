import React from 'react';

import classnames from 'classnames';

import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';

const CarbonContainer = ({ className }) => {
  const { storeAttributes } = useStore();
  const { memberAttributes } = useMember();
  return (
    <div
      className={classnames(
        'bg-secondary opacity-50 text-bgcolor w-full text-3xl text-center rounded-full py-2 shadow-secondary absolute bottom-0 tablet:text-xl',
        className,
      )}
    >
      {memberAttributes.storeName} 가게는 {storeAttributes.cherryPoint}Kg CO
      <sub>2</sub>e 만큼 줄였어요!
    </div>
  );
};

export default CarbonContainer;
