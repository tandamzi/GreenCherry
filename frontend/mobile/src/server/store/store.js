import http from '../api/http';

const getStoreDetail = async id => {
  return http.get(`/store/${id}`).then(res => res.data);
};

export const storeFetch = {
  getStoreDetail,
};
