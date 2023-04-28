import { memo } from 'react';
import { BiBell, BiUserCircle } from 'react-icons/bi';

import cs from 'classnames';
import Image from 'next/image';

// import logo from './img/mainLogo.svg';
import Header from '../Header';

const MainHeader = ({ className, children }) => {
  return (
    <Header
      className={cs(
        'flex items-center  sticky top-0 z-30 bg-white touch-none ',
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
      <div className="flex items-center ml-auto ">
        {' '}
        <BiBell className=" mr-1 " />
        <BiUserCircle />
        {children}
      </div>
    </Header>
  );
};
export default memo(MainHeader);
