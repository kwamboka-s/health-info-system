<template>
  <div class="client-create">
    <div class="page-header">
      <div class="header-title">
        <router-link to="/clients" class="back-link">
          &larr; Back to Clients
        </router-link>
        <h1 class="page-title">Add New Client</h1>
      </div>
    </div>
    
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-if="success" class="alert alert-success">
      Client created successfully!
    </div>
    
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit" class="client-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName" class="form-label">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="form.firstName" 
                class="form-input" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="lastName" class="form-label">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="form.lastName" 
                class="form-input" 
                required
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="phone" class="form-label">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="form.phone" 
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="dateOfBirth" class="form-label">Date of Birth</label>
              <input 
                type="date" 
                id="dateOfBirth" 
                v-model="form.dateOfBirth" 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="status" class="form-label">Status</label>
              <select id="status" v-model="form.status" class="form-input">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="address" class="form-label">Address</label>
            <input 
              type="text" 
              id="address" 
              v-model="form.address" 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="notes" class="form-label">Notes</label>
            <textarea 
              id="notes" 
              v-model="form.notes" 
              class="form-input" 
              rows="4"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="resetForm">
              Reset
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Creating...' : 'Create Client' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'ClientCreate',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const initialFormState = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      notes: '',
      status: 'Active'
    }
    
    const form = ref({...initialFormState})
    const loading = computed(() => store.getters['clients/isLoading'])
    const error = ref(null)
    const success = ref(false)
    
    // Verify user has doctor role
    const isDoctor = computed(() => store.getters['auth/isDoctor'])
    if (!isDoctor.value) {
      router.push('/clients')
    }
    
    const handleSubmit = async () => {
      error.value = null
      success.value = false
      
      try {
        const newClient = await store.dispatch('clients/createClient', form.value)
        success.value = true
        
        // Reset form after successful creation
        resetForm()
        
        // Redirect to the newly created client after a short delay
        setTimeout(() => {
          router.push(`/clients/${newClient.id}`)
        }, 1500)
      } catch (err) {
        error.value = err.message || 'Failed to create client. Please try again.'
      }
    }
    
    const resetForm = () => {
      form.value = {...initialFormState}
    }
    
    return {
      form,
      loading,
      error,
      success,
      handleSubmit,
      resetForm
    }
  }
}
</script>

<style scoped>
.client-create {
  padding: 1rem 0;
}

.page-header {
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

.client-form {
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