<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <div class="logo-container">
            <router-link to="/" class="logo">
              HealthPro
            </router-link>
          </div>
          
          <button 
            class="mobile-menu-toggle" 
            @click="toggleMobileMenu" 
            aria-label="Toggle navigation menu"
          >
            <span class="menu-icon" :class="{ 'is-active': isMobileMenuOpen }"></span>
          </button>
          
          <nav class="main-nav" :class="{ 'mobile-open': isMobileMenuOpen }">
            <ul class="nav-list">
              <li class="nav-item">
                <router-link to="/" class="nav-link" exact-active-class="active">
                  Dashboard
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/clients" class="nav-link" active-class="active">
                  Clients
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/programs" class="nav-link" active-class="active">
                  Programs
                </router-link>
              </li>
              <li v-if="isDoctor" class="nav-item">
                <router-link to="/enroll" class="nav-link" active-class="active">
                  Enroll
                </router-link>
              </li>
            </ul>
            
            <div class="user-menu">
              <div class="user-info" @click="toggleUserDropdown">
                <span class="user-name">{{ userName }}</span>
                <span class="user-role" v-if="userRole">{{ userRole }}</span>
                <span class="dropdown-arrow"></span>
              </div>
              
              <div v-if="isUserDropdownOpen" class="user-dropdown">
                <div class="dropdown-header">
                  <strong>{{ userName }}</strong>
                  <span>{{ userEmail }}</span>
                </div>
                <div class="dropdown-divider"></div>
                <ul class="dropdown-menu">
                  <li>
                    <a href="#" class="dropdown-item">Profile</a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item">Settings</a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item" @click.prevent="logout">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
    
    <main class="app-main">
      <div class="container">
        <slot></slot>
      </div>
    </main>
    
    <footer class="app-footer">
      <div class="container">
        <p>&copy; {{ currentYear }} HealthPro Healthcare Management System</p>
      </div>
    </footer>
  </div>

</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'AppLayout',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    // Mobile menu state
    const isMobileMenuOpen = ref(false)
    
    // User dropdown state
    const isUserDropdownOpen = ref(false)
    
    // Get user data
    const user = computed(() => store.getters['auth/user'])
    const userName = computed(() => {
<<<<<<< HEAD
      if (user.value && user.value.fullName) {
        return user.value.fullName
      }
      return user.value && user.value.username ? user.value.username : 'User'
    })
    const userEmail = computed(() => (user.value && user.value.email) || '')
    const userRole = computed(() => {
      if (user.value && user.value.role) {
        return user.value.role.charAt(0).toUpperCase() + user.value.role.slice(1)
      }
      return ''
=======
      if (user.value?.fullName) {
        return user.value.fullName
      }
      return user.value?.username || 'User'
    })
    const userEmail = computed(() => user.value?.email || '')
    const userRole = computed(() => {
      if (!user.value?.role) return ''
      return user.value.role.charAt(0).toUpperCase() + user.value.role.slice(1)
>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
    })
    const isDoctor = computed(() => store.getters['auth/isDoctor'])
    
    // Current year for footer
    const currentYear = new Date().getFullYear()
    
    // Toggle mobile menu
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
      if (isMobileMenuOpen.value) {
        document.body.classList.add('menu-open')
      } else {
        document.body.classList.remove('menu-open')
      }
    }
    
    // Toggle user dropdown
    const toggleUserDropdown = () => {
      isUserDropdownOpen.value = !isUserDropdownOpen.value
    }
    
    // Close user dropdown when clicking outside
    const handleClickOutside = (event) => {
      const userMenu = document.querySelector('.user-menu')
      if (userMenu && !userMenu.contains(event.target)) {
        isUserDropdownOpen.value = false
      }
    }
    
    // Close mobile menu on route change
    const closeMenus = () => {
      isMobileMenuOpen.value = false
      isUserDropdownOpen.value = false
      document.body.classList.remove('menu-open')
    }
    
    // Logout function
    const logout = async () => {
<<<<<<< HEAD
      try {
        await store.dispatch('auth/logout')
        router.push('/login')
        closeMenus()
     
      } catch (error) {
        console.error('Logout failed:', error)
      }
=======
      await store.dispatch('auth/logout')
      closeMenus()
      router.push('/login')
>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
    }
    
    // Set up event listeners
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      router.afterEach(closeMenus)
    })
    
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    
    return {
      isMobileMenuOpen,
      isUserDropdownOpen,
      userName,
      userEmail,
      userRole,
      isDoctor,
      currentYear,
      toggleMobileMenu,
      toggleUserDropdown,
      logout
    }
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header styles */
.app-header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo-container {
  flex-shrink: 0;
  margin-right: 1.5rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.main-nav {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-right: 1.5rem;
}

.nav-link {
  display: block;
  padding: 0.5rem 0;
  color: var(--dark-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
}

.nav-link.active {
  position: relative;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

/* User menu styles */
.user-menu {
  position: relative;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.user-info:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.user-name {
  font-weight: 500;
}

.user-role {
  font-size: 0.75rem;
  color: var(--light-text);
}

.dropdown-arrow {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid var(--dark-text);
  margin-left: 5px;
  margin-top: 5px;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 10;
}

.dropdown-header {
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.dropdown-header strong {
  margin-bottom: 0.25rem;
}

.dropdown-header span {
  font-size: 0.75rem;
  color: var(--light-text);
}

.dropdown-divider {
  height: 1px;
  background-color: var(--border-color);
}

.dropdown-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--dark-text);
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Mobile menu */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon {
  display: block;
  position: relative;
  width: 24px;
  height: 2px;
  background-color: var(--dark-text);
  transition: all 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--dark-text);
  transition: all 0.3s ease;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  bottom: -8px;
}

.menu-icon.is-active {
  background-color: transparent;
}

.menu-icon.is-active::before {
  top: 0;
  transform: rotate(45deg);
}

.menu-icon.is-active::after {
  bottom: 0;
  transform: rotate(-45deg);
}

/* Main content */
.app-main {
  flex-grow: 1;
  padding: 2rem 0;
  background-color: #f8f9fa;
}

/* Footer */
.app-footer {
  background-color: white;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-color);
  color: var(--light-text);
  font-size: 0.875rem;
}

/* Responsive styles */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .main-nav {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
  }
  
  .main-nav.mobile-open {
    transform: translateX(0);
  }
  
  .nav-list {
    flex-direction: column;
    width: 100%;
    margin-bottom: 2rem;
  }
  
  .nav-item {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .nav-link {
    font-size: 1.25rem;
    padding: 0.75rem 0;
  }
  
  .user-menu {
    width: 100%;
  }
  
  .user-info {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 4px;
  }
  
  .user-dropdown {
    position: static;
    width: 100%;
    box-shadow: none;
    margin-top: 0.5rem;
  }
}

body.menu-open {
  overflow: hidden;
}
</style>