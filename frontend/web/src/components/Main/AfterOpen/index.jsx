import React, { useState } from 'react';

import LongBoxContainer from '@/components/LongBoxContainer';
import OrderList from '@/components/OrderList';
import OrderZero from '@/components/OrderZero';

const AfterOpen = () => {
  const [quantity, setQuantity] = useState(0); // TODO: 재고 관리
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
