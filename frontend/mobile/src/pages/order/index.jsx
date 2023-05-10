import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import Image from 'next/image';

import Container from '@/components/Container';
import LoadingSpinner from '@/components/LoadingSpinner';
import { localHttp } from '@/server/api/http';

const order = () => {
  const { kakao } = window;

  const [storeList, setStoreList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    coords: {},
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
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/storeList`,
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
      const { data } = response.data;
      // console.log('order INDEX' + response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const mapRef = useRef();

  const getCurrentGeolocaionPosition = (
    options = { enableHighAccuracy: false, maximamAge: 0, timeout: 10000 },
  ) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  const getCurrentPosition = async () => {
    setIsLoading(true);
    try {
      const position = await getCurrentGeolocaionPosition();
      const { coords } = position;

      setState(prev => ({
        ...prev,
        coords,
        myPostion: { lat: coords.latitude, lng: coords.longitude },
      }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      console.error('위치 정보를 가져올 수 없습니다.');
      setIsLoading(false);
    }
  };

  const updateMarkerPosition = async () => {
    await getCurrentPosition();
    const currentPosition = new kakao.maps.LatLng(
      state.coords.latitude,
      state.coords.longitude,
    );

    // 마커의 위치를 업데이트합니다.
    if (currentPositionMarkerRef.current) {
      currentPositionMarkerRef.current.setPosition(currentPosition);
    } else {
      const markerSrc = `/assets/icons/mapIcons/myLocationMarker2.svg`;
      const markerSize = new kakao.maps.Size(32, 32);
      const markerOpt = { offset: new kakao.maps.Point(32, 32) };

      const markerImage = new kakao.maps.MarkerImage(
        markerSrc,
        markerSize,
        markerOpt,
      );

      const marker = new kakao.maps.Marker({
        position: currentPosition,
        image: markerImage,
      });

      currentPositionMarkerRef.current = marker;
      marker.setMap(mapRef.current);
    }

    // 오버레이의 위치를 업데이트합니다.
    if (currentPositionOverlayRef.current) {
      currentPositionOverlayRef.current.setPosition(currentPosition);
    } else {
      const content =
        '<div class="customoverlay">' +
        '    <span class="title">내 위치</span>' +
        '</div>';

      const customOverlay = new kakao.maps.CustomOverlay({
        map: mapRef.current,
        position: currentPosition,
        content,
        yAnchor: 2,
      });

      currentPositionOverlayRef.current = customOverlay;
      customOverlay.setMap(mapRef.current);
    }

    mapRef.current.panTo(currentPosition);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.497965, 127.027636),
      level: 3,
    };
    mapRef.current = new kakao.maps.Map(container, options);
    mapRef.current.setMinLevel(1);
    mapRef.current.setMaxLevel(6);

    getCurrentPosition();
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
          onClick={updateMarkerPosition}
        >
          <div className="flex">
            <span className="text-sm font-bold text-secondaryfont">
              내 위치
            </span>
            <Image
              alt="내 위치"
              src="/assets/icons/mapIcons/myLocationMarker.svg"
              width={20}
              height={20}
            />
          </div>
        </button>
      </div>
      <div style={{ zIndex: 10 }}>
        <Container.MainFooterWithNavigation />
      </div>
    </Container>
  );
};

export default order;
