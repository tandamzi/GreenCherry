import React, { useState } from 'react';
import { TbCherry, TbPaperBag, TbPencil, TbHome } from 'react-icons/tb';

import classnames from 'classnames';

import style from './index.module.scss';

import CherryBoxModal from '@/components/CherryBoxModal';
import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';

const Menu = ({ menuOpen }) => {
  const { openCherryBoxRegisterModal } = useMember();

  return (
    <div className={classnames(style.menu, menuOpen ? style.menuOpen : '')}>
      <h2 className={style.title}>Menu</h2>
      <div className={style.menuList}>
        <button
          type="button"
          className={style.menuItem}
          onClick={openCherryBoxRegisterModal}
        >
          <TbCherry size={24} />
          {open ? '영업종료' : '체리박스 등록'}
        </button>
        <button type="button" className={style.menuItem}>
          <TbPaperBag size={24} />
          주문관리
        </button>
        <button type="button" className={style.menuItem}>
          <TbPencil size={24} />
          리뷰관리
        </button>
        <button type="button" className={style.menuItem}>
          <TbHome size={24} />내 가게
        </button>
      </div>
    </div>
  );
};

export default Menu;