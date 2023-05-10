import React, { useState } from 'react';

import Container from '@/components/Container';
import AfterOpen from '@/components/Main/AfterOpen';
import BeforeOpen from '@/components/Main/BeforeOpen';
import useStore from '@/hooks/storeHook';
import { getMember } from '@/utils/api/member';
import clientHttp from '@/utils/clientHttp';

const Business = () => {
  const { storeAttributes } = useStore();
  // console.log(getMember());
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
