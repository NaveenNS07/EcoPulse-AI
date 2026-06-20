import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust the reverse proxy (required for rate limiting to work correctly behind it)
  app.set('trust proxy', 1);

  // Security Middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled for dev server compatibility
  }));
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  // Rate Limiting to prevent API abuse
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
  });

  app.use('/api', apiLimiter);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // AI Endpoints
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  app.post('/api/ai/chat', async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({ error: 'Gemini API key not configured.' });
      }
      
      const { message, logs, stats } = req.body;
      
      const prompt = `You are EcoPulse AI, a world-class AI Sustainability Coach. 
The user is tracking their carbon footprint through your app. 
Current carbon stats this month: ${stats?.totalCurrentMonth || 0} kg CO2e.
Provide incredibly concise, actionable, friendly, and practical advice based on their message.

User Message: "${message}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('AI Chat Error:', error);
      if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('exceeded quota')) {
          res.json({ text: "I'm currently receiving too many requests. But generally, the best way to reduce footprints is to focus on your main emission source (e.g., commute, diet)." });
      } else {
          res.status(500).json({ error: 'Failed to generate AI response.' });
      }
    }
  });

  app.post('/api/ai/coach', async (req, res) => {
    try {
        if (!ai) {
            return res.status(503).json({ error: 'Gemini API key not configured.' });
          }

        const { logs } = req.body;
        
        let logsContext = "User hasn't logged much yet.";
        if (logs && logs.length > 0) {
            logsContext = `Recent logs (last 10): ${JSON.stringify(logs.slice(0, 10))}`;
        }

        const prompt = `You are EcoPulse AI, a world-class AI Sustainability Coach. Analyze the user's activities:
${logsContext}

Provide exactly 3 highly personalized, actionable suggestions to reduce their carbon footprint.
Format each suggestion as a short, punchy sentence. 
Do not include conversational filler, just a JSON array of strings. 
Example: ["Swap out beef for chicken twice a week to save 5kg CO2.", "Your driving emissions are high; try carpooling on Thursdays."]`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        let suggestions = [];
        try {
            const rawText = response.text || "[]";
            const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            suggestions = JSON.parse(cleaned);
        } catch (e) {
            console.error("Failed to parse JSON from AI response", response.text);
            suggestions = ["Consider public transportation.", "Reduce red meat consumption.", "Unplug unused electronics."];
        }

        res.json({ suggestions });

    } catch (err: any) {
        console.error('AI Coach Error:', err);
        if (err?.status === 429 || err?.message?.includes('429') || err?.message?.includes('exceeded quota')) {
            // Graceful fallback for rate limiting
            res.status(200).json({ suggestions: [
                "Based on typical usage, try reducing car travel.",
                "Eat one more plant-based meal this week.",
                "Turn off unnecessary lights to save energy."
            ]});
        } else {
            res.status(500).json({ error: 'Failed to generate AI advice.' });
        }
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
