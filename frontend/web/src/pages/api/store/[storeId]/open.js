import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  const { storeId } = req.query;
  try {
    const http = createHttpInstance(req);
    const response = await http.get(`/store/info?store-id=${storeId}`);

    res.status(200).json(response.data.data.open);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
