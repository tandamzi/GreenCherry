import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

const StoreInfo = ({ storeInfo }) => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(storeInfo);
  }, [storeInfo]);
  return (
    <div className="flex-row h-96 w-full justify-self-center border-b-2 border-secondaryfont">
      <div className="w-full flex flex-col justify-self-center">
        <div>가게 사진</div>
        <div className="text-center mb-3">
          <p className="font-bold text-3xl"> {data && data.name}</p>
          <p className="font-thin">{data && data.type.name}</p>
        </div>
        <div className="text-center mb-3">
          <p className="font-thin text-decoration-line: line-through">
            {data && data.cherryBox.totalPriceBeforeDiscount}
          </p>
          <p className="font-bold text-2xl">
            {data && data.cherryBox.pricePerCherryBox}원
          </p>
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="font-thin flex flex-row pl-14">
            <AiOutlineHeart
              size={13}
              // style={{ color: iconColors.home }}
              className=" items-center mt-1"
            />
            <p> {data && data.numberOfSubscriber}0</p>
          </div>
          <div className="font-thin">|</div>
          <div className="font-thin pr-14">
            리뷰 {data && data.numberOfReview}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-row">
          <p className="mx-20">픽업시간</p>
          <p>
            {data && data.pickUpStartTime} - {data && data.pickUpEndTime}{' '}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="mx-20">위치안내</p>
          <p>{data && data.address.addressName}</p>
        </div>
        <div className="flex flex-row">
          <p className="mx-20">가게소개</p>
          <p>{data && data.address.addressName}</p>
        </div>
        <div className="flex flex-row">
          <p className="mx-20">체리박스</p>
          <p>{data && data.cherryBox.description}</p>
        </div>
        <div className="flex flex-row">
          <p className="mx-20">알레르기</p>
          <p>{data && data.allergies[0].name}</p>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
