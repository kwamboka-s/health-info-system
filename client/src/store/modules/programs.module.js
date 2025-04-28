import ProgramService from '@/services/program.service'

// Initial state
const initialState = {
  programs: [],
  currentProgram: null,
  status: {
    loading: false,
    error: null
  }
}

const state = { ...initialState }

// Getters
const getters = {
  programs: state => state.programs,
  currentProgram: state => state.currentProgram,
  isLoading: state => state.status.loading,
  error: state => state.status.error,
  
  // Helper getter to get program categories
  categories: state => {
    const categories = state.programs
      .map(program => program.category)
      .filter(category => category) // Remove null/undefined
    
    // Return unique categories
    return [...new Set(categories)]
  }
}

// Mutations
const mutations = {
  CLEAR_STATE(state) {
    state.programs = []
    state.currentProgram = null
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
  
  SET_PROGRAMS(state, programs) {
    state.programs = programs
  },
  
  SET_CURRENT_PROGRAM(state, program) {
    state.currentProgram = program
  },
  
  ADD_PROGRAM(state, program) {
    state.programs.push(program)
  },
  
  UPDATE_PROGRAM(state, updatedProgram) {
    const index = state.programs.findIndex(p => p.id === updatedProgram.id)
    if (index !== -1) {
      state.programs.splice(index, 1, updatedProgram)
    }
    
    if (state.currentProgram && state.currentProgram.id === updatedProgram.id) {
      state.currentProgram = updatedProgram
    }
  }
}

// Actions
const actions = {
  // Clear programs state
  clearState({ commit }) {
    commit('CLEAR_STATE')
  },
  
  // Get all programs
  async getAllPrograms({ commit }) {
    commit('SET_LOADING', true)
    
    try {
      const programs = await ProgramService.getAllPrograms()
      commit('SET_PROGRAMS', programs)
      return programs
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Get program by ID
  async getProgramById({ commit }, id) {
    commit('SET_LOADING', true)
    
    try {
      const program = await ProgramService.getProgramById(id)
      commit('SET_CURRENT_PROGRAM', program)
      return program
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Create new program
  async createProgram({ commit }, programData) {
    commit('SET_LOADING', true)
    
    try {
      const program = await ProgramService.createProgram(programData)
      commit('ADD_PROGRAM', program)
      return program
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Update program
  async updateProgram({ commit }, { id, programData }) {
    commit('SET_LOADING', true)
    
    try {
      const updatedProgram = await ProgramService.updateProgram(id, programData)
      commit('UPDATE_PROGRAM', updatedProgram)
      return updatedProgram
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