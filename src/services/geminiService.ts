import { GoogleGenerativeAI } from "@google/generative-ai";
import { findOfflineAnswer } from "./offlineChatbot";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

let lastCallTime = 0;
const COOLDOWN_MS = 3000;

export async function chatWithGemini(prompt: string, history: any[] = []): Promise<string> {
  const now = Date.now();
  const timeSinceLastCall = now - lastCallTime;
  
  if (timeSinceLastCall < COOLDOWN_MS) {
    await new Promise(resolve => setTimeout(resolve, COOLDOWN_MS - timeSinceLastCall));
  }
  
  lastCallTime = Date.now();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, history })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text || findOfflineAnswer(prompt);
  } catch (err: any) {
    if (err?.message?.includes('429') || err?.message?.toLowerCase().includes('rate limit')) {
      console.warn("Rate limited, retrying in 8s...");
      await new Promise(resolve => setTimeout(resolve, 8000));
      return chatWithGemini(prompt, history);
    }
    console.warn("Gemini failing, falling back to offline dataset:", err);
    return findOfflineAnswer(prompt);
  }
}

export async function analyzeInfrastructure(imageUrl: string, details: any) {
  try {
    const response = await fetch('/api/analyze-damage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, details })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("Analysis Error:", err);
    return {
      type: details.type || 'Unknown Infrastructure',
      severity: 'Medium',
      reasoning: 'Automated analysis failed. Manual inspection recommended.',
      recommended_action: 'Site visit required.',
      materials: 'Various'
    };
  }
}
