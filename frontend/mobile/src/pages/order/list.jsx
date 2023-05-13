import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Container from '@/components/Container';

const list = () => {
  const storeList = useSelector(state => state.storeList.storeList);

  useEffect(() => {
    // console.log(storeList);
  }, storeList);

  return (
    <Container>
      <Container.Header />
      <Container.MainBody>
        {storeList &&
          storeList.map(item => {
            return <div key={item.id}>{item.name}</div>;
          })}
      </Container.MainBody>
    </Container>
  );
};

export default list;
