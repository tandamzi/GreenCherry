import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import { saveToken, loginAsync } from '@/redux/member/memberReducer';

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
      // dispatch(saveToken(token));
      if (token) {
        // 서버에 토큰을 전달하여 쿠키로 설정
        const response = await fetch(`/api/set-token?token=${token}`);

        if (response.ok) {
          dispatch(saveToken(token));
          // dispatch(loginAsync(token));
          // 쿠키 설정 후 원하는 페이지로 리다이렉트
          router.replace('/');
        } else {
          // 에러 처리
          // console.log('토큰이 있지만 오류남');
          router.replace('/');
        }
      } else {
        // 토큰이 없는 경우 처리
        // 예: 에러 페이지로 리다이렉트
        // console.log('토큰이 없다');
        router.replace('/');
      }
    };

    fetchToken();
  }, []);
  return <Container />;
};

export default redirect;
