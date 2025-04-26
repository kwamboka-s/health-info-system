<template>
  <div class="view services">
    <h1>Our Hospital Services</h1>
    <p>Select a service to learn more:</p>
    <div class="services-buttons">
      <button 
        v-for="service in services" 
        :key="service.name" 
        class="service-button" 
        @click="showServiceDetail(service)">
        {{ service.name }}
      </button>
    </div>
    <div v-if="selectedService" class="service-detail">
      <h2>{{ selectedService.name }}</h2>
      <p>{{ selectedService.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Services",
  data() {
    return {
      services: [
        {
          name: "Emergency",
          description: "24/7 emergency care for critical situations and urgent treatment."
        },
        {
          name: "Radiology",
          description: "Advanced diagnostic imaging services including X-rays, CT scans, and MRIs."
        },
        {
          name: "Surgery",
          description: "State-of-the-art surgical procedures performed by expert surgeons."
        },
        {
          name: "Laboratory",
          description: "Comprehensive lab tests and diagnostics with quick results."
        },
        {
          name: "Pharmacy",
          description: "Onsite pharmacy providing a wide range of essential medications."
        }
      ],
      selectedService: null
    };
  },
  methods: {
    showServiceDetail(service) {
      this.selectedService = service;
    }
  }
};
</script>

<style scoped>
.view {
  padding: 2rem;
  color: #333;
}

h1 {
  color: #2ecc71;
  margin-bottom: 1rem;
}

.services-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 2rem;
}

.service-button {
  background: white;
  color: #2ecc71;
  border: 2px solid #2ecc71;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.service-button:hover {
  background-color: #2ecc71;
  color: white;
}

.service-detail {
  background: #ecf0f1;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.service-detail h2 {
  margin-top: 0;
  color: #2ecc71;
}
</style>
