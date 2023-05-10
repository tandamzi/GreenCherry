function parseCookies(cookieString) {
  const cookies = {};
  const keyValuePairs = cookieString.split('; ');

  keyValuePairs.forEach(pair => {
    const [key, value] = pair.split('=');
    cookies[key] = value;
  });

  return cookies;
}

export default parseCookies;
