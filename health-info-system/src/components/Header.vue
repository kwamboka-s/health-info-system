<template>
  <header class="header">
    <NavBar />
    <Logo />
  </header>
</template>

<script>
import NavBar from './NavBar.vue';
import Logo from './Logo.vue';

export default {
  name: 'Header',
  components: {
    NavBar,
    Logo
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2ecc71; /* Green background */
  color: white;
  position: relative;
  z-index: 2;
}
</style>

