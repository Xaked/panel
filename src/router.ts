import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
// meta: {
//   show: boolean, default: true - Shows in sidebar
//   icon: string, default: null - fontAwesome icon name, must be registered inmain.ts
// }
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home/index.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard/index.vue'),
      children: [{
        path: '/dashboard/users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "dash-users" */ '@/views/Dashboard/Users/index.vue'),
        meta: {
          show: true,
          icon: 'users',
        },
      },
        {
        path: '/dashboard/rv',
        name: 'RV',
        component: () => import(/* webpackChunkName: "dash-rv" */ '@/views/Dashboard/RV/index.vue'),
        meta: {
          show: true,
          icon: 'video',
        },
      },
      ],
    },
  ],
});
