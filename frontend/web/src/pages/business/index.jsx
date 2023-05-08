import React, { useState } from 'react';

import Container from '@/components/Container';
import AfterOpen from '@/components/Main/AfterOpen';

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
        <AfterOpen />
      </Container.MainBody>
    </Container>
  );
};

export default Business;
