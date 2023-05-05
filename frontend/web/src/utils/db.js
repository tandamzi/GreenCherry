/* eslint-disable no-console */
const subscriptions = new Set();

export function saveSubscription(subscription) {
  subscriptions.add(subscription);
  console.log('DB에 저장합니다: ', subscription);
}

export function getSubscriptions() {
  console.log('DB를 확인합니다', subscriptions);
  return Array.from(subscriptions);
}
