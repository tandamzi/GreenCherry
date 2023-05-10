/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Image from 'next/image';
import Link from 'next/link';

import MainCarbon from '../components/main/MainCarbon';

import Container from '@/components/Container';
import Reservation from '@/components/main/Reservation';
import Spinner from '@/components/Spinner';
import { changePage } from '@/redux/footerStatus/footerReducer';

const sendNotification = async () => {
  try {
    console.log('test');
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('index');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error notification:', error);
  }
};

const subscribeUser = async () => {
  navigator.serviceWorker.ready.then(registration => {
    registration.pushManager.getSubscription().then(subscription => {
      if (subscription) {
        console.log('Already sssubscribed');
      } else {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          })
          .then(data => {
            // save subscription on DB
            fetch('/api/subscribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
          });
      }
    });
  });
};

export default function Home() {
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
}
