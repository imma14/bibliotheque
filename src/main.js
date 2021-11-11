import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import firebase from 'firebase/app';
import "firebase/auth";
import Popover from 'vue-js-popover';
import VueLazyload from 'vue-lazyload'
import VueSnip from 'vue-snip'

Vue.use(VueSnip)
Vue.use(Vue2Editor);
Vue.use(Popover);

const loadimage = require('./assets/bookLoader.gif')
const errorimage = require('./assets/bookLoader.gif')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})

Vue.config.productionTip = false;

// Attendre que Firebase soit prêt pour lancer l'app
let app;
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
})


