import Lottie from 'react-lottie-player';

import foodOrderBox from '@public/assets/lottie/food-order-bag.json';
import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

import style from './index.module.scss';

const Reservation = ({ reservationList }) => {
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
        className="-ml-5"
        loop
        animationData={foodOrderBox}
        play
        options={options}
        style={{ width: 260, height: 260 }}
        speed={0.7}
      />
      {reservationList && reservationList.length > 0 ? (
        <p className="text-base w-full mb-2 -ml-9 pl-5 mob:text-base text-left ">
          현재{' '}
          <span className="text-secondary text-base font-bold">
            {reservationList.length}
          </span>
          건의 <br />
          주문이 진행중입니다.
          <br />
        </p>
      ) : (
        <p className="text-base w-full mb-2 -ml-9 pl-5 mob:text-base text-left ">
          현재 진행중인 <br /> 주문이 없습니다.
        </p>
      )}
    </div>
  );
};

export default Reservation;
