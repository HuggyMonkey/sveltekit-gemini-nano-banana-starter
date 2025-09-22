<script lang="ts">
	import { ImageEditorSvg } from "$lib/icons/svg";

	type ImageFile = {
		file: File | null;
		name?: string;
		mimeType?: string;
		dataURL?: string;
		base64?: string;
	};

	let files = $state<ImageFile []>([]);
  let activeFile = $state<ImageFile | null>(null);

  let activeImageUrl = $derived(activeFile?.dataURL);

	let prompt = $state('');


	let loading = $state(false);
	let errorMessage = $state('');

  let generatedImageHistoryFiles: ImageFile[] = $state([]);

  const generatedImageHistoryLimit = 10;


  function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error("Failed to read file"));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

  async function handleFileChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const selectedFiles = input.files;
  if (!selectedFiles) return;

  const promises = Array.from(selectedFiles).map(async (selected) => {
    const dataURL = await readFileAsDataURL(selected);
    return {
      file: selected,
      name: selected.name,
      mimeType: selected.type,
      dataURL,
      base64: dataURL.split(",")[1],
    } satisfies ImageFile;
  });

  const newfiles = await Promise.all(promises);

  files = [...newfiles, ...files];
  activeFile = files[0];
}

async function blobToImageFile(blob: Blob, name = "generated.png"): Promise<ImageFile> {
  const mimeType = blob.type || "image/png";

  // Convert blob → DataURL
  const dataURL: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Failed to read blob as DataURL"));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  return {
    file: new File([blob], name, { type: mimeType }),
    name,
    mimeType,
    dataURL,         
    base64: dataURL.split(",")[1], 
  };
}

async function editImage() {
  
  errorMessage = "";

  const cleanPrompt = typeof prompt === "string" ? prompt.trim() : "";

  // Validate inputs
  if (!activeFile?.file || !cleanPrompt) {
    errorMessage = "Please select an image and enter a prompt.";
    return;
  }

  loading = true;

  try {
    const res = await fetch("/api/image/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: cleanPrompt,
        imageData: {
          base64Image: activeFile.base64,
          mimeType: activeFile.mimeType
        }
      })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      errorMessage =
        data?.error || `Image editing failed`;
      console.error(errorMessage);
      return;
    }

    const blob = await res.blob();
    const newFile = await blobToImageFile(blob, `edited-${Date.now()}.png`);

    const newHistory = [newFile, ...generatedImageHistoryFiles];
    generatedImageHistoryFiles = newHistory.slice(0, generatedImageHistoryLimit);

    activeFile = newFile;

    prompt = ""; // reset input
  } catch (err) {
    console.error("Error editing image:", err);
    errorMessage = "An unexpected error occurred. Please try again.";
  } finally {
    loading = false;
  }
}


	function downloadImage() {
		if (!activeImageUrl) return;
		const a = document.createElement('a');
		a.href = activeImageUrl;
		a.download = `edited-${activeFile?.name || 'image.png'}`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
</script>

<div class="p-4 sm:p-6 md:p-8 lg:p-12 space-y-8">
	<header class="space-y-2 flex flex-col items-center">
		<h1 class="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-900">
		  <span class="inline-block align-middle">
			{@html ImageEditorSvg}
		  </span>
		  Image Editor
		</h1>
		<p class="text-gray-600">Upload an image, describe the edit, and generate.</p>
	  </header>

	<div class="max-w-xl mx-auto">
		<label
			for="file-upload"
			class="group cursor-pointer p-8 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 rounded-2xl transition-all duration-300 hover:border-purple-400 hover:bg-purple-50"
		>
			<svg
				class="w-12 h-12 text-gray-400 group-hover:text-purple-500 transition-colors"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
				></path></svg
			>
			<p class="mt-4 text-sm font-medium text-gray-600 group-hover:text-purple-700">
				{activeFile?.name ? activeFile.name : 'Click to upload an image'}
			</p>
			<p class="text-xs text-gray-500 mt-1">PNG, JPG, WEBP</p>
		</label>
		<input
			id="file-upload"
			type="file"
			class="hidden"
			accept="image/*"
			multiple={false}
			onchange={handleFileChange}
		/>
	</div>

	<div class="max-w-2xl mx-auto space-y-6">
		<div class="bg-purple-50 p-4 rounded-lg">
			<label for="prompt-input" class="text-lg font-mono font-semibold text-purple-800 mb-2 block">
				Your Prompt
			</label>
			<textarea
				id="prompt-input"
				placeholder="A magical forest with glowing mushrooms..."
				bind:value={prompt}
				class="w-full p-4 border-2 border-gray-300 rounded-xl resize-none font-mono text-base md:text-lg text-gray-700 leading-relaxed tracking-wide bg-white transition-all duration-200 ease-in-out focus:border-purple-500 focus:ring-4 focus:ring-purple-300 focus:ring-opacity-30 selection:bg-purple-200 selection:text-purple-900"
				rows="3"
			></textarea>
		</div>

		<button
			class="w-full flex items-center justify-center bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-purple-700 hover:enabled:shadow-xl hover:enabled:scale-105 active:enabled:scale-95 focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
			onclick={editImage}
			disabled={loading || !activeFile?.file || !prompt}
		>
			{#if loading}
				<svg class="w-6 h-6 animate-spin mr-3" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				Editing...
			{:else}
				<svg
					class="w-6 h-6 mr-3"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
					></path>
				</svg>
				Apply Edit
			{/if}
		</button>
	</div>

	{#if errorMessage}
	<div class="flex items-center text-red-700 bg-red-50 border border-red-200 p-4 rounded-lg">
        <svg class="w-5 h-5 mr-3 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v6h-2V7h2zm0 8v2h-2v-2h2z"/></svg>
        <span class="font-medium">{errorMessage}</span>
      </div>
	{/if}
	

	{#if activeImageUrl}
		<div class="mt-12 text-center animate-fade-in-scale">
			<h2 class="text-2xl md:text-3xl font-bold text-gray-800">Image Being Edited</h2>
			<div class="mt-6 inline-block bg-white p-2 rounded-2xl shadow-2xl">
				<img src={activeImageUrl} alt="result" class="max-w-lg w-full rounded-xl shadow-inner" />
			</div>
			<div class="mt-6">
				<button
					onclick={downloadImage}
					class="inline-flex items-center bg-white text-blue-900 border-2 border-blue-900 px-6 py-3 rounded-lg hover:bg-blue-50 active:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
				>
					<svg
						class="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
						></path></svg
					>
					Download Image
				</button>
			</div>
		</div>
	{/if}

  {#if files.length > 0}
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800">Upload History</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {#each files as file, i}
          <button
          type="button"
          onclick={() => (activeFile = file)}
          class="relative aspect-square cursor-pointer overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <img
            src={file.dataURL}
            alt="Generated image {i + 1}"
            class="h-full w-full object-cover transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          />
        </button>
          {/each}
        </div>
      </section>
  {/if}

	{#if generatedImageHistoryFiles.length > 0}
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800">Generated History</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {#each generatedImageHistoryFiles as file, i}
          <button
          type="button"
          onclick={() => (activeFile = file)}
          class="relative aspect-square cursor-pointer overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <img
            src={file.dataURL}
            alt="Generated image {i + 1}"
            class="h-full w-full object-cover transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          />
        </button>
          {/each}
        </div>
      </section>
  {/if}
</div>

<style>
	@keyframes fadeInScale {
		0% {
			opacity: 0;
			transform: scale(0.9);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
	.animate-fade-in-scale {
		animation: fadeInScale 0.5s ease-out forwards;
	}
</style>
  