
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, systemPrompt, userPrompt, temperature, prompt } = req.body;
  const apiKey = process.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured on server' });
  }

  try {
    let endpoint = 'https://api.openai.com/v1/chat/completions';
    let body = {};

    if (type === 'image') {
      endpoint = 'https://api.openai.com/v1/images/generations';
      body = {
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024'
      };
    } else {
      body = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: temperature || 0.7,
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('OpenAI Proxy Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
