<template>
  <nav class="nav-buttons">
    <router-link
      v-for="(btn, index) in navButtons"
      :key="index"
      :to="btn.path"
      class="nav-button"
    >
      {{ btn.label }}
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      navButtons: [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Contact', path: '/contact' },
        { label: 'Blog', path: '/blog' }
      ]
    };
  }
};
</script>

<style scoped>
.nav-buttons {
  display: flex;
  gap: 15px;
}
.nav-button {
  padding: 10px 15px;
  background: white;
  color: #2ecc71;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
  font-weight: bold;
}
.nav-button:hover {
  background-color: #ecf0f1;
}
</style>

