/* eslint-disable no-console */

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import {
  Transition,
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

import cs from 'classnames';
import { Router, useRouter } from 'next/router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import style from './index.module.scss';

import PageTransition from '@/components/PageTransition';
import Spinner from '@/components/Spinner';
import store from '@/redux/store';

import '@/styles/globals.css';
import '../styles/fonts/style.css';

export const persistor = persistStore(store);

const firebaseConfig = {
  apiKey: 'AIzaSyD4LajuG61T7Q5VL5-JGODdt19zM2Yej_4',
  authDomain: 'greencherry-notice.firebaseapp.com',
  projectId: 'greencherry-notice',
  storageBucket: 'greencherry-notice.appspot.com',
  messagingSenderId: '280305112250',
  appId: '1:280305112250:web:ff845972d09a4772a45e83',
  measurementId: 'G-WE2RP9HYFD',
};

function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const location = 'hello';
  const route = useRouter();
  const { pathname } = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    const handleError = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleError);

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     .register('/sw.js')
    //     .then(registration => {
    //       console.log(
    //         'Service Worker registered with scope:',
    //         registration.scope,
    //       );
    //     })
    //     .catch(error => {
    //       console.error('Service Worker registration failed:', error);
    //     });
    // }
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleError);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PageTransition>
          {/* <TransitionGroup className={cs(style['transition-wrapper'])}>
          <CSSTransition
            key={route.pathname}
            timeout={300}
            classNames={cs(style['navigate-push'])}
          >
            <div> */}
          <Component {...pageProps} location={route} />
          {/* </div>
          </CSSTransition>
        </TransitionGroup> */}
        </PageTransition>
      </PersistGate>
    </Provider>
  );
}

export default App;
