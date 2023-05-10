import React, { useState } from 'react';

import classnames from 'classnames';

import style from './index.module.scss';

import useMember from '@/hooks/memberHook';

const StoreNameButton = ({ onClick }) => {
  const { memberAttributes } = useMember();
  return (
    <button
      type="button"
      className={classnames(style.storeButton, 'font-bold text-secondary')}
      onClick={onClick}
    >
      {memberAttributes.storeName}
    </button>
  );
};

export default StoreNameButton;
