import React, { useEffect, useState } from 'react';

import Container from '@/components/Container';
import AfterOpen from '@/components/Main/AfterOpen';
import BeforeOpen from '@/components/Main/BeforeOpen';
import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';
import { getCherryPoint } from '@/utils/api/store';

import clientHttp from '@/utils/clientHttp';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const Business = () => {
  const { storeAttributes, setCherryPoint } = useStore();
  const { memberAttributes } = useMember();

  useEffect(() => {
    getCherryPoint(memberAttributes.storeId)
      .then(data => setCherryPoint(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    console.log('hello');
    const firebaseConfig = {
      apiKey: 'AIzaSyD4LajuG61T7Q5VL5-JGODdt19zM2Yej_4',
      authDomain: 'greencherry-notice.firebaseapp.com',
      projectId: 'greencherry-notice',
      storageBucket: 'greencherry-notice.appspot.com',
      messagingSenderId: '280305112250',
      appId: '1:280305112250:web:ff845972d09a4772a45e83',
      measurementId: 'G-WE2RP9HYFD',
    };

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    if (Notification.permission !== 'granted') {
      // Chrome - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return!
      try {
        Notification.requestPermission().then(permission => {
          // eslint-disable-next-line no-useless-return
          if (permission !== 'granted') return;
        });
      } catch (error) {
        // Safari - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return!
        if (error instanceof TypeError) {
          Notification.requestPermission().then(permission => {
            // eslint-disable-next-line no-useless-return
            if (permission !== 'granted') return;
          });
        } else {
          console.error(error);
        }
      }
    }

    console.log('권한 요청 중...');

    const permission = Notification.requestPermission();
    if (permission === 'denied') {
      console.log('알림 권한 허용 안됨');
      return;
    }

    console.log('알림 권한이 허용됨');

    const token = getToken(messaging, {
      vapidKey:
        'BBuoQiK6Hci6-fWBqgcIAn-a8Nzc7kF1XVpkCKfHINcvckb-u3sz8eSrsbtns2WjrXZ9bxs7j0DCsNtkNIiqjHc',
    }).then(res => {
      clientHttp.get('/firebase-token', {
        params: {
          token: res,
        },
      });
    });
  }, []);

  return (
    <Container>
      <Container.BusinessHeader />
      <Container.MainBody className="bg-bgcolor h-full">
        {storeAttributes.open ? <AfterOpen /> : <BeforeOpen />}
      </Container.MainBody>
    </Container>
  );
};

export default Business;
