import { memo } from 'react';
import { FiHome, FiCamera, FiUser } from 'react-icons/fi';

import cx from 'classnames';
import Link from 'next/link';

import style from './index.module.scss';
import MainFooter from '../MainFooter';

const MainFooterWithNavigation = ({ className }) => {
  return (
    <MainFooter
      className={cx(
        'bg-white w-full flex cursor-pointer justify-evenly items-center z-30 touch-none',
        className,
      )}
    >
      <Link href="/" className="flex flex-col w-16 text-center">
        <FiHome size={32} className="shrink-0 ml-auto mr-auto" />
        <span className={cx(`font-medium text-xs`)}>홈</span>
      </Link>
      <Link href="/auth" className="flex flex-col w-16 text-center relative">
        <div className={cx('absolute', style.BackgroundCircle)} />
        <FiCamera size={38} className="shrink-0 ml-auto mr-auto" />
        <span className={cx(`font-medium text-sm`)}>인증</span>
      </Link>
      <Link href="/mypage" className="flex flex-col w-16 text-center">
        <FiUser size={32} className="shrink-0 ml-auto mr-auto" />
        <span className={cx(`font-medium text-xs`)}>마이페이지</span>
      </Link>
    </MainFooter>
  );
};

export default memo(MainFooterWithNavigation);
