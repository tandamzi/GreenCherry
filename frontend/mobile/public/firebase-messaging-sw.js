/* eslint-disable no-undef */
/* eslint-disable no-console */
self.addEventListener('install', function (e) {
  console.log('fcm sw install..');
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
  console.log('push: ', e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json();
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.notification.body,
    icon: 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile2.png?alt=media',
    data: resultData.data,
    ...resultData,
  };
  console.log('push: ', { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  console.log('notification click');
  console.log('data = ', event.notification.data);
  const url = '/';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
