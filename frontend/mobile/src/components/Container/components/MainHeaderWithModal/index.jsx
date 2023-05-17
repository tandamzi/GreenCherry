import { memo, useState } from 'react';
import Lottie from 'react-lottie-player';

import alarm from '@public/assets/lottie/main/Notification.json';
import mypage from '@public/assets/lottie/main/User.json';
import cs from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import NotificationList from './NotificationModal';
import Header from '../Header';

const MainHeader = ({ className, children }) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleIconClick = () => {
    setShowNotification(prevState => !prevState); // 아이콘 클릭 시 알림 목록 창의 상태를 토글
  };

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
        <button type="button" onClick={handleIconClick} className="w-8 h-8">
          <Lottie
            loop
            animationData={alarm}
            play
            option={options}
            speed={0.7}
          />
        </button>
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
        {showNotification && (
          <div
            onClick={handleIconClick} // Overlay 클릭 시 모달 닫힘
            className="fixed top-0 bottom-0 left-0 right-0 bg-line opacity-70 z-10"
          />
        )}
        <div className="z-20">
          <NotificationList show={showNotification} />
        </div>
      </div>
    </Header>
  );
};
export default memo(MainHeader);
