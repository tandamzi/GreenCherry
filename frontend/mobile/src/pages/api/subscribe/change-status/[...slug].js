import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/csr/backendhttp';

const handler = async (req, res) => {
  const memberId = req.query.slug[0];
  const storeId = req.query.slug[1];
  const method = req.query.slug[2];
  const http = createHttpInstance(req);
  if (method === 'delete') {
    try {
      await http
        .delete(`store/${storeId}/subscribe?memberId=${memberId}`)
        .then(response => {
          res.status(StatusCodes.OK).json(response.data);
        });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  } else {
    try {
      await http
        .post(`store/${storeId}/subscribe?memberId=${memberId}`)
        .then(response => {
          res.status(StatusCodes.OK).json(response.data);
        });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
};

export default handler;
