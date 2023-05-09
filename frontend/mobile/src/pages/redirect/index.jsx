/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { useDispatch } from 'react-redux';

import forkSpoonLoading from '@public/assets/lottie/forkSpoonLoading.json';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import { saveToken } from '@/redux/member/memberReducer';

const redirect = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const extractTokenFromUrl = url => {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const token = urlParams.get('token');
    return token;
  };
  useEffect(() => {
    const url = router.asPath;
    const token = extractTokenFromUrl(url);
    dispatch(saveToken(token));

    router.push('/');
  }, []);
  return <Container />;
};

export default redirect;
