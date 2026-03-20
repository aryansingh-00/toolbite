import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to strictly safely proxy the OpenAI Ephemeral Session
const apiSessionPlugin = (apiKey) => ({
  name: 'api-session',
  configureServer(server) {
    server.middlewares.use('/api/session', async (req, res) => {
      try {
        if (!apiKey) {
          throw new Error("Missing OPENAI_API_KEY in .env");
        }
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
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      } catch (e) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), apiSessionPlugin(env.OPENAI_API_KEY)],
  };
});
