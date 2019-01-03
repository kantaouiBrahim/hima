import Vue from "vue"
import Vuetify from "vuetify"
import App from "./App.vue"
import router from "./router"
import VueSocketio from "vue-socket.io"
import Notifications from 'vue-notification'
import uploader from "vue-simple-uploader";
Vue.use(Notifications)
Vue.use(uploader)

Vue.use(VueSocketio, 'https://hima-server.netlify.com')

import store from "./store"
import "vuetify/dist/vuetify.min.css"
Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
