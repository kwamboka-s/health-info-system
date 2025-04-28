<template>
  <div class="enrollment-create">
    <div class="page-header">
      <div class="header-title">
        <h1 class="page-title">Enroll Client in Program</h1>
      </div>
    </div>
    
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-if="success" class="alert alert-success">
      Enrollment created successfully!
    </div>
    
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit" class="enrollment-form">
          <div class="form-row">
            <div class="form-group">
              <label for="clientId" class="form-label">Client</label>
              <select 
                id="clientId" 
                v-model="form.clientId" 
                class="form-input" 
                required
                :disabled="preSelectedClient"
              >
                <option value="">Select a client</option>
                <option 
                  v-for="client in clients" 
                  :key="client.id" 
                  :value="client.id"
                >
                  {{ client.firstName }} {{ client.lastName }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="programId" class="form-label">Program</label>
              <select 
                id="programId" 
                v-model="form.programId" 
                class="form-input" 
                required
                :disabled="preSelectedProgram"
              >
                <option value="">Select a program</option>
                <option 
                  v-for="program in activePrograms" 
                  :key="program.id" 
                  :value="program.id"
                >
                  {{ program.name }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="enrolledAt" class="form-label">Enrollment Date</label>
              <input 
                type="date" 
                id="enrolledAt" 
                v-model="form.enrolledAt" 
                class="form-input" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="status" class="form-label">Status</label>
              <select id="status" v-model="form.status" class="form-input" required>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div class="form-group" v-if="form.status === 'Completed'">
            <label for="completedAt" class="form-label">Completion Date</label>
            <input 
              type="date" 
              id="completedAt" 
              v-model="form.completedAt" 
              class="form-input" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="notes" class="form-label">Notes</label>
            <textarea 
              id="notes" 
              v-model="form.notes" 
              class="form-input" 
              rows="4"
              placeholder="Add any notes or comments about this enrollment"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="goBack">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Enrolling...' : 'Complete Enrollment' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'EnrollmentCreate',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    
    // Check query parameters for pre-selected client or program
    const preSelectedClient = route.query.client ? true : false
    const preSelectedProgram = route.query.program ? true : false
    
    // Format today's date as YYYY-MM-DD for the date input
    const today = new Date().toISOString().split('T')[0]
    
    const initialFormState = {
      clientId: route.query.client || '',
      programId: route.query.program || '',
      enrolledAt: today,
      completedAt: '',
      status: 'Active',
      notes: ''
    }
    
    const form = ref({...initialFormState})
    const loading = computed(() => store.getters['enrollments/isLoading'])
    const error = ref(null)
    const success = ref(false)
    
    // Access store data
    const clients = computed(() => store.getters['clients/clients'])
    const programs = computed(() => store.getters['programs/programs'])
    
    // Filter only active programs
    const activePrograms = computed(() => {
      return programs.value.filter(program => !program.status || program.status === 'Active')
    })
    
    // Verify user has doctor role
    const isDoctor = computed(() => store.getters['auth/isDoctor'])
    if (!isDoctor.value) {
      router.push('/')
    }
    
    // Load necessary data
    onMounted(async () => {
      try {
        // Load clients and programs
        await Promise.all([
          store.dispatch('clients/getAllClients'),
          store.dispatch('programs/getAllPrograms')
        ])
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    })
    
    // Add watcher for status field to manage completedAt
    watch(() => form.value.status, (newStatus) => {
      if (newStatus !== 'Completed') {
        form.value.completedAt = ''
      }
    })
    
    const handleSubmit = async () => {
      error.value = null
      success.value = false
      
      // Validate selected client and program
      if (!form.value.clientId) {
        error.value = 'Please select a client'
        return
      }
      
      if (!form.value.programId) {
        error.value = 'Please select a program'
        return
      }
      
      // Validate dates
      if (form.value.status === 'Completed' && !form.value.completedAt) {
        error.value = 'Please enter a completion date'
        return
      }
      
      try {
        // Convert ID strings to numbers if needed
        const enrollmentData = {
          ...form.value,
          clientId: Number(form.value.clientId),
          programId: Number(form.value.programId)
        }
        
        await store.dispatch('enrollments/enrollClient', enrollmentData)
        success.value = true
        
        // Navigate after success
        setTimeout(() => {
          if (preSelectedClient) {
            router.push(`/clients/${form.value.clientId}`)
          } else if (preSelectedProgram) {
            router.push(`/programs/${form.value.programId}`)
          } else {
            router.push('/') // Back to dashboard
          }
        }, 1500)
      } catch (err) {
        error.value = err.message || 'Failed to create enrollment. Please try again.'
      }
    }
    
    const goBack = () => {
      router.back()
    }
    
    return {
      form,
      loading,
      error,
      success,
      clients,
      programs,
      activePrograms,
      preSelectedClient,
      preSelectedProgram,
      handleSubmit,
      goBack
    }
  }
}
</script>

<style scoped>
.enrollment-create {
  padding: 1rem 0;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  margin: 0;
  color: var(--primary-color);
  font-size: 2rem;
}

.enrollment-form {
  max-width: 800px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
}

.form-input:disabled {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: not-allowed;
}

textarea.form-input {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.alert {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.alert-danger {
  background-color: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  color: #c0392b;
}

.alert-success {
  background-color: rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  color: #27ae60;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>