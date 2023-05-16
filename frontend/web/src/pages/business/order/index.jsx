import React, { useState, useEffect } from 'react';

import CarbonContainer from '@/components/CarbonContainer';
import Container from '@/components/Container';
import LongBoxContainer from '@/components/LongBoxContainer';
import OrderList from '@/components/OrderList';
import PrevNextButton from '@/components/PrevNextButton';
import TotalIncome from '@/components/TotalIncome';
import useMember from '@/hooks/memberHook';
import { getOrderList, getTotalIncome } from '@/utils/api/store';
import getCurrentDate from '@/utils/getCurrentDate';

const Order = () => {
  const { memberAttributes } = useMember();
  const [date, setDate] = useState(getCurrentDate());
  const [totalIncome, setTotalIncome] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orderList, setOrderList] = useState([]);

  const dateHandle = data => {
    setDate(data);
  };

  const updateOrderState = (orderId, newState) => {
    setOrderList(prevList =>
      prevList.map(order =>
        order.orderId === orderId ? { ...order, orderState: newState } : order,
      ),
    );
  };

  useEffect(() => {
    getTotalIncome(memberAttributes.storeId, date).then(res => {
      setTotalIncome(res.totalSalesAmount || 0);
      setOrderCount(res.count);
    });
    getOrderList(memberAttributes.storeId, date).then(res => {
      setOrderList(res.orderList);
    });
  }, [date]);
  /*   const orderList = [
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
  ]; */
  return (
    <Container>
      <Container.BusinessHeader />
      <Container.MainBody className="bg-bgcolor h-full ">
        <div className="w-full h-full max-w-4xl relative">
          <LongBoxContainer className="fixed max-w-4xl">
            <p>{date}</p>
          </LongBoxContainer>
          <TotalIncome price={totalIncome} />
          <OrderList
            orderList={orderList}
            updateOrderState={updateOrderState}
          />
          <PrevNextButton date={date} dateHandle={dateHandle} />
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Order;
