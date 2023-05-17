import { StatusCodes } from 'http-status-codes';

import shortDb from '@/utils/shortDb.json';
import createHttpInstance from '@/utils/ssr/backendhttp';
import createYoutubeIntstacne from '@/utils/youtube';

const handler = async (req, res) => {
  const response = shortDb;
  res.status(StatusCodes.OK).json(response);
};

export default handler;
