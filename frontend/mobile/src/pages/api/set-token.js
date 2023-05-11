export default function handler(req, res) {
  const { token } = req.query;

  if (token) {
    res.setHeader(
      'Set-Cookie',
      `token=${token}; Path=/; Max-Age=${
        7 * 24 * 60 * 60
      }; Secure; SameSite=Lax`,
    );
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ message: 'Token not provided' });
  }
}
