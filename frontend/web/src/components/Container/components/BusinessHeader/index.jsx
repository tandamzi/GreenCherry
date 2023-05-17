import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import style from './index.module.scss';

import Menu from '@/components/BusinessMenu';
import Header from '@/components/Container/components/Header';
import StoreNameButton from '@/components/StoreNameButton';
import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';
import { getStoreOpen } from '@/utils/api/store';

const BusinessHeader = ({ children, className }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { memberAttributes, openMyStoreModal } = useMember();
  const { setOpen } = useStore();
  const router = useRouter();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMyStoreClick = () => {
    openMyStoreModal();
  };

  const handleLogoClick = () => {
    getStoreOpen(memberAttributes.storeId).then(res => {
      setOpen(res);
    });
    router.push('/business');
  };

  return (
    <Header
      className={classnames(
        'flex items-center justify-between fixed w-full h-24 top-0 z-30 shadow-header rounded-b-3xl bg-bgcolor',
        className,
      )}
    >
      <Image
        src="/assets/logo/mainLogo-white.svg"
        width={386}
        height={69}
        className={classnames(
          'tablet:w-3/6 flex-none tablet:ml-0 mr-10',
          style.logo,
        )}
        alt="greencherry main logo"
        onClick={handleLogoClick}
      />
      <div className={style.menu}>
        <StoreNameButton
          storeName="가게 이름 입니다"
          onClick={handleMyStoreClick}
        />
        <GiHamburgerMenu
          size={48}
          className="text-secondary"
          onClick={handleMenuClick}
        />
      </div>
      <Menu menuOpen={menuOpen} />
    </Header>
  );
};

export default BusinessHeader;
