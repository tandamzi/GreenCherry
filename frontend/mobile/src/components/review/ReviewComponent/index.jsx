import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

const ReviewComponent = () => {
  return (
    <div>
      <div className="flex flex-row justify-between mx-8 mt-8">
        <p className="font-bold text-xl pr-4">사용자 리뷰</p>
        <p className="font-thin text-sm align-text-bottom">2건</p>
      </div>
      <div className=" w-10/12 mx-auto mt-5" />
    </div>
  );
};

export default ReviewComponent;
