import React, { useState } from 'react';
import { TiPencil } from 'react-icons/ti';

import classnames from 'classnames';

import StoreInputModify from '@/components/StoreInputModify';
import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';
import { putModifyStore } from '@/utils/api/store';

const StoreModify = ({ title, children, type }) => {
  const { storeAttributes } = useStore();
  const { memberAttributes } = useMember();
  const [content, setContent] = useState(storeAttributes[type]);

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

  const handlePencilClick = () => {
    putModifyState(type);
  };

  const handleModifyClick = () => {
    // json 형식일 때
    try {
      putModifyStore(memberAttributes.storeId, { [type]: content }).then(
        res => {
          putStoreInfo({
            [type]: content,
          });
        },
      );
    } catch (error) {
      console.error('Error in modifying the store: ', error);
    }

    resetModifyState();
  };

  const handleCancelClick = () => {
    setContent(storeAttributes[type]);
    resetModifyState();
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
        {type === 'allergies' && <div>알러지</div>}
        {/* {children} */}
      </div>
    </div>
  );
};

export default StoreModify;
