<template>
  <div class="auth-container">
    <div class="auth-form-container">
      <h1 class="auth-title">Login</h1>
      
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
<<<<<<< HEAD
          <label for="email" class="form-label">Email</label>
          <input 
            type="text" 
            id="email" 
            v-model="form.email" 
            class="form-input" 
            required 
            autocomplete="email"
=======
          <label for="username" class="form-label">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="form.username" 
            class="form-input" 
            required 
            autocomplete="username"
>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
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
            autocomplete="current-password"
          />
        </div>
        
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      
      <div class="auth-footer">
        <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
      </div>
    </div>
    
    <div class="auth-info">
      <div class="auth-info-content">
        <h2>Healthcare Program Management</h2>
        <p>Welcome to the Healthcare Program Management System. Login to manage clients, health programs, and enrollments.</p>
        <ul>
          <li>Track client health information</li>
          <li>Create and manage healthcare programs</li>
          <li>Enroll clients in appropriate programs</li>
          <li>Monitor program outcomes</li>
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
  name: 'LoginView',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const form = ref({
<<<<<<< HEAD
      email: '',
=======
      username: '',
>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
      password: ''
    })
    
    const loading = computed(() => store.state.auth.status.loggingIn)
    const error = ref(null)
    
    // Redirect if already logged in
    if (store.getters['auth/loggedIn']) {
      router.push('/')
    }
    
    const handleSubmit = async () => {
      error.value = null
      
      try {
        await store.dispatch('auth/login', {
<<<<<<< HEAD
          email: form.value.email,
=======
          username: form.value.username,
>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
          password: form.value.password
        })
        router.push('/')
      } catch (err) {
        error.value = err.message || 'Login failed. Please check your credentials.'
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