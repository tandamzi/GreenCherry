import clientHttp from '@/utils/clientHttp';

export const getTodayOrderList = async storeId => {
  try {
    const res = await clientHttp.get(`/store/${storeId}/today-orderList`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const putOrderComplete = async orderId => {
  try {
    const res = await clientHttp.put(`/order/${orderId}/order-complete`);
    return res.data;
  } catch (error) {
    return error;
  }
};
