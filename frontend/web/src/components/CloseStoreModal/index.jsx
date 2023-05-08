import React from 'react';

import InfoModal from '@/components/InfoModal';
import useModal from '@/hooks/modalHook';
import useStore from '@/hooks/storeHook';

const CloseStoreModal = () => {
  const { closeStoreModalOpen, closeCloseStoreModal } = useModal();
  const { closeStore } = useStore();
  const handleOnClick = () => {
    // TODO: 영업 종료 api 호출
    closeCloseStoreModal();
    closeStore();
  };

  return (
    <InfoModal
      isOpen={closeStoreModalOpen}
      onClose={closeCloseStoreModal}
      onClick={handleOnClick}
      okBtn
    >
      <p>영업을 종료하시겠습니까?</p>
      <p>남은 진행중인 주문</p>
      <p>
        영업을 종료합니다. 진행중인 주문이 있으시면 마무리해주세요.
        수고하셨습니다.
      </p>
    </InfoModal>
  );
};

export default CloseStoreModal;
