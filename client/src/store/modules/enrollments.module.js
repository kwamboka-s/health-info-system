import EnrollmentService from '@/services/enrollment.service'

// Initial state
const initialState = {
  enrollments: [],
  status: {
    loading: false,
    error: null
  }
}

const state = { ...initialState }

// Getters
const getters = {
  enrollments: state => state.enrollments,
  isLoading: state => state.status.loading,
  error: state => state.status.error
}

// Mutations
const mutations = {
  CLEAR_STATE(state) {
    state.enrollments = []
  },
  
  SET_LOADING(state, isLoading) {
    state.status.loading = isLoading
    if (isLoading) {
      state.status.error = null
    }
  },
  
  SET_ERROR(state, error) {
    state.status.error = error
    state.status.loading = false
  },
  
  SET_ENROLLMENTS(state, enrollments) {
    state.enrollments = enrollments
  },
  
  ADD_ENROLLMENT(state, enrollment) {
    state.enrollments.push(enrollment)
  }
}

// Actions
const actions = {
  // Clear enrollments state
  clearState({ commit }) {
    commit('CLEAR_STATE')
  },
  
  // Get all enrollments
  async getAllEnrollments({ commit }) {
    commit('SET_LOADING', true)
    
    try {
      const enrollments = await EnrollmentService.getAllEnrollments()
      commit('SET_ENROLLMENTS', enrollments)
      return enrollments
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Get client enrollments
  async getClientEnrollments({ commit }, clientId) {
    commit('SET_LOADING', true)
    
    try {
      const enrollments = await EnrollmentService.getClientEnrollments(clientId)
      commit('SET_ENROLLMENTS', enrollments)
      return enrollments
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Get program enrollments
  async getProgramEnrollments({ commit }, programId) {
    commit('SET_LOADING', true)
    
    try {
      const enrollments = await EnrollmentService.getProgramEnrollments(programId)
      commit('SET_ENROLLMENTS', enrollments)
      return enrollments
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Enroll client in program
  async enrollClient({ commit }, enrollmentData) {
    commit('SET_LOADING', true)
    
    try {
      const enrollment = await EnrollmentService.enrollClient(enrollmentData)
      commit('ADD_ENROLLMENT', enrollment)
      return enrollment
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}