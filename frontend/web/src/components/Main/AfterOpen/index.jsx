import React, { useState, useEffect } from 'react';

import LongBoxContainer from '@/components/LongBoxContainer';
import OrderList from '@/components/OrderList';
import OrderZero from '@/components/OrderZero';
import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';
import { getTodayOrderList } from '@/utils/api/order';

const AfterOpen = () => {
  const { memberAttributes } = useMember();
  const { setCherryPoint } = useStore();
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    getTodayOrderList(memberAttributes.storeId).then(res => {
      setQuantity(res.cherryBoxQuantity);
      setCherryPoint(res.cherryPoint);
    });
  }, []);
  return (
    <div className="w-full max-w-4xl">
      <LongBoxContainer className="fixed max-w-4xl">
        <p>{quantity}개 남았습니다</p>
      </LongBoxContainer>
      <OrderList />
    </div>
  );
};

export default AfterOpen;
