import clientHttp from '@/utils/clientHttp';

export const getStore = async memberId => {
  try {
    const data = await clientHttp.get(`/store/info?member-id=${memberId}`);
    // console.log(data);
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
