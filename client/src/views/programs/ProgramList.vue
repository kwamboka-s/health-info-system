<template>
  <div class="program-list">
    <div class="page-header">
      <h1 class="page-title">Healthcare Programs</h1>
      <div class="page-actions">
        <router-link v-if="isDoctor" to="/programs/new" class="btn btn-primary">
          Create New Program
        </router-link>
      </div>
    </div>
    
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading programs...</p>
    </div>
    
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-else-if="programs.length === 0" class="empty-state">
      <h3>No programs found</h3>
      <p>There are no healthcare programs in the system yet.</p>
      <router-link v-if="isDoctor" to="/programs/new" class="btn btn-primary">
        Create Your First Program
      </router-link>
    </div>
    
    <div v-else>
      <div class="category-filters" v-if="categories.length > 0">
        <button 
          class="category-filter" 
          :class="{ 'active': activeCategory === 'all' }"
          @click="setActiveCategory('all')"
        >
          All Programs
        </button>
        <button 
          v-for="category in categories" 
          :key="category"
          class="category-filter" 
          :class="{ 'active': activeCategory === category }"
          @click="setActiveCategory(category)"
        >
          {{ category }}
        </button>
      </div>
      
      <div class="program-grid">
        <div v-for="program in filteredPrograms" :key="program.id" class="program-card">
          <div class="program-card-header">
            <h3 class="program-name">{{ program.name }}</h3>
            <span v-if="program.category" class="category-badge">
              {{ program.category }}
            </span>
          </div>
          
          <div class="program-card-body">
            <p class="program-description">{{ truncateDescription(program.description) }}</p>
            
            <div class="program-meta">
              <div class="meta-item">
                <span class="meta-label">Duration:</span>
                <span class="meta-value">{{ program.duration || 'Flexible' }}</span>
              </div>
              
              <div class="meta-item">
                <span class="meta-label">Status:</span>
                <span class="meta-value" :class="getStatusClass(program.status)">
                  {{ program.status || 'Active' }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="program-card-footer">
            <router-link :to="`/programs/${program.id}`" class="btn btn-secondary">
              View Details
            </router-link>
            <button 
              v-if="isDoctor" 
              class="btn btn-primary"
              @click="goToEnroll(program.id)"
            >
              Enroll Client
            </button>
          </div>
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
  name: 'ProgramList',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    // Access store state
    const programs = computed(() => store.getters['programs/programs'])
    const loading = computed(() => store.getters['programs/isLoading'])
    const error = computed(() => store.getters['programs/error'])
    const isDoctor = computed(() => store.getters['auth/isDoctor'])
    
    // Category filter
    const activeCategory = ref('all')
    const categories = computed(() => {
      const uniqueCategories = new Set(
        programs.value
          .map(program => program.category)
          .filter(category => category)
      )
      return Array.from(uniqueCategories)
    })
    
    // Filtered programs based on category
    const filteredPrograms = computed(() => {
      if (activeCategory.value === 'all') {
        return programs.value
      } else {
        return programs.value.filter(program => program.category === activeCategory.value)
      }
    })
    
    // Load programs on mount
    onMounted(() => {
      store.dispatch('programs/getAllPrograms')
    })
    
    // Function to set active category
    const setActiveCategory = (category) => {
      activeCategory.value = category
    }
    
    // Function to truncate description text
    const truncateDescription = (text) => {
      if (!text) return 'No description available.'
      return text.length > 120 ? text.substring(0, 120) + '...' : text
    }
    
    // Function to get status class
    const getStatusClass = (status) => {
      if (!status) return ''
      return `status-${status.toLowerCase()}`
    }
    
    // Navigate to enrollment form with program pre-selected
    const goToEnroll = (programId) => {
      router.push({ 
        path: '/enroll',
        query: { program: programId }
      })
    }
    
    return {
      programs,
      loading,
      error,
      isDoctor,
      activeCategory,
      categories,
      filteredPrograms,
      setActiveCategory,
      truncateDescription,
      getStatusClass,
      goToEnroll
    }
  }
}
</script>

<style scoped>
.program-list {
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

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.category-filter {
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.category-filter.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.category-filter:hover:not(.active) {
  background-color: rgba(0, 0, 0, 0.05);
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.program-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.program-card-header {
  padding: 1.25rem;
  background-color: rgba(74, 111, 165, 0.05);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.program-name {
  margin: 0;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--dark-text);
}

.program-card-body {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.program-description {
  margin-top: 0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
}

.program-meta {
  margin-top: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.8rem;
  color: var(--light-text);
  margin-bottom: 0.25rem;
}

.meta-value {
  font-weight: 500;
}

.status-active {
  color: #27ae60;
}

.status-inactive {
  color: #c0392b;
}

.status-pending {
  color: #d35400;
}

.program-card-footer {
  padding: 1.25rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
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

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .program-meta {
    grid-template-columns: 1fr;
  }
}
</style>