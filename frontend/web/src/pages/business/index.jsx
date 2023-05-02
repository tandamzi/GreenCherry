import React, { useState } from 'react';

import Container from '@/components/Container';
import MypageModal from '@/components/MypageModal';

const Business = () => {
  // TODO: modal open/close 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    console.log(isOpen);
    setIsOpen(true);
  };
  const handleClose = () => {
    console.log(isOpen);
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
