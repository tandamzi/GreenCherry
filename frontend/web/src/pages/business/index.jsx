import React, { useState } from 'react';

import Container from '@/components/Container';
import AfterOpen from '@/components/Main/AfterOpen';
import BeforeOpen from '@/components/Main/BeforeOpen';

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
        <BeforeOpen />
        {/* <AfterOpen /> */}
      </Container.MainBody>
    </Container>
  );
};

export default Business;
