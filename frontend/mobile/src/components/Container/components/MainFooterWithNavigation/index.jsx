import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaUserAlt } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

import cs from 'classnames';
import Link from 'next/link';

import MainFooter from '../MainFooter';

import { changePage } from '@/redux/footerStatus/footerReducer';

const MainFooterWithNavigation = ({ className, position }) => {
  const footerStatus = useSelector(state => state.footer);
  const dispatch = useDispatch();

  const [iconColors, setIconColors] = useState({
    mapMarker: 'var(--color-line)',
    home: 'var(--color-line)',
    myPage: 'var(--color-line)',
  });

  useEffect(() => {
    const { currentPage } = footerStatus;
    setIconColors(prevColors => ({
      ...prevColors,
      mapMarker:
        currentPage === '내 주변 가게'
          ? 'var(--color-primary-event)'
          : 'var(--color-line)',
      home:
        currentPage === '홈'
          ? 'var(--color-primary-event)'
          : 'var(--color-line)',
      myPage:
        currentPage === '마이페이지'
          ? 'var(--color-primary-event)'
          : 'var(--color-line)',
    }));
  }, [footerStatus.currentPage]);

  const handlePageChange = page => {
    dispatch(changePage(page));
  };

  return (
    <MainFooter
      className={cs(
        'flex cursor-pointer justify-between p-6 items-center z-30 touch-none',
        className,
      )}
      position={position}
    >
      <Link
        href="/order"
        className="flex flex-col w-18 text-center"
        onClick={() => handlePageChange('주변 가게')}
      >
        <FaMapMarkerAlt
          size={28}
          style={{ color: iconColors.mapMarker }}
          className="shrink-0 ml-auto mr-auto"
        />
        <span className={cs(`text-secondaryfont text-xs mt-1 font-bold`)}>
          주변 가게
        </span>
      </Link>
      <Link
        href="/"
        className="flex flex-col w-18 text-center relative"
        onClick={() => handlePageChange('홈')}
      >
        <HiHome
          size={32}
          style={{ color: iconColors.home }}
          className="shrink-0 ml-auto mr-auto"
        />
        <span className={cs(`text-secondaryfont text-xs font-bold`)}>홈</span>
      </Link>
      <Link
        href="/mypage"
        className="flex flex-col w-18 text-center"
        onClick={() => handlePageChange('마이페이지')}
      >
        <FaUserAlt
          size={28}
          style={{ color: iconColors.myPage }}
          className="shrbg-lineink-0 ml-auto mr-auto"
        />
        <span className={cs(`text-secondaryfont text-xs mt-1 font-bold`)}>
          마이페이지
        </span>
      </Link>
    </MainFooter>
  );
};

export default MainFooterWithNavigation;
