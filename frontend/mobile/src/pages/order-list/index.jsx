/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import OrderInfo from '@/components/OrderInfo';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import clientHttp from '@/utils/csr/clientHttp';

const orderList = () => {
  const router = useRouter();
  const [orders, setOrders] = useState();

  const getOrderList = async () => {
    // redux에서 memberId 꺼내서 호출하기
    try {
      const response = await clientHttp.get('/order-list/1');
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <Container className=" ">
      <Container.SubPageHeader goHome title="주문내역" className="" />
      <div className="mt-4">
        {orders &&
          orders.content.map(orderInfo => {
            return <OrderInfo key={orderInfo.orderId} orderInfo={orderInfo} />;
          })}
      </div>
    </Container>
  );
};
export default PrivateRouter(orderList);
