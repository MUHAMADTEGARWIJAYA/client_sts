import { createRouter, createWebHistory } from 'vue-router'
import AddMessage from '@/components/AddMessage.vue'
import AllMessage from '@/components/AllMessage.vue'
import DetailView from '@/components/DetailView.vue'
import HomeUtama from '@/components/HomeUtama.vue'
import SuportUs from '@/components/SuportUs.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/support',
      name: 'support',
      component: SuportUs,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeUtama,
    },
    {
      path: '/add',
      name: 'add',
      component: AddMessage,
    },
    {
      path: '/all',
      name: 'all',
      component: AllMessage,
    },
  ],
})

export default router
