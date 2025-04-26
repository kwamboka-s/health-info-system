<template>
  <div class="app">
    <!-- Blurred background layer -->
    <div class="background-image"></div>

    <!-- Header with navigation buttons and logo -->
    <header class="header">
      <nav class="nav-buttons">
        <button 
          class="nav-button" 
          v-for="(btn, index) in navButtons" 
          :key="index">
          {{ btn.label }}
        </button>
      </nav>
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
    </header>

    <!-- Main content area (if needed) -->
    <main class="content">
      <h1>Welcome to Our Site</h1>
      <p>This is a sample one-page Vue app with a blurred background image.</p>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      navButtons: [
        { label: "Home" },
        { label: "About" },
        { label: "Services" },
        { label: "Contact" },
        { label: "Blog" }
      ]
    };
  }
};
</script>

<style scoped>
/* Ensure the app container covers the whole viewport */
.app {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* Background image with blur */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: url('/workspaces/health-info-system/health-info-system/src/assets/logo.png') center center / cover no-repeat;
  filter: blur(8px);
  z-index: -1;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

/* Navigation buttons container styling */
.nav-buttons {
  display: flex;
  gap: 15px;
}

/* Button styling */
.nav-button {
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 1);
}

/* Logo styling: placed at the top right */
.logo img {
  width: 100px; /* Adjust size as needed */
  height: auto;
}

/* Main content styling */
.content {
  position: relative;
  z-index: 1;
  padding: 40px;
  text-align: center;
  color: white;
}
</style>
