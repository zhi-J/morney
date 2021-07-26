import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
