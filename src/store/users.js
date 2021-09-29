/* eslint-disable no-unused-vars */

import database from "@/database"
const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL
import axios from "axios"
import users from "@/services/users.js"
const usersApi = users(axios)
const user = {
  state: () => ({
    listUser: [],
    listUserIdb: [],
  }),
  getters: {
    listUserGetter: (state) => {
      let arr = []
      if (!state.listUser || !state.listUser.length) {
        arr = [...state.listUserIdb]
        return arr
      }
      arr = [...state.listUser]
      return arr
    },
  },
  mutations: {
    SET_LIST_USER(state, payload) {
      state.listUser = payload
    },
    SET_LIST_USER_FROM_IDB(state, payload) {
      state.listUserIdb = payload
    },
  },
  actions: {
    async getAllUsersFromApi({ commit }) {
      const res = await usersApi.getAll({ pagination: false })
      if (!res) {
        return
      }
      try {
        commit("SET_LIST_USER", res.data.data)
        this._vm.$repositories.users.addArray(res.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    // async getAllRoomFromDatabase({ commit }) {
    //   const users = await database.getUsersContact()
    //   for (let index = 0; index < 10; index++) {
    //     database.addUserContact(index)
    //   }
    //   console.log(users)
    // },
  },
}
export default user
