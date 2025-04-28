import axios from 'axios';

// Create Axios instance with base config
const api = axios.create({
  baseURL: `https://his-api.vercel.app/api`, // Replace with the third-party API's base URL
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
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  response => {
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
