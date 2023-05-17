import cn from 'classnames';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

import ImageSlider from '@/components/ImageContainer/ImageSlider';
import ReviewTag from '@/components/ReviewTag';

const ReviewComponent = ({ review }) => {
  const newCreateDate = new Date(review.createDate);

  const formatDate = reviewWriteDate => {
    const date = parseISO(reviewWriteDate);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="flex flex-row mb-4">
        <div className="relative w-12 h-12 mr-4">
          <Image
            src={review.memberImageUrl}
            className="rounded-full mr-3"
            fill
            alt="reveiewImageUrl"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-xl pr-4 ">{review.memberNickname}</p>
          <p className="font-bold text-secondaryfont text-sm align-text-bottom">
            {formatDate(review.createDate)}
          </p>
        </div>
      </div>
      <p className="font-thin mb-3">{review.content}</p>
      <div className="flex flex-row mb-3">
        <ImageSlider
          width={120}
          height={110}
          images={review.reviewImageUrls}
          name={review.memberNickname}
        />
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
