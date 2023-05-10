import clientHttp from '@/utils/clientHttp';

export const getStore = async () => {
  try {
    const data = await clientHttp.get('/store/info');
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
