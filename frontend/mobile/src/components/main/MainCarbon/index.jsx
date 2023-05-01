import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

const MainCarbon = ({ className, children }) => {
  return (
    <div className=" grid grid-cols-5 h-48 mb-2 mx-2 rounded-xl shadow-lg">
      <div className=" col-span-3 grid justify-items-center content-center">
        <div className=" pl-4 grid justify-items-center content-center">
          <p className=" text-base mb-2">탄소 감소량 3kg CO2</p>
          <p className="text-base">지구의 온도를 낮춰주세요</p>
        </div>
      </div>
      <div className="col-span-2">
        <Lottie
          loop
          animationData={sprout1}
          play
          style={{ width: 140, height: 140 }}
          speed={2}
        />
      </div>
    </div>
  );
};

export default MainCarbon;
