// eslint-disable-next-line import/no-named-as-default
import http from '../api/http';

const getStoreDetail = async id => {
  // console.log(id)
  return http.get(`/store/${id}`).then(res => res.data);
};

export const storeFetch = {
  getStoreDetail,
};
