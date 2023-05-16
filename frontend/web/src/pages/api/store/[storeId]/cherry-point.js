import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  const { storeId } = req.query;
  try {
    const http = createHttpInstance(req);
    const response = await http.get(`/store/${storeId}/cherry-point`);
    // console.log('getCherryPoint API: ', response.data);

    res.status(200).json(response.data);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
