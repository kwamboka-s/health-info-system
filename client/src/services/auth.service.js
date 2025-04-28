import api from './api'

class AuthService {
  async login(credentials) {
    try {
      const response = await api.post('/login', credentials)
      
      // Store user data in localStorage
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        
        // If token is provided in response, store it separately
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
        }
      }
      
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }
  
  async register(userData) {
    try {
      const response = await api.post('/register', userData)

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        
        // If token is provided in response, store it separately
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
        }
      }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  }
  
  async logout() {
    try {
      await api.post('/logout')
      
      // Clear user data from localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    } catch (error) {
      console.error('Logout error:', error)
      
      // Still clear localStorage even if the API call fails
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      
      throw new Error(error.response?.data?.message || 'Logout failed')
    }
  }
  
  async getCurrentUser() {
    try {
      const response = await api.get('/user')

      // const response = {
      //   data: {
      //     id: 1,
      //     name: "John Doe",
      //     email: "example@gmail.com",

      //     role: "admin",
      //     createdAt: "2023-01-01T00:00:00Z",
      //     updatedAt: "2023-01-01T00:00:00Z",  
      //   }}


      return response.data
    } catch (error) {
      // If the user endpoint fails, clear stored data
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
      
      throw new Error(error.response?.data?.message || 'Failed to get user data')
    }
  }
  
  // Get user from localStorage
  getStoredUser() {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr)
    } catch (e) {
      localStorage.removeItem('user')
      return null
    }
  }
}

export default new AuthService()