import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import useMember from '@/hooks/memberHook';
import { getMember } from '@/utils/api/member';
import clientHttp from '@/utils/clientHttp';

const Redirect = () => {
  const router = useRouter();
  const { login, setMemberId } = useMember();

  const extractTokenFromUrl = url => {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    return urlParams.get('token');
  };

  const handleTokenResponse = async token => {
    if (token) {
      const response = await clientHttp.get(`/set-token?token=${token}`);
      if (response.data.success) {
        const data = await getMember();
        // console.log('redirect페이지에서 getMember로 가져온 데이터: ', data);
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
