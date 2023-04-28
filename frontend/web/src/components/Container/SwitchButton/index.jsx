import React, { useState } from 'react';

import classnames from 'classnames';

import style from './index.module.scss';

const SwitchButton = ({ checked, state }) => {
  const [activeButton, setActiveButton] = useState('user');

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
        )}
      >
        USER
      </button>
      <button
        type="button"
        className={classnames(style.toggleButton, style.businessButton)}
      >
        BUSINESS
      </button>
    </div>
  );
};

export default SwitchButton;
