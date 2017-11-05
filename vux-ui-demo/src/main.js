// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import Vuex from 'vuex';
import vux from 'vux';
import vuexI18n from 'vuex-i18n';
Vue.use(Vuex);
Vue.use(vux)
let store = new Vuex.Store({
    modules: {
      i18n: vuexI18n.store
    }
});

Vue.use(vuexI18n.plugin, store);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
