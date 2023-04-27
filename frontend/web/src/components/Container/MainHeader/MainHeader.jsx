import Image from 'next/image';

import Header from '@/components/Container/Header/Header';
import p from '@/public/assets/logo/cherryLogo.png';

const MainHeader = ({ className, children }) => {
  const logo = p;
  return (
    <Header className="bg-gray-100">
      <Image
        src={logo}
        className="h-14 flex-none w-fit"
        alt="greencherry main logo"
      />
      <div className="flex items-center ml-auto">{children}</div>
    </Header>
  );
};
export default MainHeader;
