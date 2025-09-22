<script lang="ts">
  import { ImageGeneratorSvg } from "$lib/icons/svg";

  let prompt = $state("");
  let imageHistory: string[] = $state([]);
  let activeImageUrl = $state("");

  let loading = $state(false);
  let errorMessage: string  = $state("");

  const generatdHistoryLimit = 10;


async function generateImage() {
 
  errorMessage = "";

  // Validate prompt
  if (typeof prompt !== "string" || prompt.trim() === "") {
    errorMessage = "Please enter a prompt.";
    return;
  }

  loading = true;

  try {
    const response = await fetch("/api/image/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt.trim() })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      errorMessage = errorData?.message || `Image generation failed: ${response.statusText}`;
      console.error(errorMessage);
      return;
    }

    const blob = await response.blob();
    const newUrl = URL.createObjectURL(blob);

    const newHistory = [newUrl, ...imageHistory];

    imageHistory = newHistory.slice(0, generatdHistoryLimit);

    activeImageUrl = newUrl;

    prompt = ""; 
  } catch (err) {
    errorMessage = "An unexpected error occurred. Please try again.";
    console.error("Error generating image:", err);
  } finally {
    loading = false;
  }
}

function handlePromptKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    generateImage();
  }
}
</script>

<main class="min-h-screen bg-gray-50 p-6 md:p-8 lg:p-12 xl:px-16">
  <div class="mx-auto max-w-4xl space-y-8 md:space-y-12">
    <header class="space-y-2 flex flex-col items-center">
      <h1 class="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-900">
        <span class="inline-block align-middle">
        {@html ImageGeneratorSvg}
        </span>
        Image Generator
      </h1>
      <p class="text-gray-600">Describe the image you want to generate, and generate.</p>
      </header>

    <section class="space-y-4">
      <textarea
        bind:value={prompt}
        onkeydown={handlePromptKeydown}
        placeholder="A cyberpunk cat wearing neon sunglasses in a digital rain storm..."
        class="w-full resize-none rounded-xl border-2 border-gray-300 p-4 font-mono text-base transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 md:text-lg"
        rows="4"
      ></textarea>

      <button
        onclick={generateImage}
        disabled={loading}
        class="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-900 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-800 hover:shadow-xl active:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {#if loading}
          <div class="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
          <span class="uppercase tracking-wider">Generating...</span>
        {:else}
          <span class="uppercase tracking-wider">Generate Image</span>
        {/if}
      </button>
    </section>

    {#if errorMessage}
    <div class="flex items-center text-red-700 bg-red-50 border border-red-200 p-4 rounded-lg">
      <svg class="w-5 h-5 mr-3 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v6h-2V7h2zm0 8v2h-2v-2h2z"/></svg>
      <span class="font-medium">{errorMessage}</span>
    </div>
    {/if}

    <section class="space-y-8">
      <div
        class="flex min-h-80 items-center justify-center rounded-xl bg-white p-6 shadow-lg md:p-8"
      >
        {#if loading}
          <div class="flex flex-col items-center gap-4 text-center">
            <div class="relative">
              <div class="h-16 w-16 animate-spin rounded-full border-4 border-blue-200"></div>
              <div
                class="absolute left-2 top-2 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-blue-600"
                style="animation-duration: 0.8s;"
              ></div>
            </div>
            <p class="font-medium text-gray-600">Creating your masterpiece...</p>
          </div>
        {:else if activeImageUrl}
          <div class="w-full space-y-4">
            <img
              src={activeImageUrl}
              alt="Generated"
              class="max-w-full rounded-lg"
              style="animation: fadeInScale 0.5s ease-out;"
            />
            <a
              href={activeImageUrl}
              download="generated-image.png"
              class="inline-block rounded-lg border-2 border-blue-900 bg-white px-6 py-3 font-medium text-blue-900 transition-colors hover:bg-blue-50 active:bg-blue-100"
            >
              Download
            </a>
          </div>
        {:else}
          <div class="text-center text-gray-500">
            <p>Your generated image will appear here.</p>
          </div>
        {/if}
      </div>
    </section>

    {#if imageHistory.length > 0}
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800">Generated History</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {#each imageHistory as imageUrl, i}
          <button
          type="button"
          onclick={() => (activeImageUrl = imageUrl)}
          class="relative aspect-square cursor-pointer overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <img
            src={imageUrl}
            alt="Generated image {i + 1}"
            class="h-full w-full object-cover transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          />
        </button>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</main>

<style>
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
  