import ClientService from '@/services/client.service'

// Initial state
const initialState = {
  clients: [],
  currentClient: null,
  status: {
    loading: false,
    error: null
  }
}

const state = { ...initialState }

// Getters
const getters = {
  clients: state => state.clients,
  currentClient: state => state.currentClient,
  isLoading: state => state.status.loading,
  error: state => state.status.error
}

// Mutations
const mutations = {
  CLEAR_STATE(state) {
    state.clients = []
    state.currentClient = null
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
  
  SET_CLIENTS(state, clients) {
    state.clients = clients
  },
  
  SET_CURRENT_CLIENT(state, client) {
    state.currentClient = client
  },
  
  ADD_CLIENT(state, client) {
    state.clients.push(client)
  },
  
  UPDATE_CLIENT(state, updatedClient) {
    const index = state.clients.findIndex(c => c.id === updatedClient.id)
    if (index !== -1) {
      state.clients.splice(index, 1, updatedClient)
    }
    
    if (state.currentClient && state.currentClient.id === updatedClient.id) {
      state.currentClient = updatedClient
    }
  }
}

// Actions
const actions = {
  // Clear clients state
  clearState({ commit }) {
    commit('CLEAR_STATE')
  },
  
  // Get all clients
  async getAllClients({ commit }) {
    commit('SET_LOADING', true)
    
    try {
      const clients = await ClientService.getAllClients()
      commit('SET_CLIENTS', clients)
      return clients
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Get client by ID
  async getClientById({ commit }, id) {
    commit('SET_LOADING', true)
    
    try {
      const client = await ClientService.getClientById(id)
      commit('SET_CURRENT_CLIENT', client)
      return client
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Create new client
  async createClient({ commit }, clientData) {
    commit('SET_LOADING', true)
    
    try {
      const client = await ClientService.createClient(clientData)
      commit('ADD_CLIENT', client)
      return client
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Update client
  async updateClient({ commit }, { id, clientData }) {
    commit('SET_LOADING', true)
    
    try {
      const updatedClient = await ClientService.updateClient(id, clientData)
      commit('UPDATE_CLIENT', updatedClient)
      return updatedClient
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  // Search clients
  async searchClients({ commit }, query) {
    commit('SET_LOADING', true)
    
    try {
      const clients = await ClientService.searchClients(query)
      commit('SET_CLIENTS', clients)
      return clients
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