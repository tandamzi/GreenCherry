import React, { useState, useEffect } from 'react';

import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import style from './index.module.scss';

const SwitchButton = ({ active }) => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    if (router.pathname === '/member') {
      setActiveButton('user');
    } else if (router.pathname === '/business/login') {
      setActiveButton('business');
    }
  }, [activeButton]);
  return (
    <div className={style.toggleMenu}>
      <Link
        href="/member"
        className={classnames(
          style.toggleButton,
          style.userButton,
          activeButton === 'user' && style.active,
          'font-bold',
        )}
      >
        USER
      </Link>
      <Link
        href="/business/login"
        className={classnames(
          style.toggleButton,
          style.businessButton,
          activeButton === 'business' && style.active,
          'font-bold',
        )}
      >
        BUSINESS
      </Link>
    </div>
  );
};

export default SwitchButton;
