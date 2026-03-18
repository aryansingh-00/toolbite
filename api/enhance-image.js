
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.VITE_DEEPAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'DeepAI API key not configured on server' });
  }

  try {
    const response = await fetch('https://api.deepai.org/api/torch-srgan', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': req.headers['content-type']
      },
      body: req.body
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('DeepAI Proxy Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
