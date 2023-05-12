import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/csr/backendhttp';

const handler = async (req, res) => {
  const http = createHttpInstance(req);

  let memberInfo = {};
  try {
    await http.get('/member').then(response => {
      memberInfo = response.data;
    });

    res.status(StatusCodes.OK).json(memberInfo);
  } catch (error) {
    // console.error('Error while fetching store list:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};
export default handler;
