import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

const StoreInfo = () => {
  return (
    <div className="flex-row h-64  justify-self-center border-b-2 border-secondaryfont">
      <div>가게 사진</div>
      <div>가게 이름</div>
      <div>가격</div>
      <div>좋아요 리뷰</div>
    </div>
  );
};

export default StoreInfo;
