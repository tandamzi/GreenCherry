import { useState } from 'react';
import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';
import Image from 'next/image';

const StoreReview = () => {
  const [flavorStyle, setFlavorStyle] = useState({ width: `65%` });
  const [amountStyle, setAmountStyle] = useState({ width: `25%` });
  const [freshStyle, setFreshStyle] = useState({ width: `15%` });
  const [kindStyle, setKindStyle] = useState({ width: `45%` });
  return (
    <div className="border-b-2 border-b-line ">
      <div className="flex flex-row justify-between mx-8 mt-8">
        <p className="font-bold text-xl pr-4">이런점이 좋았어요</p>
        <span className="font-thin text-sm align-text-bottom">
          <span className="text-secondary">40</span>회 참여
        </span>
      </div>
      <div className=" w-9/12 mx-auto mb-8 mt-4 ">
        {/* <div className="flex flex-row justify-between">
          <p className="font-bold text-xl pr-4">이런점이 좋았어요</p>
          <p className="font-thin text-sm align-text-bottom">40회 참여</p>
        </div> */}
        <div className="w-full h-8 bg-itembg rounded-md my-1 relative">
          <div className="absolute flex flex-row w-full justify-between">
            <div className="flex flex-row">
              <Image
                src="/assets/icons/reviewIcons/deliciousIcon.svg"
                width={100}
                height={100}
                className="h-6 flex-none w-fit m-1 ml-3"
                alt="devday main logo"
              />
              <p className="m-1">&quot;체리박스맛있어요&quot;</p>
            </div>
            <div>
              <p className="m-1 mr-3 text-sm font-thin">15</p>
            </div>
          </div>
          <div className="h-8 bg-primary rounded-md" style={flavorStyle} />
        </div>
        <div className="w-full h-8 bg-itembg rounded-md my-1 relative">
          <div className="absolute flex flex-row w-full justify-between">
            <div className="flex flex-row">
              <Image
                src="/assets/icons/reviewIcons/toomuchIcon.svg"
                width={100}
                height={100}
                className="h-6 flex-none w-fit m-1 ml-3"
                alt="devday main logo"
              />
              <p className="m-1">&quot;양이 많아요&quot;</p>
            </div>
            <div>
              <p className="m-1 mr-3 text-sm font-thin">15</p>
            </div>
          </div>
          <div className="h-8 bg-primary rounded-md" style={amountStyle} />
        </div>
        <div className="w-full h-8 bg-itembg rounded-md my-1 relative">
          <div className="absolute flex flex-row w-full justify-between">
            <div className="flex flex-row">
              <Image
                src="/assets/icons/reviewIcons/freshIcon.svg"
                width={100}
                height={100}
                className="h-6 flex-none w-fit m-1 ml-3"
                alt="devday main logo"
              />
              <p className="m-1">&quot;재료가 신선해요&quot;</p>
            </div>
            <div>
              <p className="m-1 mr-3 text-sm font-thin">15</p>
            </div>
          </div>
          <div className="h-8 bg-primary rounded-md" style={freshStyle} />
        </div>
        <div className="w-full h-8 bg-itembg rounded-md my-1 relative">
          <div className="absolute flex flex-row w-full justify-between">
            <div className="flex flex-row">
              <Image
                src="/assets/icons/reviewIcons/kindIcon.svg"
                width={100}
                height={100}
                className="h-6 flex-none w-fit m-1 ml-3"
                alt="devday main logo"
              />
              <p className="m-1">&quot;사장님이 친절해요&quot;</p>
            </div>
            <div>
              <p className="m-1 mr-3 text-sm font-thin">15</p>
            </div>
          </div>
          <div className="h-8 bg-primary rounded-md" style={kindStyle} />
        </div>
      </div>
    </div>
  );
};

export default StoreReview;
