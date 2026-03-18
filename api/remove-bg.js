
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.VITE_REMOVE_BG_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Remove.bg API key not configured on server' });
  }

  try {
    // We expect the body to be the same formData from the client
    // However, serverless functions handle body differently.
    // For simplicity, we might need the client to send a base64 or we handle multipart.
    // Vercel handles multipart/form-data via some libraries, but let's try a direct pass or base64.
    
    // Simplest for now: Assume client sends JSON with base64 'image' if we want to be safe, 
    // OR we use the raw body if it's already a stream.
    
    // Actually, Vercel functions can handle a buffer.
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': req.headers['content-type']
      },
      body: req.body // Forward the raw body
    });

    if (!response.ok) {
        const errText = await response.text();
        return res.status(response.status).send(errText);
    }

    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'image/png');
    return res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('RemoveBG Proxy Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: false, // Let fetch handle the stream/formData
  },
};
