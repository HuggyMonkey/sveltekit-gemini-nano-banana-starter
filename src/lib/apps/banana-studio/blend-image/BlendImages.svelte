
<script lang="ts">
import { BlendImagesSvg } from "$lib/icons/svg";

type ImageFile = {
    file: File | null;
    name?: string;
    mimeType?: string;
    dataURL?: string;
    base64?: string;
};

let files = $state<ImageFile[]>([]); // multiple files
let prompt = $state('');

let loading = $state(false);
let errorMessage = $state('');

let activeFile = $state<ImageFile | null>(null);
let activeImageUrl = $derived(activeFile?.dataURL);

// UI state
let isDraggingOver = $state(false);

let generatedImageHistoryFiles: ImageFile[] = $state([]);


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

async function handleFilesChange(e: Event) {
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

  const newFiles = await Promise.all(promises);
  files = [...newFiles, ...files];
}

function onDragOver(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  isDraggingOver = true;
}

function onDragLeave(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  isDraggingOver = false;
}

async function onDrop(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  isDraggingOver = false;
  if (!e.dataTransfer) return;
  const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  if (!droppedFiles.length) return;
  const promises = droppedFiles.map(async (selected) => {
    const dataURL = await readFileAsDataURL(selected);
    return {
      file: selected,
      name: selected.name,
      mimeType: selected.type,
      dataURL,
      base64: dataURL.split(",")[1],
    } satisfies ImageFile;
  });
  const newFiles = await Promise.all(promises);
  files = [...newFiles, ...files];
}

function removeFile(index: number) {
  files = files.filter((_, i) => i !== index);
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

async function blendImages() {
    if (!files.length || !prompt) {
    errorMessage = "Please select at least one image and enter a prompt";
    return;
    }

    loading = true;
    activeFile = null;
    errorMessage = '';

    try {
    const imagesData = files
        .filter(f => f.base64 && f.mimeType)
        .map(f => ({
        base64Image: f.base64!,
        mimeType: f.mimeType!,
        }));

    const res = await fetch('/api/image/blend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, imagesData })
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        errorMessage = data.error || 'Failed to blend images';
        return;
    }

    // Binary image response
    const blob = await res.blob();
    const newFile = await blobToImageFile(blob, "generated.png");

    generatedImageHistoryFiles = [newFile, ...generatedImageHistoryFiles];
    activeFile = newFile;

    prompt = "";

    } catch (err) {
    console.error(err);
    errorMessage = 'Network or server error';
    } finally {
    loading = false;
    }
}

function handlePromptKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    if (!loading) blendImages();
  }
}

