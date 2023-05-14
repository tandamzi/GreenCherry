import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  const {
    query: { storeId },
    query: { orderDate },
  } = req;
  try {
    const http = createHttpInstance(req);
    const response = await http.put(
      `/order/revenue?store-id=${storeId}&order-date=${orderDate}`,
    );
    res.status(200).json(response.data.data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
