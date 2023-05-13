import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';
import Image from 'next/image';

import ReviewTag from '../ReviewTag';

const ReviewComponent = ({ review }) => {
  const newCreateDate = new Date(review.createDate);

  return (
    <div className="flex flex-col border-b-2 border-b-line mt-5">
      <div className="flex flex-row  mb-4">
        <Image
          src={review.memberImageUrl}
          className="rounded-full mr-3"
          width={48}
          height={60}
          alt="reveiewImageUrl"
        />
        <div className="flex flex-col">
          <p className="font-bold text-xl pr-4 ">{review.memberNickname}</p>
          <p className="font-bold text-secondaryfont text-sm align-text-bottom">
            {newCreateDate.toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="font-thin mb-3">{review.content}</p>
      <div className="flex flex-row mb-3">
        {review.reviewImageUrls.map((image, idx) => {
          return (
            <Image
              className="mr-2 rounded-xl"
              key={idx}
              src={image}
              width={80}
              height={100}
              alt="reveiewImageUrl"
            />
          );
        })}
      </div>
      <div className="grid grid-cols-2 mb-6">
        {review.tags.map((tag, idx) => {
          return <ReviewTag key={idx} tag={tag} />;
        })}
      </div>
    </div>
  );
};

export default ReviewComponent;