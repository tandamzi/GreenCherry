import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import { saveToken, saveInfo } from '@/redux/member/memberReducer';
import clientHttp from '@/utils/csr/clientHttp';

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
    const fetchToken = async () => {
      const token = extractTokenFromUrl(url);
      if (token) {
        const response = await fetch(`/api/set-token?token=${token}`);

        if (response.ok) {
          dispatch(saveToken(token));

          await clientHttp.get('/memberInfo').then(res => {
            dispatch(saveInfo(res.data));
          });

          router.replace('/');
        } else {
          router.replace('/');
        }
      } else {
        router.replace('/');
      }
    };

    fetchToken();
  }, []);
  return <Container />;
};

export default redirect;
