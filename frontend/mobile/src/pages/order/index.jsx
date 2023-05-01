import React, { useEffect } from 'react';

import cs from 'classnames';

import Container from '@/components/Container';

const order = () => {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;

    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
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
  return (
    <Container>
      <Container.MainBody>
        <div
          id="map"
          // className="w-full h-full"  %로 하면 안뜬다 => 동적으로 처리해야해~~
          style={{ width: '1000px', height: '1000px' }}
        />
      </Container.MainBody>
    </Container>
  );
};

export default order;
