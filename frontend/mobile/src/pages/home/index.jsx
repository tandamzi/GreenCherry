/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import Image from 'next/image';
import Link from 'next/link';

import MainCarbon from '../../components/main/MainCarbon';

import Container from '@/components/Container';
import Reservation from '@/components/main/Reservation';
import Spinner from '@/components/Spinner';
import { changePage } from '@/redux/footerStatus/footerReducer';
import clientHttp from '@/utils/csr/clientHttp';

const Home = () => {
  const [loading, setLoading] = useState(true);

  const options = {
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // 애니메이션의 종횡비 유지
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 3초 동안 로딩 스피너 표시

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
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

      // if (Notification.permission !== 'granted') {
      //   Notification.requestPermission().then((permission) => {
      //     if (permission === 'granted') {
      //       new Notification();
      //     } else {
      //       return;
      //     }
      //   });
      // } else {
      //   new Notification();
      // }
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
    });

    if (token) {
      clientHttp.get('/firebase-token', {
        params: {
          token,
        },
      });
    } else console.log('Can not get Token');

    onMessage(messaging, payload => {
      console.log('메시지가 도착했습니다.', payload);
      // ...
    });
  }, []);

  const dispatch = useDispatch();
  const goToPage = page => {
    dispatch(changePage(page));
  };
  return (
    // <div>
    //   <h1 className="text-primaryevent">Welcome to your PWA</h1>
    //   <div>
    //     <button type="button" onClick={subscribeUser}>
    //       Subscribe for push notifications
    //     </button>
    //     <button type="button" onClick={sendNotification}>
    //       Send notification
    //     </button>
    //   </div>
    // </div>

    !loading ? (
      <Container>
        <Container.MainHeader />
        <Container.Body>
          <div className="grid grid-rows-8 ">
            <div className="row-span-3">
              <MainCarbon />
            </div>
            <div className="row-span-2 grid grid-cols-2 justify-items-center">
              <Link href="/order" onClick={goToPage('내 주변 가게')}>
                <div>
                  <Image
                    src="/assets/icons/selectBoxIcons/orderBoxInText.svg"
                    width={280}
                    height={280}
                    alt="greencherry orderBox"
                  />
                </div>
              </Link>
              <Link href="/subscribe">
                <div>
                  <Image
                    src="/assets/icons/selectBoxIcons/subscribeBoxInText.svg"
                    width={280}
                    height={280}
                    alt="greencherry subscribeBox"
                  />
                </div>
              </Link>
            </div>
            <div className="row-span-2">
              <Reservation />
            </div>
          </div>
        </Container.Body>
      </Container>
    ) : (
      <Spinner />
    )
  );
};

export default Home;
