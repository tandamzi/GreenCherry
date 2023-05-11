import axios from 'axios';

import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  try {
    const response = await createHttpInstance(req).get('/store/allergy');
    res.status(200).json(response.data.data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
