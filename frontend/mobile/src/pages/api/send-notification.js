/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import webPush from 'web-push';

import { getSubscriptions } from '../../utils/db';

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webPush.setVapidDetails(
  'mailto:rachaenlee@gmail.com',
  publicVapidKey,
  privateVapidKey,
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const subscriptions = getSubscriptions();
    console.log(subscriptions);
    const notificationPayload = {
      title: 'Hello from PWA',
      body: 'This is a test push notification',
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
    };

    try {
      console.log(notificationPayload);
      console.log('ㄱㄱㄱ?');
      for (const subscription of subscriptions) {
        console.log('여기엔 도달하니?', subscription);
        await webPush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload),
        );
      }
      res.status(200).json({ message: 'Push notifications sent' });
    } catch (error) {
      console.error(error);
      console.log(subscriptions);
      res.status(500).json({ message: 'Failed to send push notifications' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
