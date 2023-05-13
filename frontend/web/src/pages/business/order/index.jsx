import React from 'react';

import CarbonContainer from '@/components/CarbonContainer';
import Container from '@/components/Container';
import LongBoxContainer from '@/components/LongBoxContainer';
import OrderList from '@/components/OrderList';
import TotalIncome from '@/components/TotalIncome';

const Order = () => {
  const totalIncome = 100000;
  const orderList = [
    {
      orderId: '1',
      nickname: '김철수',
      quantity: 1,
      orderState: '결제완료',
      totalSalesAmount: '10000',
      orderDate: '2021-01-01',
    },
    {
      orderId: '2',
      nickname: '김철수',
      quantity: 1,
      orderState: 'PICKUP_COMPLETE',
      totalSalesAmount: '10000',
      orderDate: '2021-01-01',
    },
  ];
  return (
    <Container>
      <Container.BusinessHeader />
      <Container.MainBody className="bg-bgcolor h-full ">
        <div className="w-full h-full max-w-4xl relative">
          <LongBoxContainer className="fixed max-w-4xl">
            <p>2023 - 04 - 16</p>
          </LongBoxContainer>
          <TotalIncome price={totalIncome} />
          <OrderList orderList={orderList} />
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Order;