function downloadImage() {
  if (!activeImageUrl) return;
  const a = document.createElement('a');
  a.href = activeImageUrl;
  a.download = 'blended-image.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}




</script>

<div class="px-6 md:px-8 lg:px-12 xl:px-16">
  <div class="py-8 md:py-12 lg:py-16 space-y-8 md:space-y-12">
    <header class="space-y-2 flex flex-col items-center">
      <h1 class="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-900">
        <span class="inline-block align-middle">
          {@html BlendImagesSvg}
        </span>
        Image Blender
      </h1>
      <p class="text-gray-600">Upload multiple images, describe the blend, and generate.</p>
    </header>

    <!-- 2.1 Image Upload Area (Top) -->
    <section class="space-y-4">
      <div
        class={`border-2 border-dashed rounded-xl transition-colors p-6 md:p-8 ${isDraggingOver ? 'bg-blue-50 border-blue-600' : 'bg-gray-50 border-gray-300'} hover:bg-blue-50 hover:border-blue-600`}
        ondragover={onDragOver}
        ondragleave={onDragLeave}
        ondrop={onDrop}
        aria-label="Image upload area"
        role="region"
      >
        <div class="flex flex-col items-center justify-center text-center space-y-3">
          <div class="text-blue-600">
            <!-- Decorative upload icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path stroke-dasharray="20" stroke-dashoffset="20" d="M12 3l0 17.5">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0" />
                </path>
                <path stroke-dasharray="12" stroke-dashoffset="12" d="M12 21l7 -7M12 21l-7 -7">
                  <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="12;0" />
                </path>
              </g>
            </svg>
          </div>
          <div class="text-gray-700">
            <p class="font-medium">Drag & drop images here</p>
            <p class="text-sm text-gray-500">or</p>
          </div>
          <div>
            <label class="inline-flex items-center px-6 py-3 bg-white text-blue-900 border-2 border-blue-900 rounded-lg cursor-pointer hover:bg-blue-50 active:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors">
              <input type="file" accept="image/*" multiple onchange={handleFilesChange} class="hidden" />
              Browse Files
            </label>
          </div>
          <p class="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
        </div>
      </div>

      {#if files && files.length}
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {#each files as f, i}
            {#if f.dataURL}
              <div class="relative group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
                <img src={f.dataURL} alt={f.name} class="w-full h-32 object-cover" />
                <button class="absolute top-2 right-2 p-2 rounded-lg bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200 transition-colors" aria-label="Remove image" onclick={() => removeFile(i)}>
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
                <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent text-white text-xs px-2 py-1 truncate">{f.name}</div>
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </section>

    <!-- 2.2 Prompt Input & 2.3 Generate Blend Button -->
    <section class="space-y-4">
      <div class="p-6 md:p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
        <textarea
          placeholder="Describe how to blend the images..."
          bind:value={prompt}
          onkeydown={handlePromptKeydown}
          class="p-4 md:p-6 w-full rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all resize-y min-h-28"
        ></textarea>
        <div class="mt-6 flex gap-4 justify-center">
          <button
            class="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 active:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onclick={blendImages}
            disabled={loading}
          >
            {#if loading}
              <span class="inline-flex items-center gap-2">
                <svg class="w-5 h-5 animate-spin text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                Generating...
              </span>
            {:else}
              ✨ Generate Blend
            {/if}
          </button>
        </div>
      </div>

      {#if errorMessage}
        <div class="flex items-center text-red-700 bg-red-50 border border-red-200 p-4 rounded-lg">
          <svg class="w-5 h-5 mr-3 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v6h-2V7h2zm0 8v2h-2v-2h2z"/></svg>
          <span class="font-medium">{errorMessage}</span>
        </div>
      {/if}
   
    </section>

    <!-- 2.4 Preview / Output Area -->
    <section>
      <div class="p-8 md:p-12 lg:p-16">
        <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {#if activeImageUrl}
            <div class="space-y-4">
              <div class="relative overflow-hidden rounded-xl">
                <img src={activeImageUrl} alt="Blended result" class="w-full max-w-2xl mx-auto rounded-xl" />
              </div>
              <div class="flex gap-3 justify-center">
                <button class="bg-white text-blue-900 border-2 border-blue-900 px-6 py-3 rounded-lg hover:bg-blue-50 active:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
                 onclick={downloadImage}>
                  Download
                </button>
               
              </div>
            </div>
          {:else}
            <div class="text-center text-gray-500">
              <div class="mb-4 flex justify-center">
                <svg class="w-8 h-8 animate-pulse text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
              </div>
              <p>Your blended image will appear here</p>
            </div>
          {/if}
        </div>
      </div>
    </section>

    <!-- 2.5 Blend History / Gallery -->
    <section class="space-y-3">
      <h2 class="text-lg font-semibold text-gray-800">Blend History</h2>
      {#if generatedImageHistoryFiles.length}
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {#each generatedImageHistoryFiles as file}
            <button class="relative group rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <img src={file.dataURL} alt="Previous blend" class="w-full h-28 object-cover" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
            </button>
          {/each}
        </div>
      {:else}
        <p class="text-gray-500 text-sm">No blends generated yet.</p>
      {/if}
    </section>
  </div>
</div>
