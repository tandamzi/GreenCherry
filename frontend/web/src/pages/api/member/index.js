import axios from 'axios';

import createHttpInstance from '@/utils/http';

// 멤버Id를 가져오는 API
export default async function handler(req, res) {
  try {
    const http = createHttpInstance(req);

    const response = await http.get('/member');
    // console.log(response.data);
    const data = {
      memberId: response.data.data.id,
    };
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
