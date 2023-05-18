import Lottie from 'react-lottie-player';

import sprout1 from '@public/assets/lottie/sprout1.json';
import cs from 'classnames';

import style from './index.module.scss';

const MainCarbon = ({ cherryPoint }) => {
  return (
    <div className="flex justify-center py-2 mb-2 mx-2 rounded-xl shadow-lg">
      <div className="flex items-center">
        <span className={cs(style['reactive-font'], 'p-5 text-center ')}>
          모두의 노력으로
          <p className={cs(style['reactive-font-bold'])}>
            {cherryPoint.data.totalPoint}Kg CO<sub>2</sub>
          </p>
          <p>탄소를 절약했어요</p>
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
