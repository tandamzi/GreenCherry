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
        <BiBell size={20} className=" mr-1 " />
        <BiUserCircle size={20} />
        {children}
      </div>
    </Header>
  );
};
export default memo(MainHeader);
