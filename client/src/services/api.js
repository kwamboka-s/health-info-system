<<<<<<< HEAD
import axios from 'axios';

// Create Axios instance with base config
const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000/api', // Replace with the third-party API's base URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to add auth token if required by the third-party API
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('thirdPartyToken'); // Replace with the correct token key if needed
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Adjust if the third-party API uses a different auth scheme
    }
    return config;
  },
  error => {
    return Promise.reject(error);
=======
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
>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  response => {
<<<<<<< HEAD
    return response;
  },
  error => {
    // Handle specific errors based on the third-party API's documentation
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized: Please check your API token.');
      } else if (error.response.status === 403) {
        console.error('Forbidden: You do not have access to this resource.');
      } else if (error.response.status === 404) {
        console.error('Not Found: The requested resource does not exist.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
=======
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
>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
