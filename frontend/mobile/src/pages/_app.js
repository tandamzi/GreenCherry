import { useEffect } from 'react';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(function (registration) {
          console.log(
            'SW registration test successful with scope: ',
            registration.scope,
            registration,
          );
        })
        .catch(function (err) {
          console.log('SW registration test failed: ', err);
        });
    } else {
      console.log('No service-worker on this browser');
    }
  }, []);
  return <Component {...pageProps} />;
}
