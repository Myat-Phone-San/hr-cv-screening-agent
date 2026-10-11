module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.BOT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'BOT_SECRET is not configured on the server.' });
  }

  try {
    const response = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', {
      method: 'POST',
      headers: { Authorization: `Bearer ${secret}` },
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) {
      return res.status(502).json({ error: 'Unable to obtain a chat token.' });
    }
    const data = await response.json();
    if (typeof data.token !== 'string' || !data.token) {
      return res.status(502).json({ error: 'Unable to obtain a chat token.' });
    }
    return res.status(200).json({ token: data.token });
  } catch {
    return res.status(502).json({ error: 'Chat service is temporarily unavailable.' });
  }
};
