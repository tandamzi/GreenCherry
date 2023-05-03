/* eslint-disable react/button-has-type */
/* eslint-disable no-console */

import Lottie from 'react-lottie-player';

import reservation from '@public/assets/lottie/reservation1.json';
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Container';
import MainCarbon from '@/components/Main/MainCarbon';
import Reservation from '@/components/Main/Reservation';

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
        <div className="grid grid-rows-8 ">
          <div className="row-span-3">
            <MainCarbon />
          </div>
          <div className="row-span-2 grid grid-cols-2 justify-items-center">
            <Link href="/order">
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
  );
}
