// Simple in-memory rate limiting store 
// (Note: In production serverless environments like Vercel, use Redis/KV for persistence)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request) {
  try {
    // 1. Basic Rate Limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, firstRequest: now };

    if (now - userLimit.firstRequest > RATE_LIMIT_WINDOW_MS) {
      // Reset limit window
      userLimit.count = 1;
      userLimit.firstRequest = now;
    } else {
      userLimit.count += 1;
      if (userLimit.count > MAX_REQUESTS_PER_WINDOW) {
         console.warn(`[Rate Limit Exceeded] Excessive session requests from IP: ${ip}`);
         return Response.json(
           { error: "Too many connection requests. Please wait a minute and try again." },
           { status: 429 }
         );
      }
    }
    rateLimitMap.set(ip, userLimit);

    // 2. Validate API key securely
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("[Session Init] Missing OPENAI_API_KEY environment variable.");
      return Response.json(
        { error: "Server configuration error. API key missing." },
        { status: 500 }
      );
    }

    // 3. Request Ephemeral WebRTC Token from OpenAI
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview",
        voice: "alloy",
      }),
    });

    const data = await response.json();

    // 4. Secure Error Handling
    if (!response.ok) {
      console.error("[Session Init API Error] Failed to generate token. OpenAI responded with:", data);
      return Response.json(
        { error: "Failed to initialize secure realtime session." },
        { status: 500 }
      );
    }

    // 5. Return Ephemeral Client Secret securely
    return Response.json(data);

  } catch (error) {
    console.error("[Session Init Fatal Error] Unexpected server exception:", error);
    return Response.json(
      { error: "Internal server error during WebRTC session generation." },
      { status: 500 }
    );
  }
}
