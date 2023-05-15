import React, { useState, useEffect } from 'react';

import classnames from 'classnames';

import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';

const CarbonCircleContainer = ({ className }) => {
  const [cherryPoint, setCherryPoint] = useState(0);
  const { storeAttributes } = useStore();
  const { memberAttributes } = useMember();

  useEffect(() => {
    setCherryPoint(storeAttributes.cherryPoint);
  }, [storeAttributes.cherryPoint]);

  return (
    <div
      className={classnames(
        'bg-secondary text-bgcolor text-center rounded-full shadow-second',
        className,
      )}
    >
      {memberAttributes.storeName} 가게는 <br />
      <span className="font-bold">
        {!isNaN(storeAttributes.cherryPoint)
          ? `${storeAttributes.cherryPoint}Kg CO2e`
          : 'Loading...'}
      </span>
      <br /> 만큼 줄였어요!
    </div>
  );
};

export default CarbonCircleContainer;
