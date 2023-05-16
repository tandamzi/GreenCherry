import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/csr/backendhttp';

const handler = async (req, res) => {
  const { id } = req.query;
  const http = createHttpInstance(req);

  try {
    await http
      .get(`notice/list?member-id=${id}&sort=createDate,desc`)
      .then(response => {
        res.status(StatusCodes.OK).json(response.data);
      });
  } catch (error) {
    console.error('Error while fetching store list:', error);
  }
};

export default handler;
