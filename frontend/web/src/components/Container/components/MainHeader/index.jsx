import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import style from './index.module.scss';

import Header from '@/components/Container/components/Header';
import SwitchButton from '@/components/MemberBusinessSwitchButton';

const MainHeader = ({ children, className }) => {
  return (
    <Header
      className={classnames(
        'flex justify-between items-center fixed w-full h-24 top-0 z-10 shadow-header rounded-b-3xl bg-secondary',
        className,
      )}
    >
      <Link href="/">
        <Image
          src="/assets/logo/mainLogo-green.svg"
          width={386}
          height={69}
          className={classnames('tablet:w-3/6 tablet:ml-0', style.logo)}
          alt="greencherry main logo"
        />
      </Link>
      <SwitchButton />
    </Header>
  );
};

export default MainHeader;
