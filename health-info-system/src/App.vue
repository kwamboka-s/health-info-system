<template>
  <div class="app">
    <!-- Blurred background image -->
    <BackgroundImage />

    <!-- Header including navigation and logo -->
    <Header />

    <!-- Main area where view components are rendered -->
    <main class="content">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import BackgroundImage from "./components/BackgroundImage.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    BackgroundImage,
    Header,
    Footer
  }
};
</script>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  background: #ffffff;
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 1;
  padding: 40px;
  text-align: center;
  color: #333;
}
</style>
