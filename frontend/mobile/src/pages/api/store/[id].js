import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/http';

const handler = async (req, res) => {
  const { id } = req.query;
  const size = 10;
  const storeDetailInfo = {};
  const http = createHttpInstance(req);

  await http.get(`/store/${id}`).then(response => {
    storeDetailInfo.storeInfo = response.data;
  });

  await http.get(`/review?store-id=${id}&size=${size}`).then(response => {
    storeDetailInfo.review = response.data;
  });

  await http.get(`/review/tag/stats?store-id=${id}`).then(response => {
    storeDetailInfo.tag = response.data;
  });
  res.status(StatusCodes.OK).json(storeDetailInfo);
};

export default handler;
