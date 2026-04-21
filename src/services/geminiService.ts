import { GoogleGenAI } from "@google/genai";
import { findOfflineAnswer } from "./offlineChatbot";

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export async function chatWithGemini(prompt: string, history: any[] = []) {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error("API Key missing");
    }

    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 1500,
        systemInstruction: `You are Sahara AI, a calm, thorough, and knowledgeable emergency response assistant for India.
You are trained on disaster management, first aid, survival techniques, and emergency procedures.
RULES:
- Never give one-line answers. Always give complete, detailed, actionable responses.
- Structure every response with: immediate action first, then numbered steps, then warnings, then emergency contact.
- Minimum 6-8 steps or sentences per response.
- Use simple language that anyone can understand including uneducated users.
- Be warm, calm, and reassuring — never cause panic.
- Cover: floods, earthquakes, cyclones, wildfires, first aid, medical emergencies, water purification, food safety, evacuation, rescue signals, shelter building, disaster preparedness.
- Always end with the relevant emergency number: 112 (general), 108 (ambulance), 101 (fire), 1078 (disaster).`
      }
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.text || findOfflineAnswer(prompt);
  } catch (err) {
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
