import React, { useEffect, useState } from 'react';

import Container from '@/components/Container';
import AfterOpen from '@/components/Main/AfterOpen';
import BeforeOpen from '@/components/Main/BeforeOpen';
import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';
import { getCherryPoint } from '@/utils/api/store';

const Business = () => {
  const { storeAttributes, setCherryPoint } = useStore();
  const { memberAttributes } = useMember();

  /*   useEffect(() => {
    getCherryPoint(memberAttributes.storeId)
      .then(data => setCherryPoint(data))
      .catch(error => console.error(error));
  }, []); */
  useEffect(() => {
    // console.log('getCherryPoint 실행');
    getCherryPoint(memberAttributes.storeId)
      .then(data => {
        // console.log('getCherryPoint: data', data);
        setCherryPoint(data);
      })
      .catch(error => console.error(error));
  }, [memberAttributes.storeId]);

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
