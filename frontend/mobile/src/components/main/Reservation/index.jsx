import Lottie from 'react-lottie-player';

import reservation from '@public/assets/lottie/reservation1.json';
import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

const Reservation = ({ className, children }) => {
  return (
    <div className=" grid grid-cols-3 h-36 mb-2 mx-2 rounded-xl shadow-lg">
      <div className=" col-span-1 grid justify-items-center content-center">
        <Lottie
          className=""
          loop
          animationData={reservation}
          play
          style={{ width: 230, height: 250 }}
          speed={1}
        />
      </div>
      <div className="col-span-2">
        <div className=" pl-4 grid justify-items-center content-center">
          <p className=" text-base mb-2">탄소 감소량 3kg CO2</p>
          <p className="text-base">지구의 온도를 낮춰주세요</p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
