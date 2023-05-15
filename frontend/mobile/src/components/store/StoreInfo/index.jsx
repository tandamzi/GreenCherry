import { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';
import Image from 'next/image';

import clientHttp from '@/utils/csr/clientHttp';

const StoreInfo = ({ storeInfo, memberId }) => {
  const [data, setData] = useState();
  const [isSubscribe, setisSubscribe] = useState(false);

  const getIsSubscribe = async () => {
    try {
      const response = await clientHttp.get(
        `/subscribe/is-subscribe/${memberId}/${storeInfo.storeId}`,
      );
      setisSubscribe(response.data.data);
    } catch (error) {
      console.error('Error fetching data : ', error);
    }
  };

  const changeSubscribeStatus = async method => {
    await clientHttp.get(
      `/subscribe/change-status/${memberId}/${storeInfo.storeId}/${method}`,
    );
    if (method === 'delete') {
      setData(prevData => ({
        ...prevData,
        numberOfSubscriber: prevData.numberOfSubscriber - 1,
      }));
    } else {
      setData(prevData => ({
        ...prevData,
        numberOfSubscriber: prevData.numberOfSubscriber + 1,
      }));
    }

    getIsSubscribe();
  };

  useEffect(() => {
    setData(storeInfo);
  }, [storeInfo]);

  useEffect(() => {
    getIsSubscribe();
  }, []);
  return (
    <div className="flex-row w-full justify-self-center border-b border-b-line ">
      <div className="w-full flex flex-col justify-self-center border-b border-b-line">
        <div className="relative w-full h-80">
          <Image src={storeInfo.images[0].url} fill alt={storeInfo.name} />
        </div>

        <div className="text-center my-4">
          <p className="font-bold text-3xl"> {storeInfo.name}</p>
          <p className="text-xs text-secondary">{data && data.type.name}</p>
        </div>
        <div className="text-center mb-3">
          <p className="text-secondaryfont text-decoration-line: line-through">
            {data && data.cherryBox.totalPriceBeforeDiscount} 원 상당
          </p>
          <p className="font-bold text-2xl">
            {data && data.cherryBox.pricePerCherryBox}원
          </p>
        </div>

        <div className="flex flex-row justify-center items-center mb-5">
          <div className="flex items-center">
            {isSubscribe ? (
              <div className="flex justify-center mb-3">
                <button
                  className="pt-2 pr-0.5"
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    changeSubscribeStatus('delete');
                    setisSubscribe(prev => !prev);
                  }}
                >
                  <AiFillHeart size={18} className="fill-primaryevent" />
                </button>
              </div>
            ) : (
              <div className="flex justify-center mb-3">
                <button
                  className="pt-2 pr-0.5"
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    changeSubscribeStatus('post');
                    setisSubscribe(prev => !prev);
                  }}
                >
                  <AiOutlineHeart size={18} className="fill-primaryevent" />
                </button>
              </div>
            )}
            <p className="text-primaryfont">
              {data && data.numberOfSubscriber}
            </p>
          </div>
          <p className="mx-6 font-thin text-primaryfont">|</p>
          <p className="font-light text-primaryfont">
            리뷰{' '}
            <span className="text-secondary">
              {data && data.numberOfReview}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 my-6 text-primaryfont">
        <p className="text-center font-extralight text-secondary">픽업시간</p>
        <p className="col-span-2 mb-3 ml-4 pr-7 font-medium">
          {data && data.pickUpStartTime} - {data && data.pickUpEndTime} todo :
          시간도 수정해야돼요 뒤에 00 안오게
        </p>

        <p className="text-center font-extralight text-secondary">위치 안내</p>
        <p className="col-span-2 mb-3 ml-4 pr-7">
          {data && data.address.addressName}
          12312311213612136512143651243891249381249834129849
        </p>

        <p className="text-center font-extralight text-secondary">가게소개</p>
        <p className="col-span-2 mb-3 ml-4 pr-7">
          {data && data.address.addressName}
        </p>

        <p className="text-center font-extralight text-secondary">체리박스</p>
        <p className="col-span-2 mb-3 ml-4 pr-7">
          {data && data.cherryBox.description} todo : 데이터가 없어요
        </p>

        <p className="text-center font-extralight text-secondary">알레르기</p>
        <p className="col-span-2 mb-3 ml-4 pr-7">
          {data && data.allergies[0].name}
        </p>
      </div>
    </div>
  );
};

export default StoreInfo;
