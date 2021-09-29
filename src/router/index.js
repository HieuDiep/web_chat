/* eslint-disable no-unused-vars */
import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store"
import Home from "../views/Home.vue"
import auth from "../middleware/auth.js"
import api from "@/services"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/room/:id",
    name: "Room",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/room/id/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  // base: process.env.VUE_APP_BASE_URL,
  routes,
})

// auth middleware

router.beforeEach(async (to, from, next) => {
  if (to?.meta?.title) {
    document.title = to.meta.title
  }
  if (to.path.includes("/login")) {
    if (auth()) {
      const userAuth = store.state.auth
      if (userAuth.isAuth && userAuth.user) {
        next()
        return
      }
      setTimeout(async () => {
        const res = await api.user.getUserInfo()
        if (!res) {
          localStorage.removeItem("auth._token.local")
          next({
            path: "/login",
            query: { redirect: to.fullPath },
          })
        }
        try {
          if (res.status > 399) {
            localStorage.removeItem("auth._token.local")

            next({
              path: "/login",
              query: { redirect: to.fullPath },
            })

            return
          }
          if (res.response && !res.response.data.success) {
            localStorage.removeItem("auth._token.local")
            next({
              path: "/login",
              query: { redirect: to.fullPath },
            })
            return
          }
          const localToken = localStorage.getItem("auth._token.local")
          const auth_set = {
            isAuth: true,
            user: res.data.data.data,
            token: `Bearer ${localToken}`,
          }
          store.commit("SET_USER_LOGGEDIN", auth_set)
          const nextStep =
            to.query && to.query.redirect ? to.query.redirect : "/"
          next({
            path: String(nextStep),
          })
        } catch (error) {
          console.log(error)
          next({
            path: "/login",
            query: { redirect: to.fullPath },
          })
        }
      }, 1000)
    } else {
      next()
    }
    return
  } else {
    if (auth()) {
      const userAuth = store.state.auth
      if (userAuth && userAuth.isAuth && userAuth.user) {
        next()
        return
      }
      setTimeout(async () => {
        const res = await api.user.getUserInfo()
        if (!res) {
          localStorage.removeItem("auth._token.local")

          next({
            path: "/login",
            query: { redirect: to.fullPath },
          })
        }
        try {
          if (res.status > 399) {
            localStorage.removeItem("auth._token.local")

            next({
              path: "/login",
              query: { redirect: to.fullPath },
            })
            return
          }
          if (res.response && !res.response.data.success) {
            localStorage.removeItem("auth._token.local")

            next({
              path: "/login",
              query: { redirect: to.fullPath },
            })
            return
          }
          const localToken = localStorage.getItem("auth._token.local")
          const auth_set = {
            isAuth: true,
            user: res.data.data.data,
            token: `Bearer ${localToken}`,
          }
          store.commit("SET_USER_LOGGEDIN", auth_set)
          // const nextStep = to.query && to.query.redirect ? to.query.redirect : "/";
          const nextStep = to.fullPath
          next({
            path: String(nextStep),
          })
        } catch (error) {
          console.log(error)

          next({
            path: "/login",
            query: { redirect: to.fullPath },
          })
        }
      }, 1000)
    } else {
      localStorage.removeItem("auth._token.local")

      next({
        path: "/login",
        query: { redirect: to.fullPath },
      })
    }
  }
})

export default router
