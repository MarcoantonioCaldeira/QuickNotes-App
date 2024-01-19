// router/index.ts
import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from '../components/Index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// const app = createApp(Index);
// app.use(router);


// const existingApp = app.mount('#app') as any;
// if (existingApp && existingApp.unmount) {
//   existingApp.unmount();
// }

// app.mount('#app');

export default router;
