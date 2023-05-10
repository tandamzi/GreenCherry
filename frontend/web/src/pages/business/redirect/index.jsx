import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import { getMember } from '@/utils/api/member';
import clientHttp from '@/utils/clientHttp';

const Redirect = () => {
  const router = useRouter();

  const extractTokenFromUrl = url => {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    return urlParams.get('token');
  };

  const handleTokenResponse = async token => {
    if (token) {
      const response = await clientHttp.get(`/set-token?token=${token}`);
      // TODO: redux에 회원, 상점정보 저장하기
      if (response.data.success) {
        const data = await getMember();
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
