import React, { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const order = () => {
  const [myLocation, setMyLocation] = useState({ lat: 36.5, lng: 127.8 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setMyLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        err => {
          // console.log(err);
          // alert('현재위치 표시할 수 없어요' + err);
        },
        // { enableHighAccuracy: true },
      );
    } else {
      alert('현재 위치를 표시할 수 없어요');
    }
  }, []);

  return (
    <Map
      // 지도의 중심좌표
      center={myLocation}
      // 지도의 크기
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
      }}
      // 줌 레벨
      level={3}
    />
  );
};

export default order;
