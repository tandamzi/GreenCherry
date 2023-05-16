import { memo } from 'react';
import Lottie from 'react-lottie-player';

import alarm from '@public/assets/lottie/main/Notification.json';
import mypage from '@public/assets/lottie/main/User.json';
import cs from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import Header from '../Header';

const MainHeader = ({ className, children }) => {
  const options = {
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // 애니메이션의 종횡비 유지
    },
  };
  return (
    <Header
      className={cs(
        'flex justify-between items-center sticky top-0 z-30 bg-white px-12 touch-none ',
        className,
      )}
    >
      <Image
        src="/assets/logo/mainLogo.svg"
        width={100}
        height={100}
        className=" h-6 flex-none w-fit"
        alt="devday main logo"
      />
      <div className="flex items-center">
        <Link href="/alarm" className="w-8 h-8">
          <Lottie
            loop
            animationData={alarm}
            play
            option={options}
            speed={0.7}
          />
        </Link>
        <Link href="/mypage" className="w-8 h-8">
          <Lottie
            loop
            animationData={mypage}
            play
            option={options}
            speed={0.7}
          />
        </Link>
        {children}
      </div>
    </Header>
  );
};
export default memo(MainHeader);
