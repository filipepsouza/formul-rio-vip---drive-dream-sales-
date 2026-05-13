import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getCarRecommendation(preferences: string) {
  if (!preferences || preferences.length < 5) return null;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an elite luxury car concierge. Based on these client preferences: "${preferences}", suggest 2 specific high-end car models with a one-sentence elegant justification for each. Be sophisticated and exclusive. Respond in Portuguese.`,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
