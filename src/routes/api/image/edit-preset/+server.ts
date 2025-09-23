import { json } from "@sveltejs/kit";
import { GoogleGenAI } from "@google/genai";

import { GOOGLE_API_KEY } from "$env/static/private";

import { buildPrompt, presetPromptLibrary } from "./prompts";

// Initialize Gemini SDK with your API key
const ai = new GoogleGenAI({
  apiKey: GOOGLE_API_KEY 
});


export async function POST({ request }) {
  try {
    // Expect JSON body { prompt, presetID, imageData: { base64Image, mimeType } }
    const { prompt, presetId, imageData: { base64Image, mimeType } } = await request.json();

    console.log("Prompt:", prompt);
    console.log("PresetID:", presetId);
    console.log("MimeType:", mimeType);

    if (!presetId || !base64Image || !mimeType) {
      return json({ error: "Missing 'presetId' or 'imageData' or 'mimeType'" }, { status: 400 });
    }

    const promptObject = buildPrompt(presetId, prompt, presetPromptLibrary);

    // Build Gemini request
    const contents = [
      { text: promptObject.prompt_string },
      {
        inlineData: {
          mimeType: mimeType || "image/png",
          data: base64Image // base64 string
        }
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents
    });

    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts;

    if (!parts) {
      return json({ error: "No edited image generated" }, { status: 502 });
    }

    for (const part of parts) {
      const imageData = part.inlineData?.data;
      if (imageData) {
        const buffer = Buffer.from(imageData, "base64");
        const outMimeType = part.inlineData?.mimeType ?? "image/png";

        console.log('Image generated');

        return new Response(buffer, {
          headers: { "Content-Type": outMimeType }
        });
      }
    }

    return json({ error: "No image data found in response" }, { status: 502 });
  } catch (err) {
    console.error("Image editing error:", err);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}
