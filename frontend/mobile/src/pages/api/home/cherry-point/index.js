import { StatusCodes } from 'http-status-codes';

// import createHttpInstance from '@/utils/ssr/backendhttp';
import createHttpInstance from '@/utils/csr/backendhttp';

const handler = async (req, res) => {
  const http = createHttpInstance(req);
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month and pad it with "0" if it's a single digit
  const date = today.getDate().toString().padStart(2, '0'); // Pad the date with "0" if it's a single digit

  const todayDate = `${year}-${month}-${date}`;

  try {
    await http
      .get(`/order/week/cherry-point?current-date=${todayDate}`)
      .then(response => {
        res.status(StatusCodes.OK).json(response.data);
      });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error.response.data);
  }
};

export default handler;
