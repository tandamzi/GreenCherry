import React, { useEffect, useRef, useState } from 'react';

const Map = () => {
  const mapContainer = useRef(null);
  const { kakao } = window;

  const [state, setState] = useState({
    myLocation: { lat: 36.5, lng: 127.8 },
    center: { lat: 36.5, lng: 127.8 },
    style: {
      width: '100%',
      height: '100vh',
      position: 'absolute',
      overflow: 'hidden',
    },
    errMsg: null,
    isPanto: false,
    isLoading: true,
  });

  const mapOptions = {
    center: state.center,
    level: 4,
  };

  useEffect(() => {
    const map = new kakao.maps.Map(mapContainer.current, mapOptions);
  });
  return <div id="map" ref={mapContainer} style={state.style} />;
};
export default Map;
