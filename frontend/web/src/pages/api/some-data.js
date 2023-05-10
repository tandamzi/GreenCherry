import axios from 'axios';

import parseCookies from '@/utils/parseCookies';

export default async function handler(req, res) {
  const { cookie } = req.headers;
  const cookies = parseCookies(cookie);
  // console.log('꾸끼즈', cookies);
  const { token } = cookies;
  try {
    // Spring 서버에 요청
    const response = await axios.get(
      'http://greencherry-owner.shop/api/member',
      {
        headers: {
          // 쿠키에서 가져온 토큰을 인증 헤더로 설정
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Spring 서버에서 받은 데이터를 클라이언트에 전달
    res.status(200).json(response.data);
  } catch (error) {
    // 에러 처리
    // console.log(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
