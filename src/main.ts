import Vue from 'vue';

import BootstrapVue from 'bootstrap-vue';
import VueFormGenerator from 'vue-form-generator';
import '@/styles/index.scss';
import '@/permission';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faColumns, faBars, faUsers, faVideo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from '@/App.vue';
import router from '@/router';
import '@/registerServiceWorker';

Vue.use(BootstrapVue);
Vue.use(VueFormGenerator);
library.add(faColumns, faBars, faUsers, faVideo, faSignOutAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
