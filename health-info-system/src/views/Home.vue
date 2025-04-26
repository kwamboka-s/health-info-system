<template>
  <div class="view home">
    <h1>Welcome to Our Hospital</h1>
    <p>Discover our services below:</p>
    <HospitalServices />
  </div>
</template>

<script>
import HospitalServices from "@/components/HospitalServices.vue";

export default {
  name: "Home",
  components: {
    HospitalServices
  }
};
</script>

<style scoped>
.view {
  padding: 2rem;
}

h1 {
  color: #2ecc71;
  margin-bottom: 0.5rem;
}

p {
  color: #333;
  margin-bottom: 1.5rem;
}
</style>


<script>
export default {
  name: 'Home'
};
</script>
