import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/main.css';
// Create Vue app
const app = createApp(App)

// Use router and store
app.use(router)
app.use(store)

// Mount app
app.mount('#app')