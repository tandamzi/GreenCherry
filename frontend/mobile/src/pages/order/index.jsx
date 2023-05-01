import React, { useEffect } from 'react';

import cs from 'classnames';

const order = () => {
  useEffect(() => {
    const KAKAO_MAP_API = process.env.NEXT_PUB;
    const mapScript = document.createElement('script');
    mapScript.async = true;

    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        const map = window.kakao.maps.Map(mapContainer, mapOption);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);
  return <div id="map" className={cs('w-100 h-100')} />;
};

export default order;
