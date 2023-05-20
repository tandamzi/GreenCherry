import clientHttp from '@/utils/clientHttp';

export const getStoreOpen = async storeId => {
  try {
    const res = await clientHttp.get(`/store/${storeId}/open`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getStore = async memberId => {
  try {
    const data = await clientHttp.get(`/store/info?member-id=${memberId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllergy = async () => {
  try {
    const res = await clientHttp.get('/store/allergy');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getStoreType = async () => {
  try {
    const res = await clientHttp.get('/store/type');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getCherryPoint = async storeId => {
  try {
    const res = await clientHttp.get(`/store/${storeId}/cherry-point`);
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const putCherryBox = async (storeId, cherryBoxInfo) => {
  try {
    const res = await clientHttp.put(
      `/store/${storeId}/cherrybox`,
      cherryBoxInfo,
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const putCloseStore = async storeId => {
  try {
    const res = await clientHttp.put(`/store/${storeId}/close-store`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getCherryQuantity = async memberId => {
  try {
    const res = await clientHttp.get(
      `/store/cherry-quantity?memberId=${memberId}`,
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getTotalIncome = async (storeId, orderDate) => {
  try {
    const res = await clientHttp.put(
      `/store/${storeId}/total-income?orderDate=${orderDate}`,
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getOrderList = async (storeId, orderDate) => {
  try {
    const res = await clientHttp.get(
      `/store/${storeId}/orders?orderDate=${orderDate}`,
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getModifiable = async storeId => {
  try {
    const res = await clientHttp.get(`/store/${storeId}/modifiable`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const putModifyStore = async (storeId, storeInfo, images) => {
  try {
    const formData = new FormData();

    Object.keys(storeInfo).forEach(key => {
      if (storeInfo[key] !== undefined) {
        formData.append(key, storeInfo[key]);
      }
    });

    if (images) {
      images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });
    }

    const res = await clientHttp.put(
      `/store/${storeId}/modify-store`,
      formData,
    );

    return res.data;
  } catch (error) {
    return error;
  }
};
