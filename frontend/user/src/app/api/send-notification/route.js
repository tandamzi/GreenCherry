import webPush from 'web-push';
import { getSubscriptions } from '@/utils/db';
import { NextResponse } from 'next/server';

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webPush.setVapidDetails('mailto:rachaenlee@gmail.com', publicVapidKey, privateVapidKey);

export async function POST(request) {
  const subscriptions = getSubscriptions();
  const notificationPayload = {
    title: 'Hello from PWA',
    body: 'This is a test push notification',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
  };
  try {
    for (const subscription of subscriptions) {
      await webPush.sendNotification(subscription, JSON.stringify(notificationPayload));
    }
    return NextResponse.json({ msg: 'POST: push 보내기 성공' });
  } catch {
    return NextResponse.json({ msg: 'POST: push 보내기 실패' });
  }
}
