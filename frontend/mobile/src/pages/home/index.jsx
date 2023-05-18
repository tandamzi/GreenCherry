/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import Image from 'next/image';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';

import MainCarbon from '../../components/main/MainCarbon';

import Container from '@/components/Container';
import LoadingSpinner from '@/components/LoadingSpinner';
import Reservation from '@/components/main/Reservation';
import ShortComponent from '@/components/ShortComponent';
import Spinner from '@/components/Spinner';
import { changePage } from '@/redux/footerStatus/footerReducer';
import clientHttp from '@/utils/csr/clientHttp';
import createBFFInstance from '@/utils/ssr/bffHttp';

const SHORTS_ICON_URL = '/assets/icons/buttonIcons/shortsButton.svg';

const Home = ({ shortsProps, cherryPorintProps }) => {
  const [loading, setLoading] = useState(true);
  const [shortsPropsLoading, setShortsPropsLoading] = useState(true);

  const router = useRouter();

  const member = useSelector(state => state.member.memberInfo);

  const [reservationList, setReservationList] = useState([]);

  const getReservationList = async id => {
    try {
      const response = await clientHttp.get(`/reservation/${id}`);
      setReservationList(response.data.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 3초 동안 로딩 스피너 표시

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shortsProps) {
      setShortsPropsLoading(false);
    }
  }, [shortsProps]);

  useEffect(() => {
    if (member.id) {
      getReservationList(member.id);
    }
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
    }

    console.error('권한 요청 중...');

    const permission = Notification.requestPermission();
    if (permission === 'denied') {
      console.error('알림 권한 허용 안됨');
      return;
    }

    console.error('알림 권한이 허용됨');

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
    onMessage(messaging, payload => {
      console.error('메시지가 도착했습니다.', payload);
    });
  }, []);

  const dispatch = useDispatch();
  const goToPage = page => {
    dispatch(changePage(page));
  };

  const goToMoreShorts = () => {
    router.push('/');
  };
  return !loading ? (
    <Container className="overflow-y-scroll scrollbar-hide">
      <Container.MainHeaderWithModal />
      <Container.Body>
        <div className="grid grid-rows-8 ">
          <div className="row-span-3">
            <MainCarbon cherryPoint={cherryPorintProps} />
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
            <Link href="/order-list">
              <Reservation reservationList={reservationList} />
            </Link>
          </div>
          <div className="flex justify-between">
            <div className="relative w-20 h-10 mt-1">
              <Image src={SHORTS_ICON_URL} fill alt="shorts" />
            </div>
            <button
              className="flex items-center mt-3 mr-4"
              type="button"
              onClick={() => goToMoreShorts()}
            >
              <FiMoreHorizontal width={20} height={10} />
            </button>
          </div>
          <div className="h-60">
            {!shortsPropsLoading ? (
              <div className="relative">
                <ShortComponent
                  shortInfo={shortsProps}
                  width={120}
                  height={220}
                />
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
        <div className="mt-10 pb-4 text-center">
          <span className="font-bold text-secondary">Green </span>
          <span className="font-bold text-primary">Cherry</span>
        </div>
      </Container.Body>
    </Container>
  ) : (
    <Spinner />
  );
};

export default Home;

export const getServerSideProps = async context => {
  const { req } = context;
  const httpInstance = createBFFInstance(req);

  const response = await httpInstance.get(`/api/home/youtube-short`);
  const getCherryPoint = await httpInstance.get(`/api/home/cherry-point`);

  const cherryPoint = getCherryPoint.data;

  return {
    props: {
      shortsProps: response.data,
      cherryPorintProps: cherryPoint,
    },
  };
};
