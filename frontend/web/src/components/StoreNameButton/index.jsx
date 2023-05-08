import React, { useState } from 'react';

import classnames from 'classnames';

import style from './index.module.scss';

const StoreNameButton = ({ storeName, onClick }) => {
  return (
    <button
      type="button"
      className={classnames(style.storeButton, 'font-bold text-secondary')}
      onClick={onClick}
    >
      {storeName}
    </button>
  );
};

export default StoreNameButton;
