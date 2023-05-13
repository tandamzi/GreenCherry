import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';

import cs from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import clientHttp from '@/utils/csr/clientHttp';

const SubscribeStore = ({ subscribeStoreInfo }) => {
  const [subscribe, setSubscribe] = useState(true);
  const navigate = useRouter();

  // const changeSubscribe = prev => {
  //   setSubscribe(!prev);
  // };
  const changeSubscribeStatus = async method => {
    const memberId = 11;
    const storeId = subscribeStoreInfo.id;

    const response = await clientHttp.get(
      `/subscribe/change-status/${memberId}/${storeId}/${method}`,
    );
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row">
        <div className="relative w-32 h-32 rounded-lg my-2 mr-2">
          <Image
            src={subscribeStoreInfo.image}
            fill
            alt="greencherry subscribeBox"
          />
        </div>
        <div className="m-2">
          <p className=" text-lg font-semibold">{subscribeStoreInfo.name}</p>
          <p className="text-xs font-thin text-disabled">
            {subscribeStoreInfo.type}
          </p>
        </div>
      </div>
      <div className="m-2">
        {subscribe ? (
          <div className="flex justify-end  mb-3">
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                changeSubscribeStatus('delete');
                setSubscribe(prev => !prev);
              }}
            >
              <AiFillHeart size={20} className=" fill-primaryevent" />
            </button>
          </div>
        ) : (
          <div className="flex justify-end mb-3">
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                changeSubscribeStatus('post');
                setSubscribe(prev => !prev);
              }}
            >
              <AiFillHeart size={20} />
            </button>
          </div>
        )}
        {subscribeStoreInfo.open ? (
          <div className="text-center">
            <p>체리박스</p>
            <p>{subscribeStoreInfo.quantity}개</p>
            <div className="p-2 mt-1 px-3 rounded-xl bg-itembg active:bg-primary">
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  navigate.push(`/store/${subscribeStoreInfo.id}`);
                }}
              >
                <p className="text-xs font-semibold mob:text-sm">
                  주문하러가기
                </p>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>영업중이</p>
            <p>아닙니다</p>
            <div className="p-2 mt-1 px-3 rounded-xl border-2 border-line">
              <p className="text-xs font-semibold mob:text-sm">주문하러가기</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribeStore;
