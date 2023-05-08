import React, { useState } from 'react';

import Container from '@/components/Container';

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
        <div className="text-xl">business 페이지</div>
      </Container.MainBody>
    </Container>
  );
};

export default Business;
