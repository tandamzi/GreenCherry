/* eslint-disable react/button-has-type */
import React from 'react';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import SubscribeStore from '@/components/SubscribeStore';

const subscribe = () => {
  const router = useRouter();

  return (
    <Container>
      <SubscribeStore />
    </Container>
  );
};

export default subscribe;
