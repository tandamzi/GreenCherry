import http from '../api/http';

const getStoreList = async (memberId, lat, lng, radius, sub) => {
  // console.log('BE : ' + memberId);
  const res = await http.get(
    `/store?memberId=${memberId}&lat=${lat}&lng=${lng}&radius=${radius}&sub=${sub}`,
  );
  return res.data;
};
export const storeListFetch = {
  getStoreList,
};
