import AuthService from '@/services/auth.service'

// Initial state
const initialState = {
  user: AuthService.getStoredUser(),
  status: {
    loggingIn: false,
    registering: false,
    refreshing: false
  }
}

const state = { ...initialState }

// Getters
const getters = {
  user: state => state.user,
  loggedIn: state => !!state.user,
 isDoctor: state => state.user && state.user.user.role === 'doctor',
  isLoggingIn: state => state.status.loggingIn,
  isRegistering: state => state.status.registering,
  isRefreshing: state => state.status.refreshing
}

// Mutations
const mutations = {
  LOGIN_REQUEST(state) {
    state.status.loggingIn = true
  },
  LOGIN_SUCCESS(state, user) {
    state.status.loggingIn = false
    state.user = user
  },
  LOGIN_FAILURE(state) {
    state.status.loggingIn = false
  },
  
  REGISTER_REQUEST(state) {
    state.status.registering = true
  },
  REGISTER_SUCCESS(state) {
    state.status.registering = false
  },
  REGISTER_FAILURE(state) {
    state.status.registering = false
  },
  
  REFRESH_REQUEST(state) {
    state.status.refreshing = true
  },
  REFRESH_SUCCESS(state, user) {
    state.status.refreshing = false
    state.user = user
  },
  REFRESH_FAILURE(state) {
    state.status.refreshing = false
  },
  
  LOGOUT(state) {
    state.user = null
  }
}

// Actions
const actions = {
  // Login action
  async login({ commit }, credentials) {
    commit('LOGIN_REQUEST')
    
    try {
      const user = await AuthService.login(credentials)
      commit('LOGIN_SUCCESS', user)
      return user
    } catch (error) {
      commit('LOGIN_FAILURE')
      throw error
    }
  },
  
  // Register action
  async register({ commit }, userData) {
    commit('REGISTER_REQUEST')
    
    try {
      const response = await AuthService.register(userData)
      commit('REGISTER_SUCCESS')
      return response
    } catch (error) {
      commit('REGISTER_FAILURE')
      throw error
    }
  },
  
  // Refresh user data
  async refreshUser({ commit }) {
    commit('REFRESH_REQUEST')
    
    try {
      const user = await AuthService.getCurrentUser()
      commit('REFRESH_SUCCESS', user)
      return user
    } catch (error) {
      commit('REFRESH_FAILURE')
      throw error
    }
  },
  
  // Logout action
  async logout({ commit }) {
    await AuthService.logout()
    commit('LOGOUT')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
