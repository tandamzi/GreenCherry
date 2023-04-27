import classnames from 'classnames';
import Image from 'next/image';

import Header from '@/components/Container/Header/Header';

const MainHeader = ({ className, children }) => {
  return (
    <Header
      className={classnames(
        'flex items-center border-b-2 sticky top-0 z-30 bg-white touch-none',
        className,
      )}
    >
      <Image
        src="/assets/logo/cherryLogo.png"
        width={100}
        height={100}
        className="h-14 flex-none w-fit"
        alt="greencherry main logo"
      />
      <div className="flex items-center ml-auto">{children}</div>
    </Header>
  );
};
export default MainHeader;
