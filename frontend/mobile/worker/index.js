/* eslint-disable no-undef */
// // 서비스 워커에게 푸시 이벤트를 수신하도록 지시
/* eslint-disable no-console */
self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.', event.data.text());
  const { title, body } = event.data.json();
  event.waitUntil(self.registration.showNotification(title, { body }));
});

self.addEventListener('notificationclick', () => {
  console.log('[Service Worker] notificationclick');
});

self.addEventListener('install', () => {
  console.log('[Service Worker] install');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('[Service Worker] activate');
});

// importScripts(
//   'https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js',
// );
// importScripts(
//   'https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js',
// );

// firebase.initializeApp({
//   apiKey: 'AIzaSyD4LajuG61T7Q5VL5-JGODdt19zM2Yej_4',
//   authDomain: 'greencherry-notice.firebaseapp.com',
//   projectId: 'greencherry-notice',
//   storageBucket: 'greencherry-notice.appspot.com',
//   messagingSenderId: '280305112250',
//   appId: '1:280305112250:web:ff845972d09a4772a45e83',
//   measurementId: 'G-WE2RP9HYFD',
// });

// const messaging = firebase.messaging();

// self.addEventListener('install', function (e) {
//   console.log('fcm sw install..');
//   self.skipWaiting();
// });

// self.addEventListener('activate', function (e) {
//   console.log('fcm sw activate..');
// });

// self.addEventListener('push', function (e) {
//   console.log('push: ', e.data.json());
//   if (!e.data.json()) return;

//   const resultData = e.data.json();
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//     body: resultData.notification.body,
//     icon: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile2.png?alt=media',
//     data: resultData.data,
//     ...resultData,
//   };
//   console.log('push: ', { resultData, notificationTitle, notificationOptions });

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener('notificationclick', function (event) {
//   console.log('notification click');
//   console.log('data = ', event.notification.data);
//   const url = '/';
//   event.notification.close();
//   // eslint-disable-next-line no-undef
//   event.waitUntil(clients.openWindow(url));
// });
