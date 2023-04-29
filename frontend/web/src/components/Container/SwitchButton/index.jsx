import React, { useState } from 'react';

import classnames from 'classnames';

import style from './index.module.scss';

const SwitchButton = ({ active }) => {
  const [activeButton, setActiveButton] = useState('');

  const handleUserClick = () => {
    setActiveButton('user');
  };

  const handleBusinessClick = () => {
    setActiveButton('business');
  };
  return (
    <div className={style.toggleMenu}>
      <button
        type="button"
        className={classnames(
          style.toggleButton,
          style.userButton,
          activeButton === 'user' && style.active,
          'font-bold',
        )}
        onClick={handleUserClick}
      >
        USER
      </button>
      <button
        type="button"
        className={classnames(
          style.toggleButton,
          style.businessButton,
          activeButton === 'business' && style.active,
          'font-bold',
        )}
        onClick={handleBusinessClick}
      >
        BUSINESS
      </button>
    </div>
  );
};

export default SwitchButton;
