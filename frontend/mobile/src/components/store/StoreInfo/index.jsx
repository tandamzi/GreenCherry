import { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';
import Image from 'next/image';

const StoreInfo = ({ storeInfo }) => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(storeInfo);
  }, [storeInfo]);

  return (
    <div className="flex-row w-full justify-self-center border-b-2 border-b-line ">
      <div className="w-full flex flex-col justify-self-center border-b-2 border-b-line">
        <div className="relative w-full h-80">
          <Image src={storeInfo.images[0].url} fill alt={storeInfo.name} />
        </div>

        <div className="text-center mb-3">
          <p className="font-bold text-3xl"> {storeInfo.name}</p>
          <p className="text-secondary">{data && data.type.name}</p>
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
            {/* 
            todo : 
            구독 여부에 따라 하트 바뀌게 */}
            <AiOutlineHeart
              size={15}
              color="#F28482"
              // style={{ color: iconColors.home }}
              className=" items-center mt-1"
            />
            <p className="text-primaryfont">
              {data && data.numberOfSubscriber}
            </p>
          </div>
          <p className="mx-6 font-thin text-primaryfont">|</p>
          <p className="font-thin text-primaryfont">
            리뷰{' '}
            <span className="text-secondary">
              {data && data.numberOfReview}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 my-6 text-primaryfont">
        <p className="text-center font-thin">픽업시간</p>
        <p className="col-span-2 mb-3 ml-4 pr-7">
          {data && data.pickUpStartTime} - {data && data.pickUpEndTime}
        </p>

        <p className="text-center font-thin">위치 안내</p>
        <p className="col-span-2 mb-3 ml-4 pr-7">
          {data && data.address.addressName}
          12312311213612136512143651243891249381249834129849
        </p>

        <p className="text-center font-thin">가게소개</p>
        <p className="col-span-2 mb-3 ml-4 pr-7">
          {data && data.address.addressName}
        </p>

        <p className="text-center font-thin">체리박스</p>
        <p className="col-span-2 mb-3 ml-4 pr-7">
          {data && data.cherryBox.description} todo : 데이터가 없어요
        </p>

        <p className="text-center font-thin">알레르기</p>
        <p className="col-span-2 mb-3 ml-4 pr-7">
          {data && data.allergies[0].name}
        </p>
      </div>
    </div>
  );
};

export default StoreInfo;
