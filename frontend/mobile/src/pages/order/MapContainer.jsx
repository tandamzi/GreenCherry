import React, { useEffect, useState, useRef } from 'react';

import Image from 'next/image';

import Container from '@/components/Container';

const MapContainer = ({ infos }) => {
  const { kakao } = window;
  const [state, setState] = useState({
    myPostion: { lat: 36.5, lng: 127.8 },
    center: { lat: 36.5, lng: 127.8 },
    style: {
      width: '100%',
      height: '100vh',
      // position: 'absolute',
      overflow: 'hidden',
    },
    errMsg: null,
  });

  const mapRef = useRef();

  const getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  const showCurrentLocation = async () => {
    if (!mapRef.current) {
      return;
    }

    try {
      const position = await getCurrentPosition();
      const { coords } = position;

      setState(prev => ({
        ...prev,
        myPostion: coords,
      }));

      const currentPosition = new kakao.maps.LatLng(
        coords.latitude,
        coords.longitude,
      );

      const markerSrc = `/assets/icons/mapIcons/myLocationMarker2.svg`;
      const markerSize = new kakao.maps.Size(32, 32);
      const markerOpt = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      const markerImage = new kakao.maps.MarkerImage(
        markerSrc,
        markerSize,
        markerOpt,
      );

      const marker = new kakao.maps.Marker({
        position: currentPosition,
        image: markerImage,
      });

      marker.setMap(mapRef.current);
      mapRef.current.setLevel(3);
      mapRef.current.panTo(currentPosition);
    } catch (error) {
      console.error(error);
      console.error('위치 정보를 가져올 수 없습니다.');
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.497965, 127.027636),
      level: 3,
    };

    mapRef.current = new kakao.maps.Map(container, options);
  }, []);

  return (
    <Container>
      <div id="myMap" ref={mapRef} style={state.style}>
        <button
          type="button"
          className="absolute flex top-3 left-3 rounded-3xl px-3 py-2 cursor-pointer"
          style={{
            background: '#fafaf9e4',
            zIndex: 10,
          }}
          onClick={showCurrentLocation}
        >
          <span className="text-sm font-bold text-secondaryfont">
            내 위치로
          </span>
          <Image
            alt="내 위치"
            src="/assets/icons/mapIcons/myLocationMarker.svg"
            width={20}
            height={20}
          />
        </button>
      </div>
      <div style={{ zIndex: 10 }}>
        <Container.MainFooterWithNavigation />
      </div>
    </Container>
  );
};

export default MapContainer;
