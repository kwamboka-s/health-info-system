import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Services from '../views/Services.vue';
import Contact from '../views/Contact.vue';
import Blog from '../views/Blog.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/services', name: 'Services', component: Services },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/blog', name: 'Blog', component: Blog },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
