<template>
  <div id="app">
    <AppLayout v-if="isAuthenticated">
      <router-view />
    </AppLayout>
    
    <router-view v-else />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AppLayout from '@/components/layout/AppLayout.vue';

export default {
  name: 'App',
  components: {
    AppLayout
  },
  setup() {
    const store = useStore()
    
    // Check if the user is authenticated
    const isAuthenticated = computed(() => {
      return store.getters['auth/loggedIn']
    })
    
    return {
      isAuthenticated
    }
  }
}
</script>

<style>
:root {
  --primary-color: #4a6fa5;
  --primary-light: #6a8cbe;
  --primary-dark: #345480;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --light-text: #6c757d;
  --dark-text: #343a40;
  --border-color: #dee2e6;
  --background-color: #f8f9fa;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: var(--dark-text);
  background-color: var(--background-color);
}

/* Card styles */
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.card-header {
  padding: 1.25rem;
  border-bottom: 1px solid var(--border-color);
  background-color: rgba(0, 0, 0, 0.02);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.card-body {
  padding: 1.25rem;
}

/* Button styles */
.btn {
  display: inline-block;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 4px;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
}

.btn-secondary {
  background-color: white;
  border: 1px solid var(--border-color);
  color: var(--dark-text);
}

.btn-secondary:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Form styles */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--dark-text);
  background-color: white;
  background-clip: padding-box;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out;
}

.form-input:focus {
  border-color: var(--primary-light);
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(74, 111, 165, 0.25);
}

/* Alert styles */
.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}

/* Table styles */
.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid var(--border-color);
  text-align: left;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid var(--border-color);
  background-color: rgba(0, 0, 0, 0.02);
  font-weight: 600;
}

.table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

/* Loading styles */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Utility classes */
.text-muted {
  color: var(--light-text);
}

.text-center {
  text-align: center;
}

/* Responsive utilities */
@media (max-width: 768px) {
  .d-none-mobile {
    display: none !important;
  }
}

@media (min-width: 769px) {
  .d-none-desktop {
    display: none !important;
  }
}
</style>