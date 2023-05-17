import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Lottie from 'react-lottie-player';

import cs from 'classnames';
import Image from 'next/image';

import ReviewComponent from '@/components/ReviewComponent';

const CRYING_ICON_URL = `/assets/icons/crying-face.svg`;
const ReviewList = ({ reviewList, loadMoreOrders }) => {
  const [data, setData] = useState();

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      loadMoreOrders(); // Load more orders when the ref comes into view
    }
  }, [inView, loadMoreOrders]);
  return (
    <div className="flex flex-col py-5 text-primaryfont font-thin h-full max-w-4xl max-h-fit">
      {reviewList && reviewList.length !== 0 ? (
        <>
          <div className=" w-10/12 mx-auto mt-5 overflow-y-scroll  overflow-x-hidden">
            {reviewList.map((review, idx) => {
              return (
                <div key={idx}>
                  <ReviewComponent review={review} />
                  <div className="pb-4 border-line border-b -mx-8" />
                </div>
              );
            })}
          </div>
          <div ref={ref}>Loading...</div> {/* This div will be observed */}
        </>
      ) : (
        <div className="flex justify-center items-center w-full text-2xl h-20">
          <Image alt="no-review" src={CRYING_ICON_URL} width={32} height={32} />

          <span className="ml-1 pt-1"> 아직 작성된 리뷰가 없어요</span>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
