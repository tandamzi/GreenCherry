import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  const {
    query: { storeId },
    method,
  } = req;
  const http = createHttpInstance(req);
  switch (method) {
    case 'PUT': {
      const response = await http.put(`/store/${storeId}/cherrybox`, req.body);
      try {
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
