import { StatusCodes } from 'http-status-codes';
import Swal from 'sweetalert2';

import createHttpInstance from '@/utils/csr/backendhttp';

const handler = async (req, res) => {
  const http = createHttpInstance(req);
  const { storeId, memberId, orderQuantity } = req.query;

  try {
    const response = await http.post(`order`, {
      storeId,
      memberId,
      orderQuantity,
    });

    res.status(StatusCodes.OK).json(response.data);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error.response.data);
  }
};

export default handler;
