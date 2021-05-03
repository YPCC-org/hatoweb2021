import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './api';

Vue.config.productionTip = false
Vue.config.devtools = true;
Vue.use(VueCookies)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
