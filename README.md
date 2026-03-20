# ToolBite Realtime Voice AI 🎙️

Welcome to the ToolBite Open-Source Voice Application. This repository contains the complete frontend dashboard, WebRTC engine, and secure backend proxy necessary for hosting your own low-latency, real-time AI Voice platform using OpenAI's Native WebRTC Realtime API.

## Features
- **True Peer-to-Peer AI Voice:** Bypasses heavy wrapper libraries by connecting your browser's native `RTCPeerConnection` directly to the OpenAI Model via an ephemeral secure token proxy.
- **Granular Server VAD:** Voice Activity Detection handles fluid human interruptions and intelligent mid-sentence pause tracking.
- **Dynamic Config:** Swap the AI Voice (Alloy, Echo, Nova, etc.) and native speaking Language mid-session over the data channel.
- **Interactive UI Dashboard:** A beautiful multi-page SaaS design transitioning natively to a full-screen, video-call style session dashboard with live generated CSS 3D visualization.

## Setup Instructions (Local Development)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Rename `.env.example` to `.env` and paste your actual OpenAI API Key.
   *Security Note: Your `OPENAI_API_KEY` is completely hidden from the client. It is only utilized by the Vite Dev Server Proxy (or Next.js API route).*

3. **Start the App**
   ```bash
   npm run dev
   ```
   *Navigate to `http://localhost:5173/` and click "Launch Live App"!*

## Production Deployment Notes

In production, frontend clients cannot securely create their own `OPENAI_API_KEY` authenticated requests. You **MUST** host a backend endpoint that acts as a secure Token Proxy.

We have included multiple methods:
- **Next.js App Router (Included):** Inspect `app/api/session/route.js`. This is a fully production-ready route featuring IP-based Rate Limiting and strict error bounds.
- **Vite SSR/Proxy:** For pure Vite stacks, you must extract the middleware logic found in `vite.config.js` (`apiSessionPlugin`) to a standalone Express / Node.js secure server, as Vite's local proxy does not natively translate automatically into production static hosts like Vercel or Netlify without custom server configurations.

### Security Configurations
- **Rate Limiting:** IP limiting is implemented to prevent token drain. Adjust `MAX_REQUESTS_PER_WINDOW` as seen fit.
- **Session Cleanup:** WebRTC inherently cleans up detached browser sockets, but explicit `.close()` logic is attached to the browser's `beforeunload` event listeners to perfectly terminate sessions even if users brute-close tabs.
