import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/csr/backendhttp';

const handler = async (req, res) => {
  const memberId = req.query.slug[0];
  const storeId = req.query.slug[1];
  const http = createHttpInstance(req);

  try {
    await http.get(`store/${memberId}/subscribe/${storeId}`).then(response => {
      res.status(StatusCodes.OK).json(response.data);
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};

export default handler;
