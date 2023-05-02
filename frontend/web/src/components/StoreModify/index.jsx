import React, { useState } from 'react';
import { TiPencil } from 'react-icons/ti';

import classnames from 'classnames';

import StoreAllergiesModify from '@/components/StoreAllergiesModify';
import StoreInputModify from '@/components/StoreInputModify';
import useStore from '@/hooks/storeHook';

const StoreModify = ({ title, children, type }) => {
  const [content, setContent] = useState(useStore[type]);

  // 여기에서 useStore를 호출하고 필요한 값과 함수를 추출합니다.
  const {
    modifyState,
    modifyType,
    putModifyState,
    putStoreInfo,
    resetModifyState,
  } = useStore();

  const handleContentChange = data => {
    setContent(data);
  };

  // store modify 상태 state: true, type: type으로 변경
  const handlePencilClick = () => {
    putModifyState(type); // 수정된 부분
    // console.log('PencilClick 클릭');
  };

  // modify 요청 후 store modify 초기화
  const handleModifyClick = () => {
    putStoreInfo({
      [type]: content,
    });

    resetModifyState();
    // console.log('ModifyClick 클릭');
  };

  // modify 초기화
  const handleCancelClick = () => {
    resetModifyState();
    // console.log('CancelClick 클릭');
  };

  return (
    <div className="py-3">
      <div className={classnames('flex', 'items-center', 'justify-between')}>
        <div className={classnames('flex', 'items-center')}>
          <h3 className={classnames('font-thin', 'text-2xl', 'mb-2')}>
            {title}
          </h3>
          {!modifyState && <TiPencil size={26} onClick={handlePencilClick} />}
        </div>
        {modifyState && type === modifyType && (
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
          modifyState && type === modifyType
            ? 'border-solid border text-2xl'
            : 'text-2xl',
        )}
      >
        {(type === 'storeDescription' ||
          'cherryboxDescription' ||
          'instagram') && (
          <StoreInputModify
            itemModifyState={modifyState && type === modifyType}
            handleContentChange={handleContentChange}
            content={content}
          />
        )}
        {type === 'allergies' && (
          <StoreAllergiesModify itemModifyState={false} content={content} />
        )}
        {/* {children} */}
      </div>
    </div>
  );
};

export default StoreModify;
