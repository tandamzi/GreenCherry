/* eslint-disable no-promise-executor-return */
import React, { useState, useEffect } from 'react';

import CarbonContainer from '@/components/CarbonContainer';
import Container from '@/components/Container';
import LongBoxContainer from '@/components/LongBoxContainer';
import OrderList from '@/components/OrderList';
import PrevNextButton from '@/components/PrevNextButton';
import TotalIncome from '@/components/TotalIncome';
import useMember from '@/hooks/memberHook';
import { getPagableOrderList } from '@/utils/api/order';
import { getOrderList, getTotalIncome } from '@/utils/api/store';
import getCurrentDate from '@/utils/getCurrentDate';

const Order = () => {
  const { memberAttributes } = useMember();
  const [date, setDate] = useState(getCurrentDate());
  const [totalIncome, setTotalIncome] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageEnd, setpageEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    getPagableOrderList(memberAttributes.storeId, date, page).then(res => {
      setOrderList(res.orderList);
    });
  }, [date]);

  const loadMoreOrders = async () => {
    if (pageEnd || isLoading) return;
    setIsLoading(true);
    const nextPage = page + 1;
    getPagableOrderList(memberAttributes.storeId, getCurrentDate(), nextPage)
      .then(res => new Promise(resolve => setTimeout(() => resolve(res), 1000)))
      .then(res => {
        if (res.orderList.length === 0) {
          setpageEnd(true);
          return;
        }
        setOrderList(prevList => [...prevList, ...res.orderList]);
        setPage(prevPage => prevPage + 1);
      })
      .finally(() => setIsLoading(false));
  };

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
            loadMoreOrders={loadMoreOrders}
          />
          <PrevNextButton date={date} dateHandle={dateHandle} />
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Order;
