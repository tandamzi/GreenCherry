/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import Router from 'next/router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import CherryBoxModal from '@/components/CherryBoxModal';
import CloseStoreModal from '@/components/CloseStoreModal';
import MypageModal from '@/components/MypageModal';
import Spinner from '@/components/Spinner';
import store from '@/redux/store';

import '@/styles/globals.css';

export const persistor = persistStore(store);

function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    const handleError = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleError);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope,
          );
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleError);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CloseStoreModal />
        <MypageModal />
        <CherryBoxModal />
        {loading ? (
          <span className="flex justify-center items-center">
            <Spinner />
          </span>
        ) : (
          <Component {...pageProps} />
        )}
      </PersistGate>
    </Provider>
  );
}

export default App;
