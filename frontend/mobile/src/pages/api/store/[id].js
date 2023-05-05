import { StatusCodes } from 'http-status-codes';

import { storeFetch } from '@/server/store/store';

const handler = async (req, res) => {
  const { id } = req.query;
  const storeDetailInfo = {};
  await storeFetch.getStoreDetail(id).then(response => {
    storeDetailInfo.storeInfo = response.data;
  });

  res.status(StatusCodes.OK).json(storeDetailInfo);
};

export default handler;
