import { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { useDispatch, useSelector } from 'react-redux';

import foodOrderBox from '@public/assets/lottie/food-order-bag.json';
import cs from 'classnames';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import WarningModal from '@/components/modal/WarningModal';
import {
  saveOrders,
  initOrder,
  saveOrderState,
} from '@/redux/order/orderReducer';
import clientHttp from '@/utils/csr/clientHttp';

const ReservationStatus = ({ reservationInfo }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const storeId = router.query.id;
  const orderState = useSelector(state => state.order.orderState);

  const [data, setData] = useState();
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const memberId = useSelector(state => state.member.memberInfo.id);
  const quantity = useSelector(state => state.order.orderQuantity);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const messageHandler = event => {
      if (event.origin !== `${process.env.NEXT_PUBLIC_LOCAL_API_URL}`) return;

      const message = event.data;
      if (message.type === 'PAYMENT_SUCCESS') {
        dispatch(saveOrderState('PAYMENT_SUCCESS'));
      }
    };

    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  useEffect(() => {
    // console.info(orderState);
    // console.log('orderState변경', orderState);
    if (orderState === 'PAYMENT_SUCCESS') {
      // console.log('주문 성공');
      try {
        clientHttp
          .get('/order-complete', {
            params: { storeId, memberId, orderQuantity: quantity },
          })
          .then(() => {
            handleClose();
          })
          .then(async () => {
            await Swal.fire({
              icon: 'success',
              title: '주문 성공',
              text: '정해진 시간 내 픽업해주세요',
              showConfirmButton: true,
            }).then(result => {
              if (result.isConfirmed) {
                router.push('/order-list');
              }
            });
          });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data.code === -201) {
            Swal.fire({
              icon: 'warning',
              title: '죄송합니다',
              text: error.response.data.message,
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '죄송합니다',
              text: '일시적인 문제가 발생했습니다.',
              showConfirmButton: true,
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '죄송합니다',
            text: '일시적인 문제가 발생했습니다.',
            showConfirmButton: true,
          });
        }
      } finally {
        dispatch(initOrder());
      }
    } else if (orderState === 'PAYMENT_CANCEL') {
      Swal.fire({
        icon: 'info',
        title: '결제 취소',
        text: '결제가 취소되었습니다.',
        showConfirmButton: true,
      });
      dispatch(initOrder());
    }
  }, [orderState]);

  const toggleModal = async () => {
    if (orderQuantity <= 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '수량을 선택해주세요',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    // console.log('orderQuantity', orderQuantity);
    dispatch(
      saveOrders({
        storeId,
        orderQuantity,
        orderPrice,
        priceAfterDiscount: data.cherryBox.priceAfterDiscount,
        orderState: 'PAYMENT_READY',
      }),
    );
    setOpen(prev => !prev);
  };

  useEffect(() => {
    setData(reservationInfo);
  }, [reservationInfo]);

  useEffect(() => {
    if (orderState === 'PAYMENT_SUCCESS') {
      try {
        clientHttp
          .get('/order-complete', {
            params: { storeId, memberId, orderQuantity },
          })
          .then(() => {
            handleClose();
          })
          .then(async () => {
            await Swal.fire({
              icon: 'success',
              title: '주문 성공',
              text: '정해진 시간 내 픽업해주세요',
              showConfirmButton: true,
            }).then(result => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data.code === -201) {
            Swal.fire({
              icon: 'warning',
              title: '죄송합니다',
              text: error.response.data.message,
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '죄송합니다',
              text: '일시적인 문제가 발생했습니다.',
              showConfirmButton: true,
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '죄송합니다',
            text: '일시적인 문제가 발생했습니다.',
            showConfirmButton: true,
          });
        }
      }
    }
  }, []);

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
                (orderQuantity - 1) * data.cherryBox.priceAfterDiscount,
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
                (orderQuantity + 1) * data.cherryBox.priceAfterDiscount,
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
