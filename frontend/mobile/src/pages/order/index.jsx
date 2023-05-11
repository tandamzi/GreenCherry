import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'react-lottie-player';

import refresh from '@public/assets/lottie/refresh.json';
import Image from 'next/image';

import Container from '@/components/Container';
import LoadingSpinner from '@/components/LoadingSpinner';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import clientHttp from '@/utils/csr/clientHttp';

const CHERRY_BOX_MARKER_URL = `/assets/icons/mapIcons/cherryBoxMarker.svg`;
const MY_LOCAITON_MARKER_URL = '/assets/icons/mapIcons/myLocationMarker2.svg';
const MY_LOCATION_URL = '/assets/icons/mapIcons/myLocationMarker.svg';

const order = () => {
  const { kakao } = window;

  const [storeList, setStoreList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isMapMoving, setIsMapMoving] = useState(true);

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

  const mapRef = useRef();

  const getCurrentGeolocaionPosition = (
    options = { enableHighAccuracy: false, maximamAge: 0, timeout: 10000 },
  ) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  const currentPositionMarkerRef = useRef(null);
  const getCurrentPosition = async () => {
    try {
      const position = await getCurrentGeolocaionPosition();
      const { coords } = position;

      setState(prev => ({
        ...prev,
        coords,
        myPostion: { lat: coords.latitude, lng: coords.longitude },
        center: { lat: coords.latitude, lng: coords.longitude },
      }));

      const currentPosition = new kakao.maps.LatLng(
        coords.latitude,
        coords.longitude,
      );

      // 마커의 위치를 업데이트합니다.
      if (currentPositionMarkerRef.current) {
        currentPositionMarkerRef.current.setPosition(currentPosition);
      } else {
        const markerSrc = MY_LOCAITON_MARKER_URL;
        const markerSize = new kakao.maps.Size(36, 36);
        const markerOpt = { offset: new kakao.maps.Point(36, 36) };

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
      mapRef.current.panTo(currentPosition);
    } catch (error) {
      console.error(error);
      console.error('위치 정보를 가져올 수 없습니다.');
    }
  };

  const storeMarkersRef = useRef([]); // 새로운 상태 변수를 추가합니다.
  const [storeMakkersLoading, setStoreMarkersLoading] = useState(false);

  const updateStoreMarkersUpdate = content => {
    // console.log(content);
    // 기존의 모든 마커를 지웁니다.
    storeMarkersRef.current.forEach(marker => marker.setMap(null));
    storeMarkersRef.current = [];

    const centerPosition = new kakao.maps.LatLng(
      state.center.lat,
      state.center.lng,
    );
    // 각 상점에 대한 마커를 생성합니다.
    content.forEach(store => {
      // console.log(store);
      const markerSrc = CHERRY_BOX_MARKER_URL;
      const markerSize = new kakao.maps.Size(32, 32);
      const markerOpt = { offset: new kakao.maps.Point(32, 32) };

      const markerImage = new kakao.maps.MarkerImage(
        markerSrc,
        markerSize,
        markerOpt,
      );

      const markerPosition = new kakao.maps.LatLng(
        store.address.lat,
        store.address.lng,
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      // 마커를 지도에 추가합니다.
      marker.setMap(mapRef.current);
      mapRef.current.panTo(centerPosition);

      // 참조에 마커를 추가합니다.
      storeMarkersRef.current.push(marker);
    });
  };
  const getStoreInfos = async req => {
    const memberId = 1;
    const myLat = state.center.lat;
    const myLng = state.center.lng;
    const radius = 1;
    const sub = false;

    try {
      const response = await clientHttp.get('/api/storeList', {
        params: {
          memberId,
          lat: myLat,
          lng: myLng,
          radius,
          sub,
        },
      });
      const { content } = response.data.data;
      setStoreList(content);
      updateStoreMarkersUpdate(content);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    mapRef.current.setMinLevel(1);
    mapRef.current.setMaxLevel(6);

    kakao.maps.event.addListener(mapRef.current, 'dragstart', function () {
      setIsMapMoving(false);
    });

    kakao.maps.event.addListener(mapRef.current, 'dragend', function () {
      const { Ma, La } = mapRef.current.getCenter();

      setState(prev => ({
        ...prev,
        center: { lat: Ma, lng: La },
      }));
      setIsMapMoving(true);
    });

    getCurrentPosition();
  }, []);

  const options = {
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // 애니메이션의 종횡비 유지
    },
  };
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
          onClick={getCurrentPosition}
        >
          <div className="flex">
            <span className="text-sm font-bold text-secondaryfont">
              내 위치
            </span>
            <Image alt="내 위치" src={MY_LOCATION_URL} width={20} height={20} />
          </div>
        </button>

        {isMapMoving && (
          <button
            type="button"
            className="absolute p-3 left-0 right-0 top-20 mx-auto w-1/2 h-16 rounded-full bg-primaryevent font-black text-base text-bgcolor cursor-pointer"
            style={{
              zIndex: 10,
            }}
            onClick={getStoreInfos}
          >
            <div className="flex justify-center">
              <Lottie
                className="mr-1"
                style={{ width: 24, height: 24 }}
                loop
                animationData={refresh}
                play
                option={options}
                speed={0.7}
              />
              <div>현 지도에서 검색</div>
            </div>
          </button>
        )}
      </div>

      <div style={{ zIndex: 10 }}>
        <Container.MainFooterWithNavigation />
      </div>
    </Container>
  );
};

export default PrivateRouter(order);
