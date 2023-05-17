/* eslint-disable no-undef */
/* eslint-disable no-console */
self.addEventListener('install', function (e) {
  // console.log('fcm sw install..');
  self.skipWaiting();
});

// self.addEventListener('activate', function (e) {
//   console.log('fcm sw activate..');
// });

self.addEventListener('push', function (e) {
  const bc = new BroadcastChannel('fcm_channel');
  console.log('push: ', e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json();
  const notificationTitle = resultData.notification.title;
  const notificationOptions = {
    body: resultData.notification.body,
    data: resultData.data,
    ...resultData,
  };

  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions),
  );

  bc.postMessage(resultData);
});

self.addEventListener('notificationclick', function (event) {
  const { data } = event.notification;

  let url = '/';
  if (data.noticeType === 2) {
    const { storeId } = data;
    url = `/business/order`;
  }

  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
