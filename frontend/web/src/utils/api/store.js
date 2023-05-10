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
