/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import SubscribeStore from '@/components/SubscribeStore';
import clientHttp from '@/utils/csr/clientHttp';

const subscribe = () => {
  const router = useRouter();
  const [subscribeInfo, setSubscribeInfo] = useState();

  const getSubscribeInfo = async () => {
    try {
      const response = await clientHttp.get('/subscribe/11');
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
              <div>
                <SubscribeStore
                  key={subscribeStoreInfo.id}
                  subscribeStoreInfo={subscribeStoreInfo}
                />
                <div className="border-line border-b my-4 -mx-4" />
              </div>
            );
          })}
      </Container.MainBody>
    </Container>
  );
};

export default PrivateRouter(subscribe);
