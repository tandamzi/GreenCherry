import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

import ReviewComponent from '@/components/review/ReviewComponent';

const UserReview = ({ reviewInfo }) => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(reviewInfo);
  }, [reviewInfo]);
  return (
    <div>
      <div className="flex flex-row justify-between items-center mx-8 mt-8">
        <p className="font-bold text-xl pr-4">사용자 리뷰</p>
        <p className="text-sm align-text-bottom">
          <span className="text-secondary">{data && data.totalElements}</span>건
        </p>
      </div>
      <div className=" w-10/12 mx-auto mt-5">
        {reviewInfo.content.map((review, idx) => {
          return <ReviewComponent key={idx} review={review} />;
        })}
      </div>
    </div>
  );
};

export default UserReview;
