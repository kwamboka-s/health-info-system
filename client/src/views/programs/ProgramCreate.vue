<template>
  <div class="program-create">
    <div class="page-header">
      <div class="header-title">
        <router-link to="/programs" class="back-link">
          &larr; Back to Programs
        </router-link>
        <h1 class="page-title">Create New Program</h1>
      </div>
    </div>
    
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-if="success" class="alert alert-success">
      Program created successfully!
    </div>
    
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit" class="program-form">
          <div class="form-group">
            <label for="name" class="form-label">Program Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              class="form-input" 
              required
              placeholder="Enter program name"
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="category" class="form-label">Category</label>
              <select id="category" v-model="form.category" class="form-input">
                <option value="">Select a category</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Diabetes Management">Diabetes Management</option>
                <option value="Mental Health">Mental Health</option>
                <option value="Physical Therapy">Physical Therapy</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Wellness">Wellness</option>
                <option value="Smoking Cessation">Smoking Cessation</option>
                <option value="Weight Management">Weight Management</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="status" class="form-label">Status</label>
              <select id="status" v-model="form.status" class="form-input" required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea 
              id="description" 
              v-model="form.description" 
              class="form-input" 
              rows="4"
              placeholder="Provide a detailed description of the program"
              required
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="duration" class="form-label">Duration</label>
            <input 
              type="text" 
              id="duration" 
              v-model="form.duration" 
              class="form-input" 
              placeholder="e.g., 8 weeks, 3 months, etc."
            />
            <small class="form-help">Leave blank if the duration is flexible</small>
          </div>
          
          <div class="form-group">
            <label class="form-label">Program Resources</label>
            <div class="resources-container">
              <div 
                v-for="(resource, index) in form.resources" 
                :key="index"
                class="resource-item"
              >
                <div class="resource-inputs">
                  <input 
                    type="text" 
                    v-model="resource.title" 
                    class="form-input" 
                    placeholder="Resource Title" 
                  />
                  <input 
                    type="url" 
                    v-model="resource.url" 
                    class="form-input" 
                    placeholder="Resource URL" 
                    required
                  />
                </div>
                <textarea 
                  v-model="resource.description" 
                  class="form-input" 
                  placeholder="Resource Description (optional)" 
                  rows="2"
                ></textarea>
                <button 
                  type="button" 
                  class="btn btn-danger btn-sm" 
                  @click="removeResource(index)"
                >
                  Remove
                </button>
              </div>
              
              <button 
                type="button" 
                class="btn btn-secondary btn-sm" 
                @click="addResource"
              >
                Add Resource
              </button>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="resetForm">
              Reset
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Creating...' : 'Create Program' }}
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
  name: 'ProgramCreate',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const emptyResource = {
      title: '',
      url: '',
      description: ''
    }
    
    const initialFormState = {
      name: '',
      category: '',
      description: '',
      duration: '',
      status: 'Active',
      resources: []
    }
    
    const form = ref({...initialFormState})
    const loading = computed(() => store.getters['programs/isLoading'])
    const error = ref(null)
    const success = ref(false)
    
    // Verify user has doctor role
    const isDoctor = computed(() => store.getters['auth/isDoctor'])
    if (!isDoctor.value) {
      router.push('/programs')
    }
    
    const addResource = () => {
      form.value.resources.push({...emptyResource})
    }
    
    const removeResource = (index) => {
      form.value.resources.splice(index, 1)
    }
    
    const handleSubmit = async () => {
      error.value = null
      success.value = false
      
      // Filter out empty resources
      form.value.resources = form.value.resources.filter(resource => resource.url.trim() !== '')
      
      try {
        const newProgram = await store.dispatch('programs/createProgram', form.value)
        success.value = true
        
        // Reset form after successful creation
        resetForm()
        
        // Redirect to the newly created program after a short delay
        setTimeout(() => {
          router.push(`/programs/${newProgram.id}`)
        }, 1500)
      } catch (err) {
        error.value = err.message || 'Failed to create program. Please try again.'
      }
    }
    
    const resetForm = () => {
      form.value = {...initialFormState, resources: []}
    }
    
    return {
      form,
      loading,
      error,
      success,
      addResource,
      removeResource,
      handleSubmit,
      resetForm
    }
  }
}
</script>

<style scoped>
.program-create {
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

.program-form {
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

.form-help {
  display: block;
  margin-top: 0.25rem;
  color: var(--light-text);
  font-size: 0.875rem;
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

.resources-container {
  margin-top: 0.5rem;
}

.resource-item {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.resource-inputs {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
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
  .form-row, .resource-inputs {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>