import axios from 'axios';

import createHttpInstance from '@/utils/http';

async function fetchMemberAndStoreInfo(req) {
  const http = createHttpInstance(req);

  // 멤버 정보
  const memberResponse = await http.get('/member');
  const memberId = memberResponse.data.data.id;

  // store 등록 여부 확인 + store 정보 가져오기
  try {
    const storeResponse = await http.get(`/store/info?member-id=${memberId}`);
    const { storeId, name, open } = storeResponse.data.data;
    return {
      isJoined: true,
      memberId,
      storeId,
      storeName: name,
      open,
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {
        isJoined: false,
        memberId,
      };
    }
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await fetchMemberAndStoreInfo(req);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
