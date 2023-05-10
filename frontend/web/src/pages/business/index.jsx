import React, { useState } from 'react';

import Container from '@/components/Container';
import AfterOpen from '@/components/Main/AfterOpen';
import BeforeOpen from '@/components/Main/BeforeOpen';
import useStore from '@/hooks/storeHook';

const Business = () => {
  const { storeAttributes } = useStore();
  async function fetchData() {
    const response = await fetch('/api/some-data');
    const data = await response.json();
    // 데이터 처리
    // console.log('내정보', data);
  }
  // console.log(fetchData());
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
