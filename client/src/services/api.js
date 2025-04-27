import axios from 'axios'

// Create Axios instance with base config
const api = axios.create({
  baseURL: 'https://locahost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Important for cookies/sessions
});

// Add request interceptor to add auth token if available
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      // If not on auth pages, redirect to login
      if (!window.location.pathname.includes('/auth')) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
);

export default api