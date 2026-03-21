// Vercel Serverless Function / Next.js API Route (Pages routing)
// Located at /api/session.js

// Simple in-memory rate limiting store (Works for single-region serverless cold-starts)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5;

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Ensure method is exactly POST
  if (req.method !== "POST") {
    console.warn(`[Session API ERROR] Invalid HTTP method used: ${req.method}. Allowed: POST.`);
    return res.status(405).json({ error: "Method Not Allowed. Only POST is supported." });
  }

  try {
    const ip = req.headers["x-forwarded-for"] || req.connection?.remoteAddress || "unknown-ip";
    
    // 1. Basic Rate Limiting Check
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, firstRequest: now };

    if (now - userLimit.firstRequest > RATE_LIMIT_WINDOW_MS) {
      userLimit.count = 1;
      userLimit.firstRequest = now;
    } else {
      userLimit.count += 1;
      if (userLimit.count > MAX_REQUESTS_PER_WINDOW) {
         console.warn(`[Session API ERROR] Rate limit exceeded for IP: ${ip}`);
         return res.status(429).json({ error: "Too many session requests. Please wait a minute and try again." });
      }
    }
    rateLimitMap.set(ip, userLimit);

    console.log(`[Session API INFO] Request received from IP: ${ip}`);

    // 2. Validate Environment Variables Securely
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Vercel specific debug log (checks if env var is loaded into runtime without leaking it)
    console.log(`[Session API INFO] Environment Check: API Key is ${apiKey ? "PRESENT" : "MISSING"}`);

    if (!apiKey) {
      console.error("[Session API FATAL] Missing OPENAI_API_KEY environment variable. Have you added it to Vercel?");
      return res.status(500).json({ 
        error: "Server configuration error. OPENAI_API_KEY is missing.",
        message: "Please ensure the API key is configured in your Vercel Environment Variables or local .env file."
      });
    }

    console.log("[Session API INFO] Initializing Realtime WebRTC Session with OpenAI...");

    // 3. Request Ephemeral WebRTC Token from OpenAI
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Updated model from legacy gpt-4o-realtime-preview to the latest realtime mini preview model
        model: "gpt-4o-mini-realtime-preview-2024-12-17", 
        voice: "verse",
        modalities: ["audio", "text"],
        instructions: "You are a helpful, emotionally intelligent AI virtual human named ToolBite. Converse naturally with the user, keeping responses very concise and human-like. You support multiple languages. Only speak in text when requested, primarily you are an audio conduit."
      }),
    });

    // 4. Log the verbatim response status for debugging
    console.log(`[Session API INFO] OpenAI Response HTTP Status: ${response.status} ${response.statusText}`);
    
    const data = await response.json();
    
    // 5. Handle non-200 Error Responses from OpenAI
    if (!response.ok) {
      console.error("[Session API ERROR] OpenAI rejected the session request.");
      console.error("[Session API ERROR DETAILS]:", JSON.stringify(data, null, 2));
      
      return res.status(response.status).json({ 
        error: "Failed to initialize realtime session from OpenAI.",
        details: data.error?.message || "Unknown OpenAI API Error"
      });
    }

    // Success log
    console.log("[Session API SUCCESS] Session successfully created. Returning secure token to frontend.");
    
    // 6. Return Ephemeral Client Secret to frontend
    return res.status(200).json(data);

  } catch (error) {
    // 7. Catch all fatal server exceptions (e.g., fetch network failures, JSON parsing errors)
    console.error("[Session API FATAL] Unexpected server exception:");
    console.error(error);
    
    return res.status(500).json({ 
      error: "Internal server error during WebRTC session generation.",
      message: error.message 
    });
  }
}
