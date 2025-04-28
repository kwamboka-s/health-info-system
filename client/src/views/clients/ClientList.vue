<template>
  <div class="client-list">
    <div class="page-header">
      <h1 class="page-title">Clients</h1>
      <div class="page-actions">
        <div class="search-container">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search clients..." 
            class="search-input"
            @input="handleSearch"
          />
        </div>
        <router-link v-if="isDoctor" to="/clients/new" class="btn btn-primary">Add New Client</router-link>
      </div>
    </div>
    
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading clients...</p>
    </div>
    
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-else-if="clients.length === 0" class="empty-state">
      <h3>No clients found</h3>
      <p v-if="searchQuery">No clients match your search criteria. Try a different search.</p>
      <p v-else>There are no clients in the system yet.</p>
      <router-link v-if="isDoctor" to="/clients/new" class="btn btn-primary">Add Your First Client</router-link>
    </div>
    
    <div v-else class="client-grid">
      <div v-for="client in clients" :key="client.id" class="client-card">
        <div class="client-card-header">
          <h3 class="client-name">{{ client.firstName }} {{ client.lastName }}</h3>
          <span v-if="client.status" :class="['status-badge', `status-${client.status.toLowerCase()}`]">
            {{ client.status }}
          </span>
        </div>
        
        <div class="client-card-body">
          <div class="client-info">
            <div v-if="client.email" class="info-item">
              <span class="info-label">Email:</span>
              <span class="info-value">{{ client.email }}</span>
            </div>
            <div v-if="client.phone" class="info-item">
              <span class="info-label">Phone:</span>
              <span class="info-value">{{ client.phone }}</span>
            </div>
            <div v-if="client.dateOfBirth" class="info-item">
              <span class="info-label">DOB:</span>
              <span class="info-value">{{ formatDate(client.dateOfBirth) }}</span>
            </div>
          </div>
        </div>
        
        <div class="client-card-footer">
          <router-link :to="`/clients/${client.id}`" class="btn btn-secondary">View Details</router-link>
          <button 
            v-if="isDoctor" 
            class="btn btn-primary"
            @click="goToEnroll(client.id)"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'ClientList',
  setup() {
    const store = useStore()
    const router = useRouter()
    const searchQuery = ref('')
    const searchTimeout = ref(null)
    
    // Access store state
    const clients = computed(() => store.getters['clients/clients'])
    const loading = computed(() => store.getters['clients/isLoading'])
    const error = computed(() => store.getters['clients/error'])
    const isDoctor = computed(() => store.getters['auth/isDoctor'])
    
    // Load clients on mount
    onMounted(() => {
      store.dispatch('clients/getAllClients')
    })
    
    // Search with debounce
    const handleSearch = () => {
      clearTimeout(searchTimeout.value)
      searchTimeout.value = setTimeout(() => {
        if (searchQuery.value.trim()) {
          store.dispatch('clients/searchClients', searchQuery.value)
        } else {
          store.dispatch('clients/getAllClients')
        }
      }, 300)
    }
    
    // Format date helper
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString()
    }
    
    // Navigate to enrollment form with client pre-selected
    const goToEnroll = (clientId) => {
      router.push({ 
        path: '/enroll',
        query: { client: clientId }
      })
    }
    
    return {
      clients,
      loading,
      error,
      searchQuery,
      isDoctor,
      handleSearch,
      formatDate,
      goToEnroll
    }
  }
}
</script>

<style scoped>
.client-list {
  padding: 1rem 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  margin: 0;
  color: var(--primary-color);
  font-size: 2rem;
}

.page-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-container {
  position: relative;
}

.search-input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  min-width: 250px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--light-text);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-state h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.empty-state p {
  margin-bottom: 1.5rem;
  color: var(--light-text);
}

.client-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.client-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.client-card-header {
  padding: 1.25rem;
  background-color: rgba(74, 111, 165, 0.05);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client-name {
  margin: 0;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-active {
  background-color: rgba(46, 204, 113, 0.1);
  color: #27ae60;
}

.status-inactive {
  background-color: rgba(231, 76, 60, 0.1);
  color: #c0392b;
}

.client-card-body {
  padding: 1.25rem;
  flex-grow: 1;
}

.client-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
}

.info-label {
  color: var(--light-text);
  font-weight: 500;
}

.client-card-footer {
  padding: 1.25rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .page-actions {
    width: 100%;
  }
  
  .search-input {
    width: 100%;
  }
}
</style>