import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';
import Image from 'next/image';

import ReviewComponent from '@/components/review/ReviewComponent';

const CRYING_ICON_URL = `/assets/icons/etcIcons/crying-face.svg`;
const UserReview = ({ reviewInfo }) => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(reviewInfo);
  }, [reviewInfo]);
  return (
    <div>
      <div className="flex flex-row justify-between items-center mx-8 mt-8">
        <p className="font-bold text-xl pr-4">사용자 리뷰</p>
        <span className=" text-sm align-text-bottom">
          <span className="text-secondary">{data && data.totalElements}</span>건
        </span>
      </div>
      {data && data.totalElements ? (
        <div className=" w-10/12 mx-auto mt-5">
          {reviewInfo.content.map((review, idx) => {
            return (
              <div key={idx}>
                <ReviewComponent review={review} />
                <div className="pb-4 border-line border-b -mx-8" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full text-2xl h-20">
          <Image alt="no-review" src={CRYING_ICON_URL} width={32} height={32} />

          <span> 아직 작성된 리뷰가 없어요</span>
        </div>
      )}
    </div>
  );
};

export default UserReview;
