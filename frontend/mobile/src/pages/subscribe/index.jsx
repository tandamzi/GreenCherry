/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import SubscribeStore from '@/components/SubscribeStore';
import clientHttp from '@/utils/csr/clientHttp';

const subscribe = () => {
  const router = useRouter();
  const [subscribeInfo, setSubscribeInfo] = useState();

  const getSubscribeInfo = async () => {
    try {
      const response = await clientHttp.get('/api/subscribe/11');
      setSubscribeInfo(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getSubscribeInfo();
  }, []);

  return (
    <Container>
      <Container.SubPageHeader goHome title="구독내역" />
      <Container.MainBody>
        {subscribeInfo &&
          subscribeInfo.content.map(subscribeStoreInfo => {
            return (
              <SubscribeStore
                key={subscribeStoreInfo.id}
                subscribeStoreInfo={subscribeStoreInfo}
              />
            );
          })}
      </Container.MainBody>
    </Container>
  );
};

export default subscribe;
