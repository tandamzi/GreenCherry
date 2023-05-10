export default function parseCookies(cookieString) {
  return cookieString.split('; ').reduce((acc, current) => {
    const [key, value] = current.split('=');
    acc[key] = value;
    return acc;
  }, {});
}
