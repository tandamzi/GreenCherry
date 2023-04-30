import classnames from 'classnames';
import Image from 'next/image';

import style from './index.module.scss';

import Header from '@/components/Container/component/Header';
import SwitchButton from '@/components/MemberBusinessSwitchButton';

const MainHeader = ({ children, className }) => {
  return (
    <Header
      className={classnames(
        'flex justify-between items-center fixed w-full h-24 top-0 z-30 shadow-header rounded-header bg-secondary',
        className,
      )}
    >
      <Image
        src="/assets/logo/mainLogo-green.svg"
        width={386}
        height={69}
        className={classnames('tablet:w-3/6 tablet:ml-0', style.logo)}
        alt="greencherry main logo"
      />
      <SwitchButton />
    </Header>
  );
};

export default MainHeader;
