/* eslint-disable no-console */

import Lottie from 'react-lottie-player';

import reservation from '@public/assets/lottie/reservation1.json';
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Container';
import MainCarbon from '@/components/main/MainCarbon';
import Reservation from '@/components/main/Reservation';

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
        console.log('Already subscribed');
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
    <Container>
      <Container.MainHeader />
      <Container.Body>
        <Lottie
          className="absolute top-80 ml-10 mt-4"
          loop
          animationData={reservation}
          play
          style={{ width: 230, height: 250 }}
          speed={1}
        />
        <div className="grid grid-rows-8 ">
          <div className="row-span-3">
            <MainCarbon />
          </div>
          <div className="row-span-2 grid grid-cols-2 justify-items-center">
            <Link href="/order">
              <div className="relative">
                <Image
                  src="/assets/icons/selectBoxIcons/orderBox.svg"
                  width={180}
                  height={180}
                  alt="greencherry orderBox"
                />
                <p className="absolute top-6 left-6 font-bold">주문</p>
                <p className="absolute top-12 left-6 text-xs">
                  주변 체리박스를
                </p>
                <p className="absolute top-16 left-6 text-xs">주문해보세요</p>
              </div>
            </Link>
            <div className="relative">
              <Image
                src="/assets/icons/selectBoxIcons/subscribeBox.svg"
                width={180}
                height={180}
                alt="greencherry subscribeBox"
              />
              <p className="absolute top-6 left-6 font-bold">구독</p>
              <p className="absolute top-12 left-6 text-xs">구독한 가게를</p>
              <p className="absolute top-16 left-6 text-xs">볼 수 있어요</p>
            </div>
          </div>
          <div className="row-span-2">
            <Reservation />
          </div>
        </div>
      </Container.Body>
    </Container>
  );
}
