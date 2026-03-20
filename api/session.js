// Vercel Serverless Function / Next.js API Route (Pages routing)
// Located at /api/session.js

// Simple in-memory rate limiting store (Works for single-region serverless cold-starts)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5;

export default async function handler(req, res) {
  // CORS Headers if required by external clients
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // 1. Basic Rate Limiting
    const ip = req.headers["x-forwarded-for"] || req.connection?.remoteAddress || "unknown-ip";
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, firstRequest: now };

    if (now - userLimit.firstRequest > RATE_LIMIT_WINDOW_MS) {
      userLimit.count = 1;
      userLimit.firstRequest = now;
    } else {
      userLimit.count += 1;
      if (userLimit.count > MAX_REQUESTS_PER_WINDOW) {
         console.warn(`[Rate Limit Exceeded] Excessive session requests from IP: ${ip}`);
         return res.status(429).json({ error: "Too many connection requests. Please wait a minute and try again." });
      }
    }
    rateLimitMap.set(ip, userLimit);

    // 2. Validate API key securely from Server Side Env
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("[Session Init] Missing OPENAI_API_KEY environment variable.");
      return res.status(500).json({ error: "Server configuration error. API key missing." });
    }

    // 3. Request Ephemeral WebRTC Token from OpenAI
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "verse",
        modalities: ["audio", "text"],
        instructions: "You are a helpful, emotionally intelligent AI virtual human named ToolBite. Converse naturally with the user, keeping responses very concise and human-like. You support multiple languages. Only speak in text when requested, primarily you are an audio conduit."
      }),
    });

    const data = await response.json();

    // 4. Secure Error Handling
    if (!response.ok) {
      console.error("[Session Init API Error] Failed to generate token. OpenAI responded with:", data);
      return res.status(500).json({ error: "Failed to initialize secure realtime session." });
    }

    // 5. Return Ephemeral Client Secret securely
    return res.status(200).json(data);

  } catch (error) {
    console.error("[Session Init Fatal Error] Unexpected server exception:", error);
    return res.status(500).json({ error: "Internal server error during WebRTC session generation." });
  }
}
