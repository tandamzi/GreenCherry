import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  const {
    query: { storeId, orderDate, page },
  } = req;
  try {
    const http = createHttpInstance(req);
    const response = await http.get(
      `/order?store-id=${storeId}&order-date=${orderDate}&page=${page}`,
    );

    const data = {
      orderList: response.data.data.content,
      page: {
        last: response.data.data.last,
        pageNumber: response.data.data.pageable.pageNumber,
      },
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
