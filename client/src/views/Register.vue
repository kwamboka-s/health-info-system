<template>
  <div class="auth-container">
    <div class="auth-form-container">
      <h1 class="auth-title">Register</h1>
      
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="form.username" 
            class="form-input" 
            required 
            autocomplete="username"
          />
        </div>
        
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            class="form-input" 
            required 
            autocomplete="email"
          />
        </div>
        
        <div class="form-group">
          <label for="fullName" class="form-label">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            v-model="form.fullName" 
            class="form-input" 
            required 
            autocomplete="name"
          />
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            class="form-input" 
            required 
            autocomplete="new-password"
          />
          <small class="form-help">Password must be at least 8 characters</small>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="form.confirmPassword" 
            class="form-input" 
            required 
            autocomplete="new-password"
          />
        </div>
        
        <div class="form-group">
          <label for="role" class="form-label">Role</label>
          <select id="role" v-model="form.role" class="form-input" required>
            <option value="">Select a role</option>
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>
      
      <div class="auth-footer">
        <p>Already have an account? <router-link to="/login">Login here</router-link></p>
      </div>
    </div>
    
    <div class="auth-info">
      <div class="auth-info-content">
        <h2>Join Our Healthcare Platform</h2>
        <p>Create an account to access our comprehensive healthcare program management system.</p>
        <ul>
          <li>Secure and confidential client management</li>
          <li>Evidence-based healthcare programs</li>
          <li>Streamlined enrollment process</li>
          <li>Comprehensive reporting tools</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterView',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const form = ref({
      username: '',
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      role: ''
    })
    
    const loading = computed(() => store.state.auth.status.registering)
    const error = ref(null)
    
    // Redirect if already logged in
    if (store.getters['auth/loggedIn']) {
      router.push('/')
    }
    
    const validateForm = () => {
      if (form.value.password.length < 8) {
        error.value = 'Password must be at least 8 characters'
        return false
      }
      
      if (form.value.password !== form.value.confirmPassword) {
        error.value = 'Passwords do not match'
        return false
      }
      
      return true
    }
    
    const handleSubmit = async () => {
      error.value = null
      
      if (!validateForm()) {
        return
      }
      
      try {
        await store.dispatch('auth/register', {
          username: form.value.username,
          email: form.value.email,
          fullName: form.value.fullName,
          password: form.value.password,
          role: form.value.role
        })
        
        // After successful registration, redirect to login
        router.push('/login')
      } catch (err) {
        error.value = err.message || 'Registration failed. Please try again.'
      }
    }
    
    return {
      form,
      loading,
      error,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  min-height: 100vh;
}

.auth-form-container {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
}

.auth-info {
  flex: 1;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
}

.auth-info-content {
  max-width: 500px;
  margin: 0 auto;
}

.auth-info h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.auth-info p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.auth-info ul {
  margin-left: 1.5rem;
}

.auth-info li {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.auth-title {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-help {
  display: block;
  margin-top: 0.25rem;
  color: var(--light-text);
  font-size: 0.875rem;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.auth-footer a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
  }
  
  .auth-form-container {
    max-width: 100%;
    padding: 2rem;
  }
  
  .auth-info {
    padding: 2rem;
  }
}
</style>