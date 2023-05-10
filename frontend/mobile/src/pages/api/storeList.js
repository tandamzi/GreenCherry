import { StatusCodes } from 'http-status-codes';

import { storeListFetch } from '@/server/store/storeList';

const handler = async (req, res) => {
  const { memberId, lat, lng, radius, sub } = req.query;
  // console.log('\n FE pages/api/SotreList');
  // console.log(req.query);
  try {
    const storeList = await storeListFetch.getStoreList(
      memberId,
      lat,
      lng,
      radius,
      sub,
    );
    // console.log('\n storeList' + storeList);
    res.status(StatusCodes.OK).json(storeList);
  } catch (error) {
    console.error('Error while fetching store list:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};
export default handler;
