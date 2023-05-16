import React, { useState } from 'react';
import { TbCherry, TbPaperBag, TbPencil, TbHome } from 'react-icons/tb';

import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import style from './index.module.scss';

import CherryBoxModal from '@/components/CherryBoxModal';
import useMember from '@/hooks/memberHook';
import useModal from '@/hooks/modalHook';
import useStore from '@/hooks/storeHook';

const Menu = ({ menuOpen }) => {
  const { openCherryBoxRegisterModal } = useMember();
  const { openCloseStoreModal } = useModal();
  const { storeAttributes } = useStore();
  const { logout } = useMember();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className={classnames(style.menu, menuOpen ? style.menuOpen : '')}>
      <h2 className={style.title}>Menu</h2>
      <div className={style.menuList}>
        {storeAttributes.open ? (
          <button
            type="button"
            className={style.menuItem}
            onClick={openCloseStoreModal}
          >
            <TbCherry size={24} />
            영업종료
          </button>
        ) : (
          <button
            type="button"
            className={style.menuItem}
            onClick={openCherryBoxRegisterModal}
          >
            <TbCherry size={24} />
            체리박스 등록
          </button>
        )}
        <Link href="/business/order">
          <button type="button" className={style.menuItem}>
            <TbPaperBag size={24} />
            주문관리
          </button>
        </Link>
        <button type="button" className={style.menuItem}>
          <TbPencil size={24} />
          리뷰관리
        </button>
        <button type="button" className={style.menuItem}>
          <TbHome size={24} />내 가게
        </button>
        <button type="button" className={style.menuItem} onClick={handleLogout}>
          <TbHome size={24} /> 로그아웃
        </button>
      </div>
    </div>
  );
};

export default Menu;
