import { json } from "@sveltejs/kit";
import { GoogleGenAI } from "@google/genai";

import { GOOGLE_API_KEY } from "$env/static/private";

// Initialize Gemini SDK with your API key
const ai = new GoogleGenAI({
  apiKey: GOOGLE_API_KEY 
});

export async function POST({ request }) {
    try {
      const { prompt } = await request.json();

      console.log("Prompt:", prompt);
  
      if (!prompt) {
        return json({ error: "Missing 'prompt' field" }, { status: 400 });
      }
  
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image-preview",
        contents: prompt
      });
  
      const candidate = response.candidates?.[0];
      const parts = candidate?.content?.parts;
  
      if (!parts) {
        return json({ error: "No image generated" }, { status: 502 });
      }
  
      for (const part of parts) {
        const imageData = part.inlineData?.data;
        if (imageData) {
          const buffer = Buffer.from(imageData, "base64");
          const mimeType = part.inlineData?.mimeType ?? "image/png";

          console.log("Generated image:", mimeType);
  
          return new Response(buffer, {
            headers: { "Content-Type": mimeType }
          });
        }
      }
  
      return json({ error: "No image data found in response" }, { status: 502 });
    } catch (err) {
      console.error("Image generation error:", err);
      return json({ error: "Internal server error" }, { status: 500 });
    }
}
  