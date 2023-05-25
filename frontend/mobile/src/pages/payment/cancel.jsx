import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { useRouter } from 'next/router';

import { saveOrderState } from '@/redux/order/orderReducer';

function PaymentCancel() {
  const router = useRouter();
  const dispatch = useDispatch();
  const storeId = useSelector(state => state.order.storeId);

  useEffect(() => {
    dispatch(saveOrderState('PAYMENT_CANCEL'));
    router.push(`/store/${storeId}`);
  }, []);
}

export default PaymentCancel;
