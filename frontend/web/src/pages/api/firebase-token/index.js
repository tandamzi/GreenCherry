import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/http';

const handler = async (req, res) => {
  const http = createHttpInstance(req);
  const { token } = req.query;

  await http
    .post(`member/notice`, {
      token,
    })
    .then(response => {
      res.status(StatusCodes.OK).json(response.data);
    });
};

export default handler;
