import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  const {
    query: { orderId },
  } = req;
  try {
    const http = createHttpInstance(req);
    const response = await http.put(`/order/${orderId}/ORDER_COMPLETE`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
