import clientHttp from '@/utils/clientHttp';

export const getMember = async () => {
  try {
    const res = await clientHttp.get('/member');
    return res.data;
  } catch (error) {
    return error;
  }
};
