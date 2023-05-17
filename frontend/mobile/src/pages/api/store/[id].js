import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/ssr/backendhttp';

const handler = async (req, res) => {
  const { id } = req.query;
  const size = 10;
  const storeDetailInfo = {};
  const http = createHttpInstance(req);
  try {
    await http.get(`/store/info?store-id=${id}`).then(response => {
      storeDetailInfo.storeInfo = response.data.data;
    });
  } catch (error) {
    console.error('Error while fetching storeDetailInfo:', error);
  }

  try {
    await http
      .get(`/review?store-id=${id}&size=${size}&sort=createDate,desc`)
      .then(response => {
        storeDetailInfo.review = response.data.data;
      });
  } catch (error) {
    console.error('Error while storeDetailInfo review:', error);
  }

  try {
    await http.get(`/review/tag/stats?store-id=${id}`).then(response => {
      storeDetailInfo.tag = response.data.data;
    });
    res.status(StatusCodes.OK).json(storeDetailInfo);
  } catch (error) {
    console.error('Error while storeDetailInfo tag:', error);
  }
};

export default handler;
