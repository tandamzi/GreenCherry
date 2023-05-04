import React, { useState } from 'react';

import Container from '@/components/Container';
import InfoModal from '@/components/InfoModal';
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
        <div>ㅇㅇ</div>
      </Container.MainBody>
    </Container>
  );
};

export default Business;
