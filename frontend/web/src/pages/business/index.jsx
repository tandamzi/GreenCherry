import React, { useState } from 'react';

import Container from '@/components/Container';
import AfterOpen from '@/components/Main/AfterOpen';
import BeforeOpen from '@/components/Main/BeforeOpen';
import useStore from '@/hooks/storeHook';

const Business = () => {
  const { storeAttributes } = useStore();
  return (
    <Container>
      <Container.BusinessHeader />
      <Container.MainBody className="bg-bgcolor h-full">
        {storeAttributes.open ? <AfterOpen /> : <BeforeOpen />}
      </Container.MainBody>
    </Container>
  );
};

export default Business;
