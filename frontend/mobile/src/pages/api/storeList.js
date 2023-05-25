import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/csr/backendhttp';

const handler = async (req, res) => {
  const { memberId, lat, lng, radius, sub } = req.query;

  const http = createHttpInstance(req);

  let storeList = {};
  try {
    await http
      .get(
        `/store?memberId=${memberId}&lat=${lat}&lng=${lng}&radius=${radius}&sub=${sub}`,
      )
      .then(response => {
        storeList = response.data;
      });

    res.status(StatusCodes.OK).json(storeList);
  } catch (error) {
    // console.error('Error while fetching store list:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};
export default handler;
