import React from 'react';
import { TbCherry, TbPaperBag, TbPencil } from 'react-icons/tb';

import classnames from 'classnames';

import style from './index.module.scss';

const Menu = ({ menuOpen }) => {
  // eslint-disable-next-line no-console
  console.log(menuOpen);
  return (
    <div className={classnames(style.menu, menuOpen ? style.menuOpen : '')}>
      <h2 className={style.title}>Menu</h2>
      <ul className={style.menuList}>
        <li className={style.menuItem}>
          <TbCherry size={24} />
          체리박스 등록
        </li>
        <li className={style.menuItem}>
          <TbPaperBag size={24} />
          주문관리
        </li>
        <li className={style.menuItem}>
          <TbPencil size={24} />
          리뷰관리
        </li>
      </ul>
    </div>
  );
};

export default Menu;
