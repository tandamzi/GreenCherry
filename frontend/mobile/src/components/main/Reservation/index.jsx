import Lottie from 'react-lottie-player';

import reservation from '@public/assets/lottie/reservation1.json';
import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

const Reservation = ({ className, children }) => {
  return (
    <div className=" bg-itembg grid grid-cols-3 h-36 mb-2 mx-2 rounded-xl shadow-lg">
      <div className=" col-start-2 col-span-2 grid justify-items-center content-center">
        <div className=" pl-4 grid justify-items-center content-center">
          <p className=" text-base mb-2">진행중인 예약이 없습니다</p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
