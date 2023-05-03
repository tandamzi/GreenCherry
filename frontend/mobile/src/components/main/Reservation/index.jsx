import Lottie from 'react-lottie-player';

import reservation from '@public/assets/lottie/reservation1.json';
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
        className="ml-10 mb-11"
        loop
        animationData={reservation}
        play
        options={options}
        style={{ width: 260, height: 260 }}
        speed={1}
      />
      <p className="relative right-10 text-base w-full mb-2">
        진행중인 예약이 없습니다
      </p>
    </div>
  );
};

export default Reservation;
