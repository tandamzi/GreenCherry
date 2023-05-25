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
  console.log('push: ', e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json();
  const notificationTitle = resultData.notification.title;
  const notificationOptions = {
    body: resultData.notification.body,
    icon: '/assets/logo/cherryLogo.svg',
    data: resultData.data,
    ...resultData,
  };
  // console.log('push: ', { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  const data = event.notification.data;
  console.log('noticeType = ', data.noticeType);

  let url = '/';
  if (data.noticeType == 1) {
    const storeId = data.storeId;
    url = `/store/${storeId}`;
  }

  if (data.noticeType == 3) {
    url = '/order-list';
  }

  event.notification.close();
  event.waitUntil(clients.openWindow(url));

  // event.waitUntil(
  //   clients
  //     .matchAll({ type: 'window', includeUncontrolled: true })
  //     .then(clientList => {
  //       for (let i = 0; i < clientList.length; i++) {
  //         const client = clientList[i];
  //         if (
  //           client.url === 'greencherry.store/api/store/1' &&
  //           'focus' in client
  //         ) {
  //           console.log('focus');
  //           return client.focus();
  //         }
  //       }
  //       console.log('openwindow');
  //       return clients.openWindow(url);
  //     }),
  // );
});
