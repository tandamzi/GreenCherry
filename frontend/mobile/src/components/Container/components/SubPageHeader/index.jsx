import React, { memo } from 'react';
import { BiHomeHeart } from 'react-icons/bi';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import cs from 'classnames';
import { useRouter } from 'next/router';

import Header from '../Header';

const SubPageHeader = ({
  sticky = true,
  className,
  title,
  goNext = null,
  goHome = null,
  disableBefore,
}) => {
  const router = useRouter();

  const goToBack = () => {
    router.back();
  };

  const goToNext = () => {
    goNext();
  };

  const goToHome = () => {
    router.push('/');
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
            <SlArrowLeft />
          </button>
        )}
      </div>
      <div id="sub-header-title" className="font-bold">
        {title}
        {goHome && <BiHomeHeart className="text-4xl" onClick={goToHome} />}
      </div>
      <div className="w-8 h-8">
        {goNext && (
          <button
            type="button"
            onClick={goToNext}
            className="w-8 h-8 flex items-center justify-end"
          >
            <SlArrowRight />
          </button>
        )}
      </div>
    </Header>
  );
};

export default memo(SubPageHeader);
