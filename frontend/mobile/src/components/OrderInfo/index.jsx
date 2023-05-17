import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';

import store1 from '@public/assets/testImage/store1.png';
import cs from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import clientHttp from '@/utils/csr/clientHttp';

const OrderInfo = ({ orderInfo }) => {
  const [subscribe, setSubscribe] = useState(true);
  const navigate = useRouter();

  const newOrderDate = new Date(orderInfo.orderDate);
  const { orderState } = orderInfo;

  return (
    <div>
      {orderState === 'ORDER_COMPLETE' ? (
        <div className="mb-3 border-b border-line">
          <div className="m-3 flex flex-row justify-between">
            <p>{newOrderDate.toLocaleDateString()}</p>
            <p>{orderInfo.totalSalesAmount}원</p>
          </div>
          <div className="flex flex-row m-3">
            <Image
              src={orderInfo.storeImageUrl}
              className="rounded-lg mr-3"
              width={110}
              height={60}
              alt="reveiewImageUrl"
            />
            <div className="w-full">
              <p className="font-bold text-2xl mt-3">{orderInfo.storeName}</p>
              <p className="font-thin mb-2">체리박스 {orderInfo.quantity}</p>
              <div className="text-center w-full py-1 rounded-lg border border-primaryevent">
                <p className="text-primaryevent">현재 예약중인 주문입니다!</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-3 border-b border-line">
          <div className="m-3 flex flex-row justify-between">
            <p>{newOrderDate.toLocaleDateString()}</p>
            <p>{orderInfo.totalSalesAmount}원</p>
          </div>
          <div className="flex flex-row m-3">
            <Image
              src={orderInfo.storeImageUrl}
              className="rounded-lg mr-3"
              width={110}
              height={60}
              alt="reveiewImageUrl"
            />
            <div className="w-full">
              <p className="font-bold text-2xl mt-3">{orderInfo.storeName}</p>
              <p className="font-thin mb-2">체리박스 {orderInfo.quantity}</p>
              {orderInfo.writed === 'EXPIRATION' ? (
                <div className="text-center w-full py-1 rounded-lg border border-disabled">
                  <p className="text-disabled">리뷰 작성일이 지났습니다</p>
                </div>
              ) : (
                <div>
                  {orderInfo.writed === 'NO' ? (
                    <div
                      className="text-center w-full bg-itembg py-1 rounded-lg active:bg-primary"
                      onClick={() => {
                        navigate.push(
                          `review-form/${orderInfo.memberId}/${orderInfo.storeId}/${orderInfo.orderId}`,
                        );
                      }}
                    >
                      <p>리뷰작성</p>
                    </div>
                  ) : (
                    <div className="text-center w-full py-1 rounded-lg border border-disabled">
                      <p className="text-disabled">이미 리뷰를 작성했습니다</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderInfo;
