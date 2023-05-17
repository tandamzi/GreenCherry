import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/ssr/backendhttp';

const handler = async (req, res) => {
  const http = createHttpInstance(req);

  // await http.get(`/review/tag/stats?store-id=${id}`).then(response => {
  //   storeDetailInfo.tag = response.data.data;
  // });
  // res.status(StatusCodes.OK).json(storeDetailInfo);
};

export default handler;
