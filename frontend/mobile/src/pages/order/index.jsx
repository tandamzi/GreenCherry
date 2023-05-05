import React from 'react';

import MapContainer from './MapContainer';

const order = () => {
  const infos = {
    a: {
      title: 'a',
      lat: '37.12',
      lng: '128.1',
    },
    b: { title: 'a', lat: '37.12', lng: '128.1' },
  };
  return (
    <div>
      <MapContainer infos={infos} />
    </div>
  );
};

export default order;
