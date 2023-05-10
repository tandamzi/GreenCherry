import clientHttp from '@/utils/clientHttp';

export const getMember = async () => {
  try {
    const data = await clientHttp.get('/member');
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
