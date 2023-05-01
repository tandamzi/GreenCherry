import { memo } from 'react';
import { FaMapMarkerAlt, FaUserAlt } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';

import cs from 'classnames';
import Link from 'next/link';

import style from './index.module.scss';
import MainFooter from '../MainFooter';

const MainFooterWithNavigation = ({ className }) => {
  return (
    <MainFooter
      className={cs(
        'bg-white w-full flex cursor-pointer justify-evenly items-center z-30 touch-none',
        className,
      )}
    >
      <Link href="/" className="flex flex-col w-17 text-center">
        <FaMapMarkerAlt
          size={28}
          className="font-primary shrink-0 ml-auto mr-auto"
        />
        <span className={cs(`text-xs mt-1 font-bold`)}>내 주변 가게</span>
      </Link>
      <Link href="/" className="flex flex-col w-16 text-center relative">
        <HiHome size={30} className="shrink-0 ml-auto mr-auto" />
        <span className={cs(`text-sm mt-1 font-bold`)}>홈</span>
      </Link>
      <Link href="/mypage" className="flex flex-col w-17 text-center">
        <FaUserAlt size={28} className="shrbg-lineink-0 ml-auto mr-auto" />
        <span className={cs(`text-xs mt-1 font-bold`)}>마이페이지</span>
      </Link>
    </MainFooter>
  );
};

export default memo(MainFooterWithNavigation);
