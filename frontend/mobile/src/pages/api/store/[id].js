import { StatusCodes } from 'http-status-codes';

import { storeFetch } from '@/server/store/store';

const handler = async (req, res) => {
  const { id } = req.query;
  const suggestions = await storeFetch.getStoreDetail(id);
  res.status(StatusCodes.OK).json(suggestions);
};

export default handler;
