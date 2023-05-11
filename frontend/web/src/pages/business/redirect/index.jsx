import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import useStore from '@/hooks/memberHook';
import { getMember } from '@/utils/api/member';
import clientHttp from '@/utils/clientHttp';

const Redirect = () => {
  const router = useRouter();
  const { login, setMemberId } = useStore();

  const extractTokenFromUrl = url => {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    return urlParams.get('token');
  };

  const handleTokenResponse = async token => {
    if (token) {
      const response = await clientHttp.get(`/set-token?token=${token}`);
      if (response.data.success) {
        const data = await getMember();
        if (data.isJoined) {
          login(data);
        } else {
          setMemberId(data);
        }
        const destination = data.isJoined ? '/business' : '/business/join';
        router.push(destination);
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    const token = extractTokenFromUrl(router.asPath);
    handleTokenResponse(token);
  }, []);

  return <Container />;
};

export default Redirect;
