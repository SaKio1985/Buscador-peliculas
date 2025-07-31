import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue/'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // La ruta de búsqueda ahora tendrá el tipo de fuente en la URL
      path: '/search/:type',
      name: 'search',
      component: () => import('@/views/SearchView.vue'), // Lazy loading
    },
    {
      // La ruta de detalles tendrá la fuente y el ID en la URL
      path: '/details',
      name: 'details',
      component: () => import('@/views/DetailsView.vue'), // Lazy loading
    },
  ],
})

export default router
