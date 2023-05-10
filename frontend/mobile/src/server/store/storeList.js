import http from '../api/http';

const getStoreList = async (id, myLat, myLng, radius, sub) => {
  // console.log('\n BE server/store/storeList.js ');
  const res = await http.get(`/store`, {
    params: {
      memberId: id || 1,
      lat: myLat,
      lng: myLng,
      radius: radius || 3,
      sub: sub || false,
    },
  });
  // console.log('\n Server res data : ' + res.data.data.content);

  return res.data;
};
export const storeListFetch = {
  getStoreList,
};
