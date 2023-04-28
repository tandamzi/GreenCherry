import classnames from 'classnames';
import Image from 'next/image';

import style from './index.module.scss';

import Header from '@/components/Container/Header';

const BusinessHeader = ({ children, className }) => {
  return (
    <Header
      className={classnames(
        'flex items-center fixed w-full h-24 top-0 z-30 shadow-header rounded-header bg-bgcolor',
        className,
      )}
    >
      <Image
        src="/assets/logo/mainLogo-white.svg"
        width={386}
        height={69}
        className={classnames('tablet:w-3/6 flex-none tablet:ml-0', style.logo)}
        alt="greencherry main logo"
      />
      <div className="flex items-center ml-auto">{children}</div>
    </Header>
  );
};

export default BusinessHeader;
