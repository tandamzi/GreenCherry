import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import Image from 'next/image';

import Container from '@/components/Container';
import http from '@/server/api/http';
import { storeListFetch } from '@/server/store/storeList';

const order = () => {
  const { kakao } = window;

  const [storeList, setStoreList] = useState([]);

  const [state, setState] = useState({
    myPostion: { lat: 35.126033, lng: 126.8313 },
    center: { lat: 36.5, lng: 127.8 },
    style: {
      width: '100%',
      height: '100vh',
      // position: 'absolute',
      overflow: 'hidden',
    },
    errMsg: null,
  });
  const currentPositionMarkerRef = useRef(null);
  const currentPositionOverlayRef = useRef(null);

  const getStoreInfos = async (id, lat, lng, radius, sub) => {
    const myLat = lat !== undefined ? lat : state.myPostion.lat;
    const myLng = lng !== undefined ? lng : state.myPostion.lng;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/storeList`,
        {
          params: {
            memberId: id || 1,
            lat: myLat,
            lng: myLng,
            radius: radius || 3,
            sub: sub || false,
          },
        },
      );
      // API 호출이 성공하면 response.data에 결과가 포함됩니다.
      const { data } = response.data;
      // console.log('Fetched data:', data);
    } catch (error) {
      // API 호출 중 오류가 발생하면 여기에서 처리합니다.
      console.error('Error fetching data:', error);
    }
  };

  const mapRef = useRef();

  const getCurrentPosition = (
    options = { enableHighAccuracy: false, maximamAge: 0, timeout: 10000 },
  ) => {
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
        myPostion: { lat: coords.latitude, lng: coords.longitude },
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

      // 기존의 마커와 오버레이를 삭제합니다.
      if (currentPositionMarkerRef.current) {
        currentPositionMarkerRef.current.setMap(null);
      }

      if (currentPositionOverlayRef.current) {
        currentPositionOverlayRef.current.setMap(null);
      }

      const marker = new kakao.maps.Marker({
        position: currentPosition,
        image: markerImage,
      });
      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      const content =
        '<div class="customoverlay">' +
        '    <span class="title">내 위치</span>' +
        '</div>';

      // 커스텀 오버레이를 생성합니다
      const customOverlay = new kakao.maps.CustomOverlay({
        map: mapRef.current,
        position: currentPosition,
        content,
        yAnchor: 3,
      });

      marker.setMap(mapRef.current);

      // 새로 생성한 마커와 오버레이를 저장합니다.
      currentPositionMarkerRef.current = marker;
      currentPositionOverlayRef.current = customOverlay;

      mapRef.current.setLevel(3);
      mapRef.current.panTo(currentPosition);
      getStoreInfos();
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

export default order;
