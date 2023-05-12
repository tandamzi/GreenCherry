import getCurrDate from '@/utils/getCurrentDate';
import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  const { storeId } = req.query;
  try {
    const http = createHttpInstance(req);
    // 남은 체리박스 개수 조회 + 가게 체리포인트 조회
    const storeInfoResponse = await http.get(`/store/info?store-id=${storeId}`);
    // const orderResponse = await http.get(
    //   `/order?store-id=${storeId}&order-date=${getCurrDate()}`,
    // );
    const response = {
      cherryBoxQuantity: storeInfoResponse.data.data.cherryBox.quantity,
      cherryPoint: storeInfoResponse.data.data.cherryPoint,
    };
    // console.log(orderResponse.data);
    /*     const response = {
      cherryBoxQuantity: storeInfoResponse.data.cherryBox.quantity,
      cherryPoint: storeInfoResponse.data.cherryPoint,
      orderList: orderResponse.data.content,
    }; */
    // 해당 날짜 주문 목록 가져오기
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
