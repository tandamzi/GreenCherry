import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import Container from '@/components/Container';

const Redirect = () => {
  const router = useRouter();

  const extractTokenFromUrl = url => {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const token = urlParams.get('token');
    return token;
  };
  useEffect(() => {
    const url = router.asPath;
    const token = extractTokenFromUrl(url);

    router.push('/');
  }, []);
  return <Container />;
};

export default Redirect;
