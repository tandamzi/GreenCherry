import { StatusCodes } from 'http-status-codes';

import { reviewFetch } from '@/server/review/review';
import { storeFetch } from '@/server/store/store';
import createHttpInstance from '@/utils/backendhttp';

const handler = async (req, res) => {
  const { id } = req.query;
  const size = 10;
  const storeDetailInfo = {};
  const http = createHttpInstance(req);

  await http.get(`/store/info?store-id=${id}`).then(response => {
    storeDetailInfo.storeInfo = response.data.data;
  });

  await http.get(`/review?store-id=${id}&size=${size}`).then(response => {
    storeDetailInfo.review = response.data.data;
  });

  await http.get(`/review/tag/stats?store-id=${id}`).then(response => {
    storeDetailInfo.tag = response.data.data;
  });
  res.status(StatusCodes.OK).json(storeDetailInfo);
};

export default handler;
