import Lottie from 'react-lottie-player';

import foodOrderBox from '@public/assets/lottie/food-order-bag.json';
import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

import style from './index.module.scss';

const Reservation = () => {
  const options = {
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // 애니메이션의 종횡비 유지
    },
  };
  return (
    <div
      className={cs(
        style.reservationLottie,
        'flex justify-start items-center p-4 bg-itembg mb-2 mx-2 rounded-xl shadow-lg',
      )}
    >
      <Lottie
        className=""
        loop
        animationData={foodOrderBox}
        play
        options={options}
        style={{ width: 260, height: 260 }}
        speed={1}
      />
      <p className="text-base w-full mb-2">진행중인 예약이 없습니다</p>
    </div>
  );
};

export default Reservation;
