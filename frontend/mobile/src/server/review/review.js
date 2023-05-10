// eslint-disable-next-line import/no-named-as-default
import http from '../api/http';

const getStoreReview = async (id, size) => {
  // console.log(id, size)
  return http.get(`/review?store-id=${id}&size=${size}`).then(res => res.data);
};

const getStoreTag = async id => {
  return http.get(`/review/tag/stats?store-id=${id}`).then(res => res.data);
};

export const reviewFetch = {
  getStoreReview,
  getStoreTag,
};
