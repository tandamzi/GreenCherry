import React, { useState, useEffect } from 'react';

import CarbonContainer from '@/components/CarbonContainer';
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
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    getTodayOrderList(memberAttributes.storeId).then(res => {
      setQuantity(res.cherryBoxQuantity);
      setCherryPoint(res.cherryPoint);
      setOrderList(res.orderList);
    });
  }, []);
  return (
    <div className="w-full max-w-4xl h-full relative">
      <LongBoxContainer className="fixed max-w-4xl">
        <p>{quantity}개 남았습니다</p>
      </LongBoxContainer>
      <OrderList orderList={orderList} />
      <CarbonContainer />
    </div>
  );
};

export default AfterOpen;
