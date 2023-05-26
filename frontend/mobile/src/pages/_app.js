import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { Router, useRouter } from 'next/router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import PageTransition from '@/components/PageTransition';
import store from '@/redux/store';

import '@/styles/globals.css';
import '../styles/fonts/style.css';

import { DefaultSeo } from 'next-seo';

export const persistor = persistStore(store);

const DEFAULT_SEO = {
  title: 'Green Cherry',
  description: '판매자, 소비자, 환경까지 생각한 마감 세일 서비스',
  canonical: 'https://greencherry.store/',
};
function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    const handleError = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleError);

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
          <DefaultSeo {...DEFAULT_SEO} />
          <Component {...pageProps} location={route} />
        </PageTransition>
      </PersistGate>
    </Provider>
  );
}

export default App;
