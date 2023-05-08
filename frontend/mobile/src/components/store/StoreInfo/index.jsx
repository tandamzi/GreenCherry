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
    <div className="flex-row h-64  justify-self-center border-b-2 border-secondaryfont">
      <div className="w-full flex flex-col justify-self-center">
        <div>가게 사진</div>
        <div className="text-center">
          <p className="font-bold text-3xl"> {data && data.name}</p>
          <p className="font-thin">{data && data.type.name}</p>
        </div>
        <div className="text-center">
          <p className="font-thin text-decoration-line: line-through">
            {data && data.cherryBox.totalPriceBeforeDiscount}
          </p>
          <p className="font-bold text-2xl">
            {data && data.cherryBox.pricePerCherryBox}원
          </p>
        </div>
        <div className="flex flex-row w-32 justify-between">
          <div className="font-thin flex flex-row align-middle">
            <AiOutlineHeart
              size={13}
              // style={{ color: iconColors.home }}
              className=" items-center mt-1"
            />
            <p>{data && data.numberOfSubscriber}</p>
          </div>
          <div className="font-thin">|</div>
          <div className="font-thin">리뷰 {data && data.numberOfReview}</div>
        </div>
      </div>
      <div className="w-64">
        <div>픽업시간</div>
        <div>위치안내</div>
        <div>가게소개</div>
        <div>체리박스</div>
      </div>
    </div>
  );
};

export default StoreInfo;
