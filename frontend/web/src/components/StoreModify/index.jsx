import React, { useState } from 'react';
import { TiPencil } from 'react-icons/ti';

import classnames from 'classnames';

import useStore from '@/hooks/useStore';

const StoreModify = ({ title, children, type }) => {
  // store의 modify 상태 저장
  const [content, setContent] = useState(useStore[type]);

  // store modify 상태 state: true, type: type으로 변경
  const handlePencilClick = () => {
    useStore.modifyState(type);
    // console.log('PencilClick 클릭');
  };

  // modify 요청 후 store modify 초기화
  const handleModifyClick = () => {
    useStore.putStoreInfo({
      [type]: content,
    });

    useStore.resetModifyState();
    // console.log('ModifyClick 클릭');
  };

  // modify 초기화
  const handleCancelClick = () => {
    useStore.resetModifyState();
    // console.log('CancelClick 클릭');
  };

  return (
    <div className="py-3">
      <div className={classnames('flex', 'items-center', 'justify-between')}>
        <div className={classnames('flex', 'items-center')}>
          <h3 className={classnames('font-thin', 'text-2xl', 'mb-2')}>
            {title}
          </h3>
          {!useStore.modifyState && (
            <TiPencil size={26} onClick={handlePencilClick} />
          )}
        </div>
        {useStore.modifyState && type === useStore.modifyType && (
          <div
            className={classnames('font-thin', 'text-xl', 'text-right', 'flex')}
          >
            <button type="button" className="mr-2" onClick={handleModifyClick}>
              수정하기
            </button>
            <button type="button" onClick={handleCancelClick}>
              취소하기
            </button>
          </div>
        )}
      </div>
      <div
        className={classnames(
          useStore.modifyState && type === useStore.modifyType
            ? 'border-solid border text-2xl'
            : 'text-2xl',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default StoreModify;
