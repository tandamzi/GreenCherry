import http from '../api/http';

const getStoreList = async (id, myLat, myLng, radius, sub) => {
  // console.log('BE server/store/storeList.js ');
  const res = await http.get(`/store`, {
    params: {
      memberId: id || 1,
      lat: myLat,
      lng: myLng,
      radius: radius || 3,
      sub: sub || false,
    },
  });
  return res.data;
};
export const storeListFetch = {
  getStoreList,
};
