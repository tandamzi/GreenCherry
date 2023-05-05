import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

import style from './index.module.scss';

const MainCarbon = () => {
  return (
    <div className="flex justify-center py-4 mb-2 mx-2 rounded-xl shadow-lg">
      <div className="flex items-center">
        <span className={cs(style['reactive-font'], 'p-5 text-center')}>
          탄소 감소량{' '}
          <span className={cs(style['reactive-font-bold'])}>3kg Co2</span>
          <br /> 지구의 온도를 낮춰주세요
        </span>
      </div>
      <div className="col-span-2">
        <Lottie
          loop
          animationData={sprout1}
          play
          className="mb-6"
          style={{ width: 140, height: 140 }}
          speed={2}
        />
      </div>
    </div>
  );
};

export default MainCarbon;
