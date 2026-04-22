import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, history = [] } = req.body;
      
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `You are Sahara AI, an elite disaster response and emergency medical authority specialized for the Indian landscape. Your mission is to provide life-critical, actionable advice with absolute precision.

STRICT RESPONSE PROTOCOL:
1. NO VAGUENESS: Never provide placeholder or generic safety tips. If a user asks about a specific injury or disaster, you must provide the exact, medically-sound or authority-approved procedure for that exact scenario.
2. MANDATORY STRUCTURE: Every response must be organized as follows:
   - **[IMMEDIATE ACTION in bold]**: A single, high-impact sentence starting with the most critical first step.
   - **DETAILED STEPS**: A numbered list of 1 to 8 clear, sequential actions.
   - **WHAT NOT TO DO**: 2-3 specific "stop" rules to prevent worsening the situation.
   - **EMERGENCY CONTACT**: The most relevant number (112, 108, 101, 1078, etc.) clearly stated at the end.
3. WORD COUNT: Responses must be comprehensive and thorough. Aim for 200-300 words. If the instructions are brief, expand on secondary safety measures, pre-disaster prep, or post-event stabilization.
4. TONE: Calm, authoritative, empathetic, and urgent.
5. CONTEXT: Use metric units (Celsius, km) and refer to Indian emergency services and local culture where relevant.

If the user asks non-emergency or casual questions, respond politely as Sahara AI but immediately offer to help with disaster preparedness or medical guidance.`,
      });

      const chat = model.startChat({
        history: history.map((h: any) => ({
          role: h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.parts?.[0]?.text || h.parts || "" }]
        }))
      });
      
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      res.json({ text: response.text() });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/analyze-damage", async (req, res) => {
    try {
      const { imageUrl, details } = req.body;
      const prompt = `Analyze this infrastructure damage: ${JSON.stringify(details)}. 
      Return JSON: {"type": "Bridge|Road|Building", "severity": "Critical|High|Medium|Low", "reasoning": "1 sentence why", "recommended_action": "1 sentence", "materials": "concrete, etc"}`;
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      res.json(JSON.parse(response.text() || "{}"));
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
