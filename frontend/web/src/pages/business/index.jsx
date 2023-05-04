import React, { useState } from 'react';

import Container from '@/components/Container';
import MypageModal from '@/components/MypageModal';
import useMember from '@/hooks/memberHook';

const Business = () => {
  // TODO: modal open/close 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <Container.BusinessHeader />
      <Container.MainBody className="bg-bgcolor">
        <button type="button" onClick={handleOpen}>
          모달창 열기
        </button>
        <MypageModal isOpen={isOpen} onClose={handleClose} />
      </Container.MainBody>
    </Container>
  );
};

export default Business;
