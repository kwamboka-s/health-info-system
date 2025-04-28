<template>
  <div class="dashboard">
    <h1 class="page-title">Dashboard</h1>
    
    <div class="dashboard-welcome">
      <h2>Welcome, {{ userName }}</h2>
      <p class="welcome-message">
        Here's an overview of your healthcare management system.
      </p>
    </div>
    
    <div class="dashboard-stats">
      <div class="stat-card">
        <h3>Clients</h3>
        <div class="stat-value">{{ clientCount }}</div>
        <div class="stat-actions">
          <router-link to="/clients" class="btn btn-secondary">View All</router-link>
          <router-link v-if="isDoctor" to="/clients/new" class="btn btn-primary">Add New</router-link>
        </div>
      </div>
      
      <div class="stat-card">
        <h3>Programs</h3>
        <div class="stat-value">{{ programCount }}</div>
        <div class="stat-actions">
          <router-link to="/programs" class="btn btn-secondary">View All</router-link>
          <router-link v-if="isDoctor" to="/programs/new" class="btn btn-primary">Add New</router-link>
        </div>
      </div>
      
      <div class="stat-card">
        <h3>Enrollments</h3>
        <div class="stat-value">{{ enrollmentCount }}</div>
        <div class="stat-actions">
          <router-link v-if="isDoctor" to="/enroll" class="btn btn-primary">Enroll Client</router-link>
        </div>
      </div>
    </div>
    
    <div class="dashboard-sections">
      <div class="dashboard-section">
        <h2>Recent Clients</h2>
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="clients.length === 0" class="empty-state">
          No clients available.
        </div>
        <table v-else class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in recentClients" :key="client.id">
              <td>{{ client.firstName }} {{ client.lastName }}</td>
              <td>{{ client.email || 'N/A' }}</td>
              <td>{{ client.status || 'Active' }}</td>
              <td>
                <router-link :to="'/clients/' + client.id" class="btn btn-secondary btn-sm">View</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="dashboard-section">
        <h2>Recent Programs</h2>
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="programs.length === 0" class="empty-state">
          No programs available.
        </div>
        <table v-else class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="program in recentPrograms" :key="program.id">
              <td>{{ program.name }}</td>
              <td>{{ program.category || 'N/A' }}</td>
              <td>{{ program.status || 'Active' }}</td>
              <td>
                <router-link :to="'/programs/' + program.id" class="btn btn-secondary btn-sm">View</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomeView',
  setup() {
    const store = useStore()
    const loading = ref(true)
    
    // Get current user
    const user = computed(() => store.getters['auth/user'])
    const userName = computed(() => {
      if (user.value?.fullName) {
        return user.value.fullName
      }
      return user.value?.username || 'User'
    })
    const isDoctor = computed(() => store.getters['auth/isDoctor'])
    
    // Data references
    const clients = computed(() => store.getters['clients/clients'])
    const programs = computed(() => store.getters['programs/programs'])
    const enrollments = computed(() => store.getters['enrollments/enrollments'])
    
    // Computed stats
    const clientCount = computed(() => clients.value.length)
    const programCount = computed(() => programs.value.length)
    const enrollmentCount = computed(() => enrollments.value.length)
    
    // Recent items (limited to 5)
    const recentClients = computed(() => {
      return clients.value.slice(0, 5)
    })
    
    const recentPrograms = computed(() => {
      return programs.value.slice(0, 5)
    })
    
    // Fetch data
    onMounted(async () => {
      loading.value = true
      try {
        await Promise.all([
          store.dispatch('clients/getAllClients'),
          store.dispatch('programs/getAllPrograms'),
          store.dispatch('enrollments/getAllEnrollments')
        ])
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        loading.value = false
      }
    })
    
    return {
      loading,
      userName,
      isDoctor,
      clients,
      programs,
      enrollments,
      clientCount,
      programCount,
      enrollmentCount,
      recentClients,
      recentPrograms
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 1rem 0;
}

.page-title {
  margin-bottom: 2rem;
  color: var(--primary-color);
  font-size: 2rem;
}

.dashboard-welcome {
  margin-bottom: 2rem;
}

.dashboard-welcome h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.welcome-message {
  color: var(--light-text);
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.stat-card h3 {
  color: var(--primary-color);
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.stat-actions {
  display: flex;
  gap: 0.5rem;
}

.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.dashboard-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.dashboard-section h2 {
  color: var(--primary-color);
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.loading {
  text-align: center;
  padding: 1rem;
  color: var(--light-text);
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--light-text);
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 4px;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .dashboard-sections {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 767px) {
  .dashboard-stats {
    grid-template-columns: 1fr;
  }
}
</style>