import { memo } from 'react';
import { FaMapMarkerAlt, FaHome, FaUserAlt } from 'react-icons/fa';
import { FiHome, FiCamera, FiUser } from 'react-icons/fi';

import cs from 'classnames';
import Link from 'next/link';
import { Container } from 'postcss';

import style from './index.module.scss';
import MainFooter from '../MainFooter';
import MainHeader from '../MainHeader';

const MainFooterWithNavigation = ({ className }) => {
  return (
    <MainFooter
      className={cs(
        'bg-white w-full flex cursor-pointer justify-evenly items-center z-30 touch-none',
        className,
      )}
    >
      <Link href="/" className="flex flex-col w-16 text-center">
        <FaMapMarkerAlt size={32} className="shrink-0 ml-auto mr-auto" />
        <span className={cs(`font-medium text-xs`)}>내주변가게</span>
      </Link>
      <Link href="/auth" className="flex flex-col w-16 text-center relative">
        <div className={cs('absolute', style.BackgroundCircle)} />
        <FaHome size={38} className="shrink-0 ml-auto mr-auto" />
        <span className={cs(`font-medium text-sm`)}>홈</span>
      </Link>
      <Link href="/mypage" className="flex flex-col w-16 text-center">
        <FaUserAlt size={32} className="shrink-0 ml-auto mr-auto" />
        <span className={cs(`font-medium text-xs`)}>마이페이지</span>
      </Link>
    </MainFooter>
  );
};

export default memo(MainFooterWithNavigation);
