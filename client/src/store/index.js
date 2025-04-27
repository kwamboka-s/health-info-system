import { createStore } from 'vuex'

// Import modules
import auth from './modules/auth.module'
import clients from './modules/clients.module'
import programs from './modules/programs.module'
import enrollments from './modules/enrollments.module'

// Create and export store
export default createStore({
  state: {
    appName: 'HealthPro',
    appVersion: '1.0.0',
  },
  
  getters: {
    appName: state => state.appName,
    appVersion: state => state.appVersion
  },
  
  mutations: {},
  
  actions: {},
  
  modules: {
    auth,
    clients,
    programs,
    enrollments
  }
})