import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { useRouter } from 'next/router';

import { saveOrderState } from '@/redux/order/orderReducer';

function PaymentSuccess() {
  // const [pgToken, setPgToken] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const storeId = useSelector(state => state.order.storeId);

  useEffect(() => {
    const fetchData = async () => {
      const pgToken = router.query.pg_token;
      const partnerOrderId = router.query.partner_order_id;
      // setPgToken(pgToken);

      try {
        const data = {
          'pg-token': pgToken,
          'partner-order-id': partnerOrderId,
        };
        const response = await axios.get(
          `http://greencherry.store:2001/pay/success`,
          {
            params: data,
          },
        );

        dispatch(saveOrderState('PAYMENT_SUCCESS'));
        router.push(`/store/${storeId}`);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [router.query]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Payment Success</h1>
        {/* <p>{pgToken}</p> */}
      </header>
    </div>
  );
}

export default PaymentSuccess;
