import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import { Route } from 'vue-router';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/'];

router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/dashboard' });
      NProgress.done();
    }
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`); // Redirect to login page
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
