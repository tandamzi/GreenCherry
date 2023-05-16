import React, { memo } from 'react';
import { FaMapMarkerAlt, FaHome, FaUserAlt } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';

import cs from 'classnames';
import { useRouter } from 'next/router';

import Header from '../Header';

const SubPageHeader = ({
  sticky = true,
  className,
  title,
  goHome = null,
  disableBefore,
}) => {
  const router = useRouter();

  const goToBack = () => {
    router.back();
  };

  const goToHome = () => {
    router.push('/home');
  };

  return (
    <Header
      className={cs(
        sticky && 'sticky top-0 touch-none',
        'bg-white flex items-center justify-between bg-white z-30',
        className,
      )}
    >
      <div className="w-8 h-8">
        {!disableBefore && (
          <button
            type="button"
            onClick={goToBack}
            className="w-8 h-8 flex items-center justify-start"
          >
            <IoIosArrowBack size={20} />
          </button>
        )}
      </div>
      <div id="sub-header-title" className="font-bold">
        {title}
      </div>
      <div>
        {goHome && <HiHome size={20} className="text-4xl" onClick={goToHome} />}
      </div>
    </Header>
  );
};

export default memo(SubPageHeader);
