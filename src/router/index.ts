import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';

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
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
