import axios from 'axios';

import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  const { memberId } = req.query;
  if (!memberId) {
    res.status(400).json({ message: 'member-id is required' });
    return;
  }
  try {
    const http = createHttpInstance(req);
    const response = await http.get(`/store/info?member-id=${memberId}`);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
