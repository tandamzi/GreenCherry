import React, { useState } from 'react';

import Container from '@/components/Container';
import AfterOpen from '@/components/Main/AfterOpen';
import BeforeOpen from '@/components/Main/BeforeOpen';
import useStore from '@/hooks/storeHook';
import createHttpInstance from '@/utils/http';

export async function getServerSideProps(context) {
  const { req } = context;
  const httpInstance = createHttpInstance(req);

  try {
    const response = await httpInstance.get('/member');
    const { data } = response;

    // console.log(data);
    // data를 props로 전달합니다.
    return { props: { data } };
  } catch (error) {
    console.error(error);
    return { props: { data: null, error: 'An error occurred' } };
  }
}

const Business = ({ data, error }) => {
  const { storeAttributes } = useStore();
  // console.log(getMember());
  return (
    <Container>
      <Container.BusinessHeader />
      <Container.MainBody className="bg-bgcolor h-full">
        {/* {console.log('ㅇㅁㅅㅇ', data)} */}
        {storeAttributes.open ? <AfterOpen /> : <BeforeOpen />}
      </Container.MainBody>
    </Container>
  );
};

export default Business;
