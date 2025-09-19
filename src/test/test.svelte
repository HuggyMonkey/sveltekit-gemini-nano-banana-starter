

<body>
  <!-- ========================================================= -->
  <!-- TOP BAR: Contains app branding, menu toggle, search, global actions -->
  <!-- Movement: Sidebar toggle collapses/expands. Search expands on focus. -->
  <!-- Interaction: Click icons, type in search, hover shows tooltips -->
  <!-- ========================================================= -->
  <header>
    <!-- Menu Toggle [☰] -->
    <!-- App Title: IMAGE STUDIO APP -->
    <!-- Global Search Bar -->
    <!-- Global Actions: Help, Settings, Notifications -->
  </header>

  <!-- ========================================================= -->
  <!-- APP LAYOUT CONTAINER: Holds sidebar + main content -->
  <!-- ========================================================= -->
  <div class="app-layout">
    
    <!-- ======================================================= -->
    <!-- SIDEBAR: Collapsible panel with sub-app navigation list -->
    <!-- Purpose: Switch between different sub-apps -->
    <!-- Movement: Collapsible (slide animation), tooltips on hover -->
    <!-- Interaction: Click to load sub-app -->
    <!-- ======================================================= -->
    <aside class="sidebar">
      
      <!-- SUB APP PANEL -->
      <!-- Example items with icon + label -->
      <!-- Active item is highlighted (">" or background color) -->
      <nav class="sub-app-panel">
        <!-- > Dashboard [🏠] -->
        <!-- - Generator [✨] -->
        <!-- - Editor [✏️] -->
        <!-- - Blender [🎨] -->
        <!-- - Background Remover [🪄] -->
        <!-- - Style Transfer [🖌️] -->
      </nav>

      <!-- ===================================================== -->
      <!-- PROFILE AREA: Fixed at bottom-left of sidebar -->
      <!-- Elements: Thumbnail [o], username/email, dropdown menu ▼ -->
      <!-- Movement: Dropdown menu fades in/out -->
      <!-- Interaction: Click to expand menu, hover highlights area -->
      <!-- ===================================================== -->
      <div class="profile-area">
        <!-- [ o ] Profile Thumbnail -->
        <!-- Username / Email -->
        <!-- ▼ Dropdown menu for Profile / Settings / Logout -->
      </div>
    </aside>

    <!-- ======================================================= -->
    <!-- MAIN CONTENT AREA: Displays the currently active sub-app -->
    <!-- Purpose: Container only (sub-apps define their own layout) -->
    <!-- Movement: Fade in/out or slide when switching sub-apps -->
    <!-- ======================================================= -->
    <main class="main-content">
      <!-- SUB APP INTERFACE WILL LOAD HERE -->
    </main>

  </div>
</body>
