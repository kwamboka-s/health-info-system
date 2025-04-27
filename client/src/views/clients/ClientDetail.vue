<template>
  <div class="client-detail">
    <div class="page-header">
      <div class="header-title">
        <router-link to="/clients" class="back-link">
          &larr; Back to Clients
        </router-link>
        <h1 v-if="client" class="page-title">{{ client.firstName }} {{ client.lastName }}</h1>
        <h1 v-else class="page-title">Client Details</h1>
      </div>
      
      <div class="page-actions" v-if="client && isDoctor">
        <button class="btn btn-primary" @click="goToEnroll">Enroll in Program</button>
      </div>
    </div>
    
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading client details...</p>
    </div>
    
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-else-if="!client" class="alert alert-warning">
      Client not found or has been removed.
    </div>
    
    <div v-else class="client-content">
      <div class="client-info-section">
        <div class="card">
          <div class="card-header">
            <h2>Personal Information</h2>
          </div>
          <div class="card-body">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Full Name</span>
                <span class="info-value">{{ client.firstName }} {{ client.lastName }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">{{ client.email || 'Not provided' }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Phone</span>
                <span class="info-value">{{ client.phone || 'Not provided' }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Date of Birth</span>
                <span class="info-value">{{ formatDate(client.dateOfBirth) || 'Not provided' }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Address</span>
                <span class="info-value">{{ client.address || 'Not provided' }}</span>
              </div>
              
              <div class="info-item">
                <span class="info-label">Status</span>
                <span class="info-value status-badge" :class="statusClass">{{ client.status || 'Active' }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card" v-if="client.notes">
          <div class="card-header">
            <h2>Notes</h2>
          </div>
          <div class="card-body">
            <p class="client-notes">{{ client.notes }}</p>
          </div>
        </div>
      </div>
      
      <div class="client-enrollments-section">
        <div class="card">
          <div class="card-header">
            <h2>Program Enrollments</h2>
          </div>
          <div class="card-body">
            <div v-if="loadingEnrollments" class="loading-container">
              <div class="loading-spinner"></div>
              <p>Loading enrollments...</p>
            </div>
            
            <div v-else-if="enrollments.length === 0" class="empty-state">
              <p>This client is not enrolled in any programs yet.</p>
              <button v-if="isDoctor" class="btn btn-primary" @click="goToEnroll">Enroll in Program</button>
            </div>
            
            <div v-else>
              <div v-for="enrollment in enrollments" :key="enrollment.id" class="enrollment-item">
                <div class="enrollment-header">
                  <h3>{{ getProgramName(enrollment.programId) }}</h3>
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
  name: 'ClientDetail',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    
    // Client data
    const loading = computed(() => store.getters['clients/isLoading'])
    const error = computed(() => store.getters['clients/error'])
    const client = computed(() => store.getters['clients/currentClient'])
    
    // Enrollment data
    const loadingEnrollments = ref(false)
    const enrollments = ref([])
    
    // User permissions
    const isDoctor = computed(() => store.getters['auth/isDoctor'])
    
    // Programs for reference
    const programs = computed(() => store.getters['programs/programs'])
    
    // Computed properties
    const statusClass = computed(() => {
      if (!client.value || !client.value.status) return 'status-active'
      return `status-${client.value.status.toLowerCase()}`
    })
    
    // Load client data
    onMounted(async () => {
      // Load client details
      await store.dispatch('clients/getClientById', props.id)
      
      // If client exists, load programs and enrollments
      if (client.value) {
        // Load all programs for reference
        store.dispatch('programs/getAllPrograms')
        
        // Load client enrollments
        loadingEnrollments.value = true
        try {
          const clientEnrollments = await store.dispatch('enrollments/getClientEnrollments', props.id)
          enrollments.value = clientEnrollments
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
    
    const getProgramName = (programId) => {
      const program = programs.value.find(prog => prog.id === programId)
      return program ? program.name : 'Unknown Program'
    }
    
    const getEnrollmentStatusClass = (status) => {
      if (!status) return 'status-active'
      return `status-${status.toLowerCase()}`
    }
    
    const goToEnroll = () => {
      router.push({ 
        path: '/enroll',
        query: { client: props.id }
      })
    }
    
    return {
      client,
      loading,
      error,
      loadingEnrollments,
      enrollments,
      isDoctor,
      statusClass,
      formatDate,
      getProgramName,
      getEnrollmentStatusClass,
      goToEnroll
    }
  }
}
</script>

<style scoped>
.client-detail {
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

.client-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

.client-notes {
  white-space: pre-line;
  line-height: 1.6;
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
  border-top: 1px solid var(--border-color);
  font-size: 0.9rem;
  color: var(--light-text);
}

@media (min-width: 992px) {
  .client-content {
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