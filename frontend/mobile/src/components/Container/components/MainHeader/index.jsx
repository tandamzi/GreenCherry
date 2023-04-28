import { memo } from 'react';

import cs from 'classnames';
import Image from 'next/image';

import logo from './img/mainLogo.png';
import Header from '../Header';

const MainHeader = ({ className, children }) => {
  return (
    <Header
      className={cs(
        'flex items-center border-b-2 sticky top-0 z-30 bg-white touch-none',
        className,
      )}
    >
      <Image
        src={logo}
        className="h-14 flex-none w-fit"
        alt="devday main logo"
      />
      <div className="flex items-center ml-auto">{children}</div>
    </Header>
  );
};
export default memo(MainHeader);
