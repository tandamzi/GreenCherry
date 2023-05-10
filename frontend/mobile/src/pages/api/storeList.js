import { StatusCodes } from 'http-status-codes';

import http from '@/server/api/http';

const handler = async (req, res) => {
  const { memberId, lat, lng, radius, sub } = req.query;

  try {
    const response = await http.get(`/store`, {
      params: {
        memberId,
        lat,
        lng,
        radius,
        sub,
      },
    });
    const storeList = response.data; // 'data' property contains the actual data
    res.status(StatusCodes.OK).json(storeList);
  } catch (error) {
    console.error('Error while fetching store list:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};
export default handler;
