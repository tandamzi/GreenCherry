import { saveSubscription } from '@/utils/db';
import { NextResponse } from 'next/server';

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

export async function POST(request) {
  console.log('3. POST request 정보 ', request);
  const subscription = request.body;
  console.log(subscription);
  try {
    await saveSubscription(subscription);
    return NextResponse.json({ msg: 'POST: 성공' });
  } catch {
    return NextResponse.json({ msg: 'POST: 실패' });
  }
}
