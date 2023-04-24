// 서비스 워커에게 푸시 이벤트를 수신하도록 지시
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.', event.data.text());
  const { title, body } = event.data.json();
  event.waitUntil(self.registration.showNotification(title, { body }));
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] notificationclick');
  clients.openWindow(event.notification.data.link);
});

self.addEventListener('install', () => {
  console.log('[Service Worker] install');
  self.skipWaiting();
});
