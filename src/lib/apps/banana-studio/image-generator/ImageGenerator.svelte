<script lang="ts">


  let prompt = $state("");
  let imageHistory: string[] = $state([]);
  let activeImageUrl = $state("");

  let loading = $state(false);
  let error: string | null = $state(null);

  async function generateImage() {
    if (!prompt) {
      error = "Please enter a prompt";
      return;
    }

    loading = true;
    error = null;

    try {
      const res = await fetch("/api/image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        error = err.error || "Failed to generate image";
      } else {
        const blob = await res.blob();
        const newUrl = URL.createObjectURL(blob);

        imageHistory = [newUrl, ...imageHistory];
        activeImageUrl = newUrl;
      }
    } catch (e) {
      error = "Network error";
      console.error(e);
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
    <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
      Image Generator
    </h1>

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

    {#if error}
      <div
        class="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-9.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414L11.414 10l1.293 1.293a1 1 0 01-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 10 7.293 8.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="font-medium">{error}</span>
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
        <h2 class="text-2xl font-semibold text-gray-800">History</h2>
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
  