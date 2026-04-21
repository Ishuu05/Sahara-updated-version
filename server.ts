import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, history } = req.body;
      
      const response = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are Sahara AI, a calm emergency response assistant for India. Speak warmly and clearly. Answer ONLY: disaster safety, survival, evacuation, first aid, finding resources, emergency procedures, food safety, water purification, medical emergencies. Always end with one concrete action. Never cause panic."
        }
      });
      
      res.json({ text: response.candidates?.[0]?.content?.parts?.[0]?.text || "I am unable to answer that right now." });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/analyze-damage", async (req, res) => {
    try {
      const { imageUrl, details } = req.body;
      // Image analysis would need multipart or URL
      // For now, return a smart AI reasoning
      const prompt = `Analyze this infrastructure damage: ${JSON.stringify(details)}. 
      Return JSON: {"type": "Bridge|Road|Building", "severity": "Critical|High|Medium|Low", "reasoning": "1 sentence why", "recommended_action": "1 sentence", "materials": "concrete, etc"}`;
      
      const response = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt
      });
      
      res.json(JSON.parse(response.candidates?.[0]?.content?.parts?.[0]?.text || "{}"));
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
