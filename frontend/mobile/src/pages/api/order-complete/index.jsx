import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/csr/backendhttp';

const handler = async (req, res) => {
  const http = createHttpInstance(req);
  const { storeId, memberId, orderQuantity } = req.query;

  await http
    .post(`order`, {
      storeId,
      memberId,
      orderQuantity,
    })
    .then(response => {
      res.status(StatusCodes.OK).json(response.data);
    });
};

export default handler;
