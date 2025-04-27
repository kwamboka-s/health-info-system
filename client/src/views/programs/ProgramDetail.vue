<template>
  <div class="program-detail">
    <div class="page-header">
      <div class="header-title">
        <router-link to="/programs" class="back-link">
          &larr; Back to Programs
        </router-link>
        <h1 v-if="program" class="page-title">{{ program.name }}</h1>
        <h1 v-else class="page-title">Program Details</h1>
      </div>
      
      <div class="page-actions" v-if="program && isDoctor">
        <button class="btn btn-primary" @click="goToEnroll">Enroll Client</button>
      </div>
    </div>
    
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading program details...</p>
    </div>
    
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-else-if="!program" class="alert alert-warning">
      Program not found or has been removed.
    </div>
    
    <div v-else class="program-content">
      <div class="program-info-section">
        <div class="card">
          <div class="card-header">
            <h2>Program Information</h2>
            <span v-if="program.category" class="category-badge">
              {{ program.category }}
            </span>
          </div>
          <div class="card-body">
            <div class="program-description">
              <p v-if="program.description">{{ program.description }}</p>
              <p v-else class="text-muted">No description available.</p>
            </div>
            
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Duration</span>
                <span class="info-value">{{ program.duration || 'Flexible' }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Status</span>
                <span class="info-value status-badge" :class="statusClass">
                  {{ program.status || 'Active' }}
                </span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Created By</span>
                <span class="info-value">{{ program.createdBy || 'Unknown' }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Created Date</span>
                <span class="info-value">{{ formatDate(program.createdAt) || 'Unknown' }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card" v-if="program.resources && program.resources.length > 0">
          <div class="card-header">
            <h2>Program Resources</h2>
          </div>
          <div class="card-body">
            <ul class="resource-list">
              <li v-for="(resource, index) in program.resources" :key="index" class="resource-item">
                <a :href="resource.url" target="_blank" class="resource-link">
                  {{ resource.title || resource.url }}
                </a>
                <p v-if="resource.description" class="resource-description">
                  {{ resource.description }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="program-enrollments-section">
        <div class="card">
          <div class="card-header">
            <h2>Client Enrollments</h2>
          </div>
          <div class="card-body">
            <div v-if="loadingEnrollments" class="loading-container">
              <div class="loading-spinner"></div>
              <p>Loading enrollments...</p>
            </div>
            
            <div v-else-if="!isDoctor" class="access-restricted">
              <p>Only doctors can view client enrollment information.</p>
            </div>
            
            <div v-else-if="enrollments.length === 0" class="empty-state">
              <p>No clients are enrolled in this program yet.</p>
              <button class="btn btn-primary" @click="goToEnroll">Enroll a Client</button>
            </div>
            
            <div v-else>
              <div v-for="enrollment in enrollments" :key="enrollment.id" class="enrollment-item">
                <div class="enrollment-header">
                  <h3>{{ getClientName(enrollment.clientId) }}</h3>
                  <span class="status-badge" :class="getEnrollmentStatusClass(enrollment.status)">
                    {{ enrollment.status || 'Active' }}
                  </span>
                </div>
                <div class="enrollment-details">
                  <div class="enrollment-detail">
                    <span class="detail-label">Enrolled On</span>
                    <span class="detail-value">{{ formatDate(enrollment.enrolledAt) }}</span>
                  </div>
                  
                  <div v-if="enrollment.completedAt" class="enrollment-detail">
                    <span class="detail-label">Completed On</span>
                    <span class="detail-value">{{ formatDate(enrollment.completedAt) }}</span>
                  </div>
                </div>
                <div v-if="enrollment.notes" class="enrollment-notes">
                  <p>{{ enrollment.notes }}</p>
                </div>
                <div class="enrollment-actions">
                  <router-link :to="`/clients/${enrollment.clientId}`" class="btn btn-secondary btn-sm">
                    View Client
                  </router-link>
                </div>
              </div>
            </div>
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
  name: 'ProgramDetail',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    
    // Program data
    const loading = computed(() => store.getters['programs/isLoading'])
    const error = computed(() => store.getters['programs/error'])
    const program = computed(() => store.getters['programs/currentProgram'])
    
    // Enrollment data
    const loadingEnrollments = ref(false)
    const enrollments = ref([])
    
    // User permissions
    const isDoctor = computed(() => store.getters['auth/isDoctor'])
    
    // Clients for reference
    const clients = computed(() => store.getters['clients/clients'])
    
    // Computed properties
    const statusClass = computed(() => {
      if (!program.value || !program.value.status) return 'status-active'
      return `status-${program.value.status.toLowerCase()}`
    })
    
    // Load program data
    onMounted(async () => {
      // Load program details
      await store.dispatch('programs/getProgramById', props.id)
      
      // If program exists and user is a doctor, load clients and enrollments
      if (program.value && isDoctor.value) {
        // Load all clients for reference
        store.dispatch('clients/getAllClients')
        
        // Load program enrollments
        loadingEnrollments.value = true
        try {
          const programEnrollments = await store.dispatch('enrollments/getProgramEnrollments', props.id)
          enrollments.value = programEnrollments
        } catch (error) {
          console.error('Failed to load enrollments:', error)
        } finally {
          loadingEnrollments.value = false
        }
      }
    })
    
    // Helper functions
    const formatDate = (dateString) => {
      if (!dateString) return null
      const date = new Date(dateString)
      return date.toLocaleDateString()
    }
    
    const getClientName = (clientId) => {
      const client = clients.value.find(c => c.id === clientId)
      return client ? `${client.firstName} ${client.lastName}` : 'Unknown Client'
    }
    
    const getEnrollmentStatusClass = (status) => {
      if (!status) return 'status-active'
      return `status-${status.toLowerCase()}`
    }
    
    const goToEnroll = () => {
      router.push({ 
        path: '/enroll',
        query: { program: props.id }
      })
    }
    
    return {
      program,
      loading,
      error,
      loadingEnrollments,
      enrollments,
      isDoctor,
      statusClass,
      formatDate,
      getClientName,
      getEnrollmentStatusClass,
      goToEnroll
    }
  }
}
</script>

<style scoped>
.program-detail {
  padding: 1rem 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 0.5rem;
  color: var(--light-text);
  text-decoration: none;
}

.back-link:hover {
  color: var(--primary-color);
}

.page-title {
  margin: 0;
  color: var(--primary-color);
  font-size: 2rem;
}

.program-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--dark-text);
}

.program-description {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.875rem;
  color: var(--light-text);
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
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

.status-pending {
  background-color: rgba(243, 156, 18, 0.1);
  color: #d35400;
}

.status-completed {
  background-color: rgba(52, 152, 219, 0.1);
  color: #2980b9;
}

.resource-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.resource-item {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.resource-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.resource-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
}

.resource-link:hover {
  text-decoration: underline;
}

.resource-description {
  margin: 0;
  font-size: 0.9rem;
  color: var(--light-text);
}

.enrollment-item {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.enrollment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.enrollment-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.enrollment-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.enrollment-detail {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.875rem;
  color: var(--light-text);
  margin-bottom: 0.25rem;
}

.detail-value {
  font-weight: 500;
}

.enrollment-notes {
  padding-top: 0.5rem;
  margin-bottom: 1rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.9rem;
  color: var(--light-text);
}

.enrollment-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.access-restricted {
  padding: 2rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  color: var(--light-text);
}

@media (min-width: 992px) {
  .program-content {
    grid-template-columns: 3fr 2fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
  }
  
  .page-actions {
    margin-top: 1rem;
  }
}
</style>