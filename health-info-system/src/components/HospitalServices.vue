<template>
  <div class="hospital-services">
    <h2>Hospital Services</h2>
    <div class="services-buttons">
      <button 
        v-for="service in services" 
        :key="service.name" 
        class="service-button" 
        @click="selectService(service)">
        {{ service.name }}
      </button>
    </div>
    <div v-if="activeService" class="service-detail">
      <h3>{{ activeService.name }}</h3>
      <p>{{ activeService.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HospitalServices",
  data() {
    return {
      services: [
        {
          name: "Emergency",
          description:
            "24/7 emergency care for critical situations and urgent treatment."
        },
        {
          name: "Radiology",
          description:
            "Advanced diagnostic imaging services including X-rays, CT scans, and MRIs."
        },
        {
          name: "Surgery",
          description:
            "State-of-the-art surgical procedures performed by expert surgeons."
        },
        {
          name: "Laboratory",
          description:
            "Comprehensive lab tests and diagnostics with quick results."
        },
        {
          name: "Pharmacy",
          description:
            "Onsite pharmacy providing a wide range of essential medications."
        }
      ],
      activeService: null
    };
  },
  methods: {
    selectService(service) {
      this.activeService = service;
    }
  }
};
</script>

<style scoped>
.hospital-services {
  margin: 20px auto;
  padding: 20px;
  background: #ecf0f1;
  border-radius: 8px;
  max-width: 800px;
  text-align: center;
}

.services-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
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
  background: white;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.service-detail h3 {
  margin-top: 0;
  color: #2ecc71;
}
</style>
