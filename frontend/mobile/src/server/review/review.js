import http from '../api/http';

const getStoreReview = async (id, size) => {
  return http.get(`/review?store-id=${id}&size=${size}`).then(res => res.data);
};

export const reviewFetch = {
  getStoreReview,
};
