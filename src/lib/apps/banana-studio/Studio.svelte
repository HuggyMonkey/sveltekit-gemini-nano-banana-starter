<script>
    import BlendImages from "$lib/apps/banana-studio/blend-image/BlendImages.svelte";
    import ImageGenerator from "$lib/apps/banana-studio/image-generator/ImageGenerator.svelte";
    import ImageEditor from "$lib/apps/banana-studio/image-editor/ImageEditor.svelte";
    import Landing from "$lib/apps/banana-studio/landing/Landing.svelte";

    import { ImageGeneratorSvg, ImageEditorSvg, BlendImagesSvg } from "$lib/icons/svg";


    
  let sidebarCollapsed = $state(false);
  let profileMenuOpen = $state(false);

  let apps = $state([
    { id: "generator", name: "Generator", component: ImageGenerator, icon: ImageGeneratorSvg },
    { id: "editor", name: "Editor", component: ImageEditor, icon: ImageEditorSvg },
    { id: "blender", name: "Blender", component: BlendImages, icon: BlendImagesSvg },
  ]);

  let currentID = $state("landing");
  let currentApp = $derived(apps.find(app => app.id === currentID));



  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
  }

  function toggleProfileMenu() {
    profileMenuOpen = !profileMenuOpen;
  }

  
</script>

