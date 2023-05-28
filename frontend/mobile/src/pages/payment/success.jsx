/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { useRouter } from 'next/router';

import { saveOrderState } from '@/redux/order/orderReducer';

function PaymentSuccess() {
  const router = useRouter();
  const dispatch = useDispatch();
  const storeId = useSelector(state => state.order.storeId);

  useEffect(() => {
    const fetchData = async () => {
      const { pg_token, partner_order_id } = router.query;
      if (pg_token && partner_order_id) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API_URL}/pay/success?pg-token=${pg_token}&partner-order-id=${partner_order_id}`,
          );

          if (response.data.code === 0) {
            dispatch(saveOrderState('PAYMENT_SUCCESS'));

            if (window.opener) {
              const message = { type: 'PAYMENT_SUCCESS' };
              window.opener.postMessage(
                message,
                `${process.env.NEXT_PUBLIC_LOCAL_API_URL}`,
              );
            }

            const isMobile = /iPhone|iPad|iPod|Android/i.test(
              window.navigator.userAgent,
            );

            if (isMobile) {
              window.location.href = response.data.next_redirect_mobile_url;
              router.push(`/store/${storeId}`);
            } else {
              window.close();
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [router.query]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Payment Success</h1>
      </header>
    </div>
  );
}

export default PaymentSuccess;
