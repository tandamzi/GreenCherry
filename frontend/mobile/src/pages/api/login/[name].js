/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';

import loginApi from '@/server/login/loginApi';

const handler = async (req, res) => {
  const { name } = req.query;
  const suggestions = await loginApi(name);
  res.status(StatusCodes.OK).json(suggestions);
};

export default handler;
