# SvelteKit + Gemini 2.5 Flash ("Nano Banana") Starter

Everything you need to add AI image generation and editing to a Svelte/SvelteKit app using Google's Gemini 2.5 Flash image-preview model. This starter provides:

- API endpoints for three core image tasks
  - Generate a new image from a text prompt
  - Edit an existing image using a prompt
  - Blend/compose multiple images using a prompt
- Polished Svelte UI "mini apps" for each task (Generator, Editor, Blender) bundled into a simple studio experience

---

## Quick Start

```sh
# Install dependencies
npm install

# Start dev server
npm run dev
# or open automatically
npm run dev -- --open
```

### Environment Variables
Create a `.env` file in the project root with your Google API key:

```env
GOOGLE_API_KEY=your_google_genai_api_key
```

This key is read from `GOOGLE_API_KEY` via SvelteKit's `$env/static/private` in the API routes.

> You can obtain an API key from Google AI Studio. Ensure the Gemini Image Preview model is available in your region and account.

---

## Project Structure

- `src/routes/api/image/generate/+server.ts`: Create new images from a text prompt
- `src/routes/api/image/edit/+server.ts`: Edit a single uploaded image using a text prompt
- `src/routes/api/image/blend/+server.ts`: Blend multiple uploaded images guided by a text prompt
- `src/lib/apps/banana-studio/*`: Svelte UI components for the three image tasks and a basic studio shell
- `src/routes/+page.svelte`: Renders the studio UI

---

## API Reference

All endpoints return an image binary on success with the appropriate `Content-Type` (e.g. `image/png`). On error, they return JSON `{ error: string }`.

### POST /api/image/generate
Create a new image from a prompt.

Request (JSON):
```json
{ "prompt": "a cyberpunk cat wearing neon sunglasses" }
```


Notes:
- Uses model `gemini-2.5-flash-image-preview`
- Server returns the first image candidate it finds in the response parts

### POST /api/image/edit
Edit an existing image using a prompt.

Request (JSON):
```json
{
  "prompt": "turn the sky purple and add neon signs",
  "imageData": {
    "base64Image": "<BASE64_STRING>",
    "mimeType": "image/png"
  }
}
```


### POST /api/image/blend
Blend multiple images using a prompt.

Request (JSON):
```json
{
  "prompt": "blend the two photos into a cinematic poster with dramatic lighting",
  "imagesData": [
    { "base64Image": "<BASE64_A>", "mimeType": "image/jpeg" },
    { "base64Image": "<BASE64_B>", "mimeType": "image/png" }
  ]
}
```


---

## UI: Banana Studio

The starter includes a simple studio UI at the root route that hosts three mini apps:

- Generator: prompt → image
- Editor: upload one image + prompt → edited image
- Blender: upload multiple images + prompt → blended image

Locations:
- `src/lib/apps/banana-studio/image-generator/ImageGenerator.svelte`
- `src/lib/apps/banana-studio/image-editor/ImageEditor.svelte`
- `src/lib/apps/banana-studio/blend-image/BlendImages.svelte`
- `src/lib/apps/banana-studio/Studio.svelte` (shell + navigation)

Common features:
- Client-side validation, loading states, simple error display
- History panels for recent outputs/uploads
- Download buttons for generated results

---

### You can further improve this starter repository by implementing the following ides:

## Presets (Popular Image Tasks)

You can implement these as preset prompts or starter forms in the UI:

- Photo Restorations: "Restore old photograph, remove scratches, enhance detail and color fidelity."
- Virtual Try-Ons: "Apply [product] to the person in the image, match lighting and perspective."
- Background Removal: "Isolate subject, generate clean transparent background with soft edges."
- Professional Headshots: "Corporate-style headshot with soft key light, neutral backdrop, 85mm DOF."
- Product Mockups: "Place product on white sweep with realistic shadows and reflections."
- Style Transfer: "Recompose in [art style], preserve composition and identity."
- Color Grading: "Apply cinematic teal-orange grading with lifted shadows."

Implementation idea:
- Add a presets menu that populates the prompt textarea and optional parameters.

---

## Prompt Library

Curate reusable prompts for quality and consistency:

- Portrait Enhancer: "Enhance skin texture naturally, maintain pores, reduce noise, balanced contrast."
- Social Thumbnail: "Bold high-contrast subject, vibrant background gradient, large readable text space."
- E-commerce Hero: "High-key lighting, white background, soft shadow under subject, crisp edges."
- Scene Expansion: "Extend background seamlessly, preserve perspective lines and lighting."
- Iconography: "Flat vector style, limited color palette, high contrast, clean negative space."

Store these as JSON or TS objects in `src/lib/prompts` and surface them in the UI for one-click insert.

---

## Idea Bank (Use Cases)

- YouTube thumbnails
- Podcast cover art
- Book and chapter illustrations
- Storyboards and shot planning
- Product catalogs and A/B variations
- Marketing banners and hero images
- Social profile photos and team pages

---

## Workflows (Image + Text Reasoning)

Combine steps to solve real tasks end-to-end:

- YouTube Thumbnail Generator
  1) Generate background concept from topic prompt
  2) Edit uploaded face photo to match style
  3) Composite brand colors and text space; export 1280×720

- Video Scene Boards
  1) Generate key frames from script beats
  2) Edit specific frames to refine props/lighting
  3) Blend frames for continuity panels; export contact sheet

- Product Listing Pipeline
  1) Remove background, generate clean white sweep
  2) Color-grade to match brand palette
  3) Compose multiple angles into a hero banner

---

## Model & SDK

- SDK: `@google/genai`
- Model: `gemini-2.5-flash-image-preview`
- The server converts base64 image parts to binary buffers and returns them directly with correct MIME types.

---

## Development

```sh
# Typecheck
npm run check

# Lint
npm run lint

# Build
npm run build

# Preview production build
npm run preview
```

---

## Notes & Limitations

- The server returns only the first candidate image in the response.
- Large images may exceed request limits; consider client-side resizing.
- Ensure you comply with Google AI usage policies for your region and use case.

---

## Roadmap

- Preset system baked into UI
- Prompt library picker + saved histories
- Parameter controls: size, style strength, safety settings
- Drag-to-mask editing (where supported)
- Export: formats, quality, aspect presets

---

## License

MIT. See `LICENSE` if included, or add your preferred license.
