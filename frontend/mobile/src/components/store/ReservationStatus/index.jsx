import { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';

import foodOrderBox from '@public/assets/lottie/food-order-bag.json';
import cs from 'classnames';

import WarningModal from '@/components/modal/WarningModal';

const ReservationStatus = ({ reservationInfo }) => {
  const [data, setData] = useState();
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    setData(reservationInfo.data);
  }, [reservationInfo]);
  return (
    <div className="flex flex-col justify-center text-center mt-6 border-b-2 border-b-line pb-4">
      <p className=" mx-10 py-2 rounded-3xl bg-itembg">
        {data && data.cherryBox.quantity}개 남았습니다!
      </p>
      <div className=" flex justify-center">
        {' '}
        <Lottie
          className=""
          loop
          animationData={foodOrderBox}
          play
          style={{ width: 260, height: 260 }}
          speed={1}
        />
      </div>
      <div className="mb-6 flex flex-row justify-center">
        <div
          onClick={e => {
            e.preventDefault();
            if (orderQuantity) {
              setOrderQuantity(orderQuantity - 1);
              setOrderPrice(
                (orderQuantity - 1) * data.cherryBox.pricePerCherryBox,
              );
            } else {
              setOrderQuantity(0);
              setOrderPrice(0);
            }
          }}
          className="font-bold rounded-full py-2 px-4 bg-itembg mr-4 active:bg-primaryevent"
        >
          -
        </div>
        <p className="font-bold text-3xl pt-1">{orderQuantity}</p>
        <div
          onClick={e => {
            e.preventDefault();
            if (orderQuantity < data.cherryBox.quantity) {
              setOrderQuantity(orderQuantity + 1);
              setOrderPrice(
                (orderQuantity + 1) * data.cherryBox.pricePerCherryBox,
              );
            }
          }}
          className="font-bold rounded-full py-2 px-4 bg-itembg ml-4 active:bg-primaryevent"
        >
          +
        </div>
      </div>
      <div className="flex justify-center rounded-xl mx-auto px-8 py-1 bg-itembg">
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            toggleModal();
          }}
        >
          <p>예약하기</p>
          <p>{orderPrice} 원</p>
        </button>
      </div>
      <WarningModal
        open={open}
        setOpen={setOpen}
        orderQuantity={orderQuantity}
      />
    </div>
  );
};

export default ReservationStatus;
