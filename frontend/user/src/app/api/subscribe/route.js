import { saveSubscription } from "../../../utils/db";
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

export async function POST() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}


export default async function handler(req, res) {
  console.log("subscribe.js");
  if (req.method === "POST") {
    const subscription = req.body;

    try {
      await saveSubscription(subscription);
      res.status(201).json({ message: "Subscription saved" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to save subscription" });
    }
  } else {
    console.log('여기 까지 오니?')
    res.status(405).json({ message: "Method not allowed" });
  }

  

  
}

export async function subscribeUser() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Notification permission denied");
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
}
