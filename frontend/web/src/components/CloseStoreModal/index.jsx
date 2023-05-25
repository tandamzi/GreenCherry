import React, { useState, useEffect } from 'react';

import InfoModal from '@/components/InfoModal';
import useMember from '@/hooks/memberHook';
import useModal from '@/hooks/modalHook';
import useStore from '@/hooks/storeHook';
import { putCloseStore, getCherryQuantity } from '@/utils/api/store';

const CloseStoreModal = () => {
  const { closeStoreModalOpen, closeCloseStoreModal } = useModal();
  const { closeStore } = useStore();
  const { memberAttributes } = useMember();
  const [cherryQuantity, setCherryQuantity] = useState(0);
  const handleOnClick = () => {
    putCloseStore(memberAttributes.storeId).then(res => {
      if (res.code === 0) {
        closeCloseStoreModal();
        closeStore();
      } else {
        console.error('영업종료 실패');
      }
    });
  };

  useEffect(() => {
    if (closeStoreModalOpen) {
      getCherryQuantity(memberAttributes.memberId).then(res => {
        setCherryQuantity(res);
      });
    }
  }, [closeStore]);

  return (
    <InfoModal
      isOpen={closeStoreModalOpen}
      onClose={closeCloseStoreModal}
      onClick={handleOnClick}
      okBtn
    >
      <p>영업을 종료하시겠습니까?</p>
      <p>남은 체리박스: {cherryQuantity}</p>
      <p>
        영업을 종료합니다. 진행중인 주문이 있으시면 마무리해주세요.
        수고하셨습니다.
      </p>
    </InfoModal>
  );
};

export default CloseStoreModal;
