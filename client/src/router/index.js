import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded route components
const HomeView = () => import('@/views/Home.vue')
const LoginView = () => import('@/views/Login.vue')
const RegisterView = () => import('@/views/Register.vue')
const ClientList = () => import('@/views/clients/ClientList.vue')
const ClientDetail = () => import('@/views/clients/ClientDetail.vue')
const ClientCreate = () => import('@/views/clients/ClientCreate.vue')
const ProgramList = () => import('@/views/programs/ProgramList.vue')
const ProgramDetail = () => import('@/views/programs/ProgramDetail.vue')
const ProgramCreate = () => import('@/views/programs/ProgramCreate.vue')
const EnrollmentCreate = () => import('@/views/enrollments/EnrollmentCreate.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { guest: true }
  },
  {
    path: '/clients',
    name: 'client-list',
    component: ClientList,
    // meta: { requiresAuth: true }
  },
  {
    path: '/clients/new',
    name: 'client-create',
    component: ClientCreate,
    // meta: { requiresAuth: true, requiresDoctor: true }
  },
  {
    path: '/clients/:id',
    name: 'client-detail',
    component: ClientDetail,
    // meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/programs',
    name: 'program-list',
    component: ProgramList,
    // meta: { requiresAuth: true }
  },
  {
    path: '/programs/new',
    name: 'program-create',
    component: ProgramCreate,
    // meta: { requiresAuth: true, requiresDoctor: true }
  },
  {
    path: '/programs/:id',
    name: 'program-detail',
    component: ProgramDetail,
    // meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/enroll',
    name: 'enrollment-create',
    component: EnrollmentCreate,
    // meta: { requiresAuth: true, requiresDoctor: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user') !== null
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isGuestRoute = to.matched.some(record => record.meta.guest)
  const requiresDoctor = to.matched.some(record => record.meta.requiresDoctor)
  
  // Check for doctor role if required
  if (requiresDoctor) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'doctor') {
      return next({ name: 'home' })
    }
  }
  
  // Redirect logic
  if (requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else if (isGuestRoute && isLoggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router