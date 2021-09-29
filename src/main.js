import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "@/plugins/vuetify.js"
import "vuetify/dist/vuetify.min.css"
import database from "@/database"
import "@/plugins/indexedDB.js"
import createRepository from "@/repositories"
import axios from "axios"
import VueNativeSock from "vue-native-websocket"

database.getDatabase()
Vue.config.productionTip = false
import Axios from "axios"
const localToken = localStorage.getItem("auth._token.local")
Vue.config.productionTip = false
Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Axios.defaults.headers = { Authorization: `Bearer ${localToken}` }
const repo = createRepository(axios, Vue.prototype.$indexedDB, store)
Vue.prototype.$repositories = repo
Vue.use(VueNativeSock, process.env.VUE_APP_DOMAIN_SOCKET_CHAT, {
  store,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
