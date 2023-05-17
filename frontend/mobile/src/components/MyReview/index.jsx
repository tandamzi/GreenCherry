import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';
import Image from 'next/image';

import MyReviewComponent from '../review/MyReviewComponent';

const CRYING_ICON_URL = `/assets/icons/etcIcons/crying-face.svg`;
const MyReview = ({ reviewInfo, nickname, image }) => {
  const [data, setData] = useState();
  const [memberImageUrl, setMemberImageUrl] = useState();
  const [memberNickname, setMemberNickname] = useState();

  useEffect(() => {
    setData(reviewInfo);
    setMemberNickname(nickname);
    setMemberImageUrl(image);
  }, [reviewInfo]);

  return (
    <div>
      {data && data.totalElements ? (
        <div className=" w-10/12 mx-auto mt-5">
          {data.content.map((review, idx) => {
            return (
              <div key={idx}>
                <MyReviewComponent
                  review={review}
                  memberNickname={memberNickname}
                  memberImageUrl={memberImageUrl}
                />
                <div className="pb-4 border-line border-b -mx-8" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full text-2xl h-20">
          <Image alt="no-review" src={CRYING_ICON_URL} width={32} height={32} />
          <span className="ml-1 pt-1"> 아직 작성된 리뷰가 없어요</span>
        </div>
      )}
    </div>
  );
};

export default MyReview;
