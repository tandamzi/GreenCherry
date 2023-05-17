import clientHttp from '@/utils/clientHttp';

export const getPagableReviewList = async (storeId, page) => {
  try {
    const res = await clientHttp.get(
      `/store/${storeId}/pagable-reviews?page=${page}`,
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getReviewCount = async storeId => {
  try {
    const res = await clientHttp.get(`/store/${storeId}/review-count`);
    return res.data;
  } catch (error) {
    return error;
  }
};
