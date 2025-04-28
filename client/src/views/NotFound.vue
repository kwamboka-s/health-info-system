<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>We couldn't find the page you're looking for.</p>
      <router-link to="/" class="btn btn-primary">Go to Dashboard</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.not-found-content {
  max-width: 400px;
  padding: 2rem;
}

.not-found h1 {
  font-size: 6rem;
  color: var(--primary-color);
  margin: 0;
  line-height: 1;
}

.not-found h2 {
  font-size: 2rem;
  margin: 1rem 0;
}

.not-found p {
  margin-bottom: 2rem;
  color: var(--light-text);
}
</style>