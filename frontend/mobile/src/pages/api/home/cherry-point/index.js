import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/ssr/backendhttp';

const handler = async (req, res) => {
  const http = createHttpInstance(req);
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const todayDate = `${year}-${month}-${date}`;

  try {
    await http
      .get(`/order/week/cherry-point?current-date=${todayDate}`)
      .then(response => {
        res.status(StatusCodes.OK).json(response.data);
      });
  } catch (error) {
    // console.log('abababab' + error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.response.data);
  }
};

export default handler;
