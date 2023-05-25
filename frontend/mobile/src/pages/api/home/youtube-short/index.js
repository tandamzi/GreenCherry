import { StatusCodes } from 'http-status-codes';

import shortDb from '@/utils/shortDb.json';

const handler = async (req, res) => {
  const response = shortDb;
  res.status(StatusCodes.OK).json(response);
};

export default handler;
