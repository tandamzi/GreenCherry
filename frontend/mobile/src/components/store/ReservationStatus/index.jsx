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
    setData(reservationInfo);
  }, [reservationInfo]);
  return (
    <div className="flex flex-col justify-center text-center my-6 pb-6 border-b border-b-line ">
      <p className="mx-10 py-2 rounded-3xl bg-itembg">
        {data && data.cherryBox.quantity}개 남았습니다!
      </p>
      <div className=" flex justify-center -mt-5 -mb-8">
        <Lottie
          className=""
          loop
          animationData={foodOrderBox}
          play
          style={{ width: 260, height: 260 }}
          speed={0.8}
        />
      </div>
      <div className="mb-6 flex flex-row justify-center items-center z-10">
        <button
          className="w-6 h-6 font-bold rounded-full bg-primary active:bg-primaryevent"
          type="button"
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
        >
          -
        </button>
        <p className="font-bold text-3xl mx-3">{orderQuantity}</p>
        <button
          className="w-6 h-6 font-bold rounded-full bg-primary active:bg-primaryevent"
          type="button"
          onClick={e => {
            e.preventDefault();
            if (orderQuantity < data.cherryBox.quantity) {
              setOrderQuantity(orderQuantity + 1);
              setOrderPrice(
                (orderQuantity + 1) * data.cherryBox.pricePerCherryBox,
              );
            }
          }}
        >
          +
        </button>
      </div>
      <div className="flex justify-center rounded-xl mx-auto px-8 p-2 bg-itembg">
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            toggleModal();
          }}
        >
          <span className="tracking-tighter">
            예약하기 <br /> {orderPrice} 원
          </span>
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