<div class="studio bg-gray-50 min-h-screen">
  <!-- Top Bar -->
  <header class=" bg-white border-b border-gray-200 shadow-sm">
    <div class="flex items-center justify-between px-4 py-3">
      <!-- Left side: Menu toggle + App title -->
      <div class="flex items-center space-x-4">
        <button class=" p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer" aria-label="Toggle menu" onclick={toggleSidebar}>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <h1 class=" text-xl font-bold text-gray-900 flex items-center gap-2">
          <!-- Banana SVG before -->
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
            <g fill="none">
                <path fill="#ffef5e" d="M16.655 6.9c.647-2.24 1.8-2.75 3.415-3.634a.98.98 0 0 1 1.038.063A4.35 4.35 0 0 1 23 6.901C23 27.444-.235 23.898 1.052 20.035S12.445 21.483 16.655 6.9" />
                <path fill="#fff9bf" d="M16.656 6.9C12.574 21.043 2.944 16.476 1.19 19.71c5.868 1.79 19.31.107 19.31-15.523a4.3 4.3 0 0 0-.127-1.021a1 1 0 0 0-.304.1c-1.613.885-2.766 1.394-3.413 3.635" />
                <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M16.655 6.9c.647-2.24 1.8-2.75 3.415-3.634a.98.98 0 0 1 1.038.063A4.35 4.35 0 0 1 23 6.901C23 27.444-.235 23.898 1.052 20.035S12.445 21.483 16.655 6.9" stroke-width="1" />
                <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M3.983 20.46c3.298.111 8.65-.5 12.021-4.973c2.95-3.915 3.8-6.687 4.025-8.214M20.61 1v2.151" stroke-width="1" />
            </g>
        </svg>
          BANANA STUDIO
          <!-- Banana SVG after -->
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
            <g fill="none">
                <path fill="#ffef5e" d="M16.655 6.9c.647-2.24 1.8-2.75 3.415-3.634a.98.98 0 0 1 1.038.063A4.35 4.35 0 0 1 23 6.901C23 27.444-.235 23.898 1.052 20.035S12.445 21.483 16.655 6.9" />
                <path fill="#fff9bf" d="M16.656 6.9C12.574 21.043 2.944 16.476 1.19 19.71c5.868 1.79 19.31.107 19.31-15.523a4.3 4.3 0 0 0-.127-1.021a1 1 0 0 0-.304.1c-1.613.885-2.766 1.394-3.413 3.635" />
                <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M16.655 6.9c.647-2.24 1.8-2.75 3.415-3.634a.98.98 0 0 1 1.038.063A4.35 4.35 0 0 1 23 6.901C23 27.444-.235 23.898 1.052 20.035S12.445 21.483 16.655 6.9" stroke-width="1" />
                <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M3.983 20.46c3.298.111 8.65-.5 12.021-4.973c2.95-3.915 3.8-6.687 4.025-8.214M20.61 1v2.151" stroke-width="1" />
            </g>
        </svg>
        </h1>
      </div>
      
      <!-- Right side: Search + Help -->
      <div class="flex items-center space-x-3">
        <form class="flex items-center" role="search" aria-label="Global search">
          <label for="studio-search" class="sr-only">Search</label>
          <input 
            id="studio-search" 
            name="q" 
            type="search" 
            placeholder="🔍 Search" 
            class="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-200 text-sm" 
          />
        </form>
        <button class=" p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer" aria-label="Help and settings">
          <!-- Lucide "Help Circle" icon -->
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 1 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12" y2="17"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Body -->
  <div class=" flex">
    <!-- Left Sidebar -->
    <aside class="studio__sidebar bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out {sidebarCollapsed ? 'w-20' : 'w-64'} hidden md:block" aria-label="Sub app navigation">
      <!-- Sub App Navigation -->
      <nav class=" p-4" aria-label="Sub apps">
        <ul class="space-y-4">
            {#each apps as app}
            {@const id = app.id}
          <li>
            <button type="button" class="{currentID === id ? 'sidebar__link is-active' : 'sidebar__link'} w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
            onclick={() => currentID = app.id}>
              <span class=" mr-2 inline-flex items-center justify-center">
                {@html app.icon}
            </span>
              <span class=" {sidebarCollapsed ? 'hidden' : ''}">{app.name}</span>
            </button>
          </li>
          {/each}
        </ul>
      </nav>

      <!-- Profile Section -->
      <section class=" border-t border-gray-200 p-4" aria-label="Profile">
        <button type="button" class="profile__summary flex items-center w-full hover:bg-gray-50 rounded-lg p-2 transition-all duration-200 cursor-pointer" onclick={toggleProfileMenu}>
          <div class=" w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm mr-3">U</div>
          <span class=" text-gray-700 font-medium text-sm flex-1 {sidebarCollapsed ? 'hidden' : ''}">username@email</span>
          <svg class=" w-4 h-4 text-gray-500 transition-transform duration-200 {sidebarCollapsed ? 'hidden' : ''}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        <!-- Profile Menu -->
        <nav class=" mt-2 bg-white rounded-lg shadow-md border border-gray-200 p-2 {sidebarCollapsed ? 'hidden' : ''}" aria-label="Profile menu" class:block={profileMenuOpen} class:hidden={!profileMenuOpen}>
          <ul class="space-y-1">
            <li>
              <button type="button" class="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 16 16">
                    <path fill="currentColor" fill-rule="evenodd" d="M8 14.5a6.47 6.47 0 0 0 3.25-.87V11.5A2.25 2.25 0 0 0 9 9.25H7a2.25 2.25 0 0 0-2.25 2.25v2.13A6.47 6.47 0 0 0 8 14.5m4.75-3v.937a6.5 6.5 0 1 0-9.5 0V11.5a3.75 3.75 0 0 1 2.486-3.532a3 3 0 1 1 4.528 0A3.75 3.75 0 0 1 12.75 11.5M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M9.5 6a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0" clip-rule="evenodd" />
                </svg>
                <span class="ml-2">Profile</span>
              </button>
            </li>
            <li>
              <button type="button" class="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                    <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M12 8.25a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0" />
                        <path d="M11.975 1.25c-.445 0-.816 0-1.12.02a2.8 2.8 0 0 0-.907.19a2.75 2.75 0 0 0-1.489 1.488c-.145.35-.184.72-.2 1.122a.87.87 0 0 1-.415.731a.87.87 0 0 1-.841-.005c-.356-.188-.696-.339-1.072-.389a2.75 2.75 0 0 0-2.033.545a2.8 2.8 0 0 0-.617.691c-.17.254-.356.575-.578.96l-.025.044c-.223.385-.408.706-.542.98c-.14.286-.25.568-.29.88a2.75 2.75 0 0 0 .544 2.033c.231.301.532.52.872.734a.87.87 0 0 1 .426.726a.87.87 0 0 1-.426.726c-.34.214-.64.433-.872.734a2.75 2.75 0 0 0-.545 2.033c.041.312.15.594.29.88c.135.274.32.595.543.98l.025.044c.222.385.408.706.578.96c.177.263.367.5.617.69a2.75 2.75 0 0 0 2.033.546c.376-.05.716-.2 1.072-.389a.87.87 0 0 1 .84-.005a.86.86 0 0 1 .417.731c.015.402.054.772.2 1.122a2.75 2.75 0 0 0 1.488 1.489c.29.12.59.167.907.188c.304.021.675.021 1.12.021h.05c.445 0 .816 0 1.12-.02c.318-.022.617-.069.907-.19a2.75 2.75 0 0 0 1.489-1.488c.145-.35.184-.72.2-1.122a.87.87 0 0 1 .415-.732a.87.87 0 0 1 .841.006c.356.188.696.339 1.072.388a2.75 2.75 0 0 0 2.033-.544c.25-.192.44-.428.617-.691c.17-.254.356-.575.578-.96l.025-.044c.223-.385.408-.706.542-.98c.14-.286.25-.569.29-.88a2.75 2.75 0 0 0-.544-2.033c-.231-.301-.532-.52-.872-.734a.87.87 0 0 1-.426-.726c0-.278.152-.554.426-.726c.34-.214.64-.433.872-.734a2.75 2.75 0 0 0 .545-2.033a2.8 2.8 0 0 0-.29-.88a18 18 0 0 0-.543-.98l-.025-.044a18 18 0 0 0-.578-.96a2.8 2.8 0 0 0-.617-.69a2.75 2.75 0 0 0-2.033-.546c-.376.05-.716.2-1.072.389a.87.87 0 0 1-.84.005a.87.87 0 0 1-.417-.731c-.015-.402-.054-.772-.2-1.122a2.75 2.75 0 0 0-1.488-1.489c-.29-.12-.59-.167-.907-.188c-.304-.021-.675-.021-1.12-.021zm-1.453 1.595c.077-.032.194-.061.435-.078c.247-.017.567-.017 1.043-.017s.796 0 1.043.017c.241.017.358.046.435.078c.307.127.55.37.677.677c.04.096.073.247.086.604c.03.792.439 1.555 1.165 1.974s1.591.392 2.292.022c.316-.167.463-.214.567-.227a1.25 1.25 0 0 1 .924.247c.066.051.15.138.285.338c.139.206.299.483.537.895s.397.69.506.912c.107.217.14.333.15.416a1.25 1.25 0 0 1-.247.924c-.064.083-.178.187-.48.377c-.672.422-1.128 1.158-1.128 1.996s.456 1.574 1.128 1.996c.302.19.416.294.48.377c.202.263.29.595.247.924c-.01.083-.044.2-.15.416c-.109.223-.268.5-.506.912s-.399.689-.537.895c-.135.2-.219.287-.285.338a1.25 1.25 0 0 1-.924.247c-.104-.013-.25-.06-.567-.227c-.7-.37-1.566-.398-2.292.021s-1.135 1.183-1.165 1.975c-.013.357-.046.508-.086.604a1.25 1.25 0 0 1-.677.677c-.077.032-.194.061-.435.078c-.247.017-.567.017-1.043.017s-.796 0-1.043-.017c-.241-.017-.358-.046-.435-.078a1.25 1.25 0 0 1-.677-.677c-.04-.096-.073-.247-.086-.604c-.03-.792-.439-1.555-1.165-1.974s-1.591-.392-2.292-.022c-.316.167-.463.214-.567.227a1.25 1.25 0 0 1-.924-.247c-.066-.051-.15-.138-.285-.338a17 17 0 0 1-.537-.895c-.238-.412-.397-.69-.506-.912c-.107-.217-.14-.333-.15-.416a1.25 1.25 0 0 1 .247-.924c.064-.083.178-.187.48-.377c.672-.422 1.128-1.158 1.128-1.996s-.456-1.574-1.128-1.996c-.302-.19-.416-.294-.48-.377a1.25 1.25 0 0 1-.247-.924c.01-.083.044-.2.15-.416c.109-.223.268-.5.506-.912s.399-.689.537-.895c.135-.2.219-.287.285-.338a1.25 1.25 0 0 1 .924-.247c.104.013.25.06.567.227c.7.37 1.566.398 2.292-.022c.726-.419 1.135-1.182 1.165-1.974c.013-.357.046-.508.086-.604c.127-.307.37-.55.677-.677" />
                    </g>
                </svg>
                <span class="ml-2">Settings</span>
              </button>
            </li>
            <li>
              <button type="button" class="w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 1024 1024">
                    <path fill="currentColor" d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8c-7 8.5-14.5 16.7-22.4 24.5a353.8 353.8 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.8 353.8 0 0 1-112.7-75.9a353.3 353.3 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8s94.3 9.3 137.9 27.8c42.2 17.8 80.1 43.4 112.7 75.9c7.9 7.9 15.3 16.1 22.4 24.5c3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82C271.7 82.6 79.6 277.1 82 516.4C84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7c3.4-5.3-.4-12.3-6.7-12.3m88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6" stroke-width="25.5" stroke="currentColor" />
                </svg>
                <span class="ml-2">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </aside>

    <!-- Main Content Area -->
    <main class="studio__main flex-1 p-4 md:p-6" aria-live="polite">
      <div class="main__content-placeholder bg-white rounded-lg shadow-sm border border-gray-200 p-8" aria-label="Active sub app area">
        <!-- Sub App will load here... -->
        <div class="text-center py-12">
            {#if currentID === "landing"}
                <Landing />
            {:else}
                {#if currentApp}
                    <currentApp.component />
                {/if}
            {/if}
        </div>
      </div>
    </main>
  </div>
</div>

