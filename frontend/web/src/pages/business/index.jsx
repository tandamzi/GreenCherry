import React, { useState } from 'react';

import AlertModal from '@/components/AlertModal';
import Container from '@/components/Container';
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
        {/*         <AlertModal
          isOpen={isOpen}
          onClose={handleClose}
          onClick={() => console.log('ㅎㅇㅎㅇ')}
          content="안녕하세요"
        /> */}
      </Container.MainBody>
    </Container>
  );
};

export default Business;
