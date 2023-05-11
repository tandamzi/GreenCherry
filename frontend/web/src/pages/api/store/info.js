import axios from 'axios';

import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  const { storeId } = req.query;
  if (!storeId) {
    res.status(400).json({ message: 'store-id is required' });
    return;
  }
  try {
    const http = createHttpInstance(req);

    const response = await http.get(`/store/info?store-id=${storeId}`);

    res.status(200).json(response.data);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
