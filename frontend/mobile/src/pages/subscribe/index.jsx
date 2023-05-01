/* eslint-disable react/button-has-type */
import React from 'react';

import { useRouter } from 'next/router';

import Container from '@/components/Container';

const subscribe = () => {
  const router = useRouter();

  return (
    <Container>
      <h1>구독 page</h1>
    </Container>
  );
};

export default subscribe;
