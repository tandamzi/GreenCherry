import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'react-lottie-player';
import { useDispatch } from 'react-redux';

import refresh from '@public/assets/lottie/refresh.json';
import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import style from './map.module.scss';

import { Button } from '@/components/Button';
import Container from '@/components/Container';
import LoadingSpinner from '@/components/LoadingSpinner';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import { saveStoreList } from '@/redux/storeList/storeListReducer';
import clientHttp from '@/utils/csr/clientHttp';

const CHERRY_BOX_MARKER_URL = `/assets/icons/mapIcons/cherryBoxMarker.svg`;
const MY_LOCAITON_MARKER_URL = '/assets/icons/mapIcons/myLocationMarker2.svg';
const MY_LOCATION_ICON_URL = '/assets/icons/mapIcons/myLocationMarker.svg';

const map = () => {
  const { kakao } = window;

  const router = useRouter();
  const dispatch = useDispatch();

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
        const markerSize = new kakao.maps.Size(40, 40);
        const markerOpt = { offset: new kakao.maps.Point(20, 20) };

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
      return { lat: coords.latitude, lng: coords.longitude };
    } catch (error) {
      console.error(error);
      console.error('위치 정보를 가져올 수 없습니다.');
      return null;
    }
  };

  const [selectedStore, setSelectedStore] = useState({
    id: -1,
    name: '존재 하지 않는 가게입니다.',
    address: {},
    images: [],
  });

  const storeMarkersRef = useRef([]); // 새로운 상태 변수를 추가합니다.

  const bottomSheetRef = useRef(false);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(prev => !prev);
  };

  const updateStoreMarkersUpdate = (content, center) => {
    // 기존의 모든 마커를 지웁니다.
    storeMarkersRef.current.forEach(marker => marker.setMap(null));
    storeMarkersRef.current = [];

    const centerPosition = new kakao.maps.LatLng(center.lat, center.lng);
    // 각 상점에 대한 마커를 생성합니다.
    content.forEach(store => {
      const markerSrc = CHERRY_BOX_MARKER_URL;
      const markerSize = new kakao.maps.Size(40, 40);
      const markerOpt = { offset: new kakao.maps.Point(20, 20) };

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
      kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedStore(store);
        setShow(prev => !prev);
      });
      // 마커를 지도에 추가합니다.
      marker.setMap(mapRef.current);
      mapRef.current.panTo(centerPosition);

      // 참조에 마커를 추가합니다.
      storeMarkersRef.current.push(marker);
    });
  };
  const getStoreInfos = async center => {
    const memberId = 1;
    const myLat = center.lat;
    const myLng = center.lng;
    const radius = 3;
    const sub = false;

    try {
      const response = await clientHttp.get('/storeList', {
        params: {
          memberId,
          lat: myLat,
          lng: myLng,
          radius,
          sub,
        },
      });
      const { content } = response.data.data;

      dispatch(saveStoreList(content));
      updateStoreMarkersUpdate(content, center);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const goToStore = id => {
    router.push(`/store/${id}`);
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

    (async () => {
      const position = await getCurrentPosition();
      if (position) {
        getStoreInfos(position);
      }
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        bottomSheetRef.current &&
        !bottomSheetRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [bottomSheetRef]);

  const options = {
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // 애니메이션의 종횡비 유지
    },
  };
  return (
    <Container>
      {show && (
        <div
          onClick={showModal} // Overlay 클릭 시 모달 닫힘
          style={{
            position: 'fixed', // 화면 전체를 차지하도록
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경색을 약간 투명하게
            zIndex: 11, // 다른 요소보다 앞에 보이도록
          }}
        />
      )}
      <div id="myMap" ref={mapRef} style={state.style}>
        {isMapMoving && (
          <button
            type="button"
            className="absolute p-3 left-0 right-0 top-28 mx-auto w-1/2 h-16 rounded-full bg-primaryevent opacity-90 cursor-pointer"
            style={{
              zIndex: 10,
            }}
            onClick={() => getStoreInfos(state.center)}
          >
            <div className="flex justify-center ">
              <Lottie
                className="mr-1"
                style={{
                  width: 24,
                  height: 24,
                  marginTop: 2.5,
                  marginLeft: -1,
                }}
                loop
                animationData={refresh}
                play
                option={options}
                speed={0.7}
              />
              <span className="font-black text-lg text-bgcolor">
                현 지도에서 검색
              </span>
            </div>
          </button>
        )}

        <div
          className={cn(
            'z-20 px-4 py-6',
            style.BottomSheet,
            style[`${show ? 'show' : ''}`],
          )}
          ref={bottomSheetRef}
        >
          <div className="">
            <div className="flex flex-col items-center">
              <div className="relative h-44 w-44 ">
                <Image
                  src={selectedStore.images[0]}
                  alt={selectedStore.name}
                  fill
                />
              </div>
              <div className="font-bold text-xl">{selectedStore.name}</div>
              <div className="text-sm">{selectedStore.address.addressName}</div>
            </div>

            <Button
              color="primary"
              fill
              label="주문 하러 가기"
              onClick={() => goToStore(selectedStore.id)}
              className="text-2xl mt-4"
            />
          </div>
        </div>
        <button
          type="button"
          className="absolute flex right-4 bottom-32 rounded-3xl pr-3 pl-5 py-2 bg-bgcolor opacity-90 cursor-pointer"
          style={{
            zIndex: 10,
          }}
          onClick={getCurrentPosition}
        >
          <div className="flex">
            <span className="pt-1 text-sm font-bold text-secondaryfont">
              내 위치
            </span>
            <Image
              alt="내 위치"
              src={MY_LOCATION_ICON_URL}
              width={20}
              height={20}
            />
          </div>
        </button>
      </div>
      <div style={{ zIndex: 50 }}>
        <Container.MainFooterWithNavigation position="fixed" />
      </div>
    </Container>
  );
};

export default map;
