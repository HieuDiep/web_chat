/* eslint-disable no-unused-vars */
import Vue from "vue"
import database from "@/database"
const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL
import axios from "axios"
import chat from "@/services/chat.js"
const chatApi = chat(axios)
const rooms = {
  state: () => ({
    listRoom: [],
    // Current room info
    currentRoomId: "",
    currentRoomMsg: [],
    currentRoomMsgTotal: 0,
    currentRoomMembers: [],
    // room msg and member list
    listMsgByRoom: [],
    listMembersByRoom: [],

    // IDB
    listRoomIDB: [],
    listMsgByRoomIDB: [],
  }),
  getters: {
    currentRoomMsgGetter: (state) => {
      let arr = []
      if (!state.currentRoomMsg || !state.currentRoomMsg.length) {
        try {
          const currentRoomMsgIDB = state.listMsgByRoomIDB.filter(
            (k) => k._id === state.currentRoomId,
          )
          arr =
            currentRoomMsgIDB &&
            currentRoomMsgIDB.length &&
            currentRoomMsgIDB[0].msgs
              ? [...currentRoomMsgIDB[0].msgs]
              : []
          return arr
        } catch (error) {
          console.log(error)
        }
      }
      arr = [...state.currentRoomMsg]
      return arr
    },
  },
  mutations: {
    SET_LIST_ROOMS(state, payload) {
      state.listRoom = payload
    },

    SET_LIST_ROOM_FROM_IDB(state, payload) {
      state.listRoomIDB = payload
    },
    UPDATE_LIST_MSG_BY_ROOM(state, payload) {
      state.listMsgByRoom = payload
    },
    SET_LIST_MSG_BY_ROOM(state, payload) {
      // payload type
      // {
      //   _id : roomId,
      //   msg :{}
      // }
      const idx = state.listMsgByRoom.findIndex((o) => o._id === payload._id)
      if (idx !== -1) {
        state.listMsgByRoom[idx].msgs.push(payload.msg)
      }
    },
    SET_LIST_MSG_BY_ROOM_FROM_IDB(state, payload) {
      state.listMsgByRoomIDB = payload
    },
    // Current room info
    SET_CURRENT_ROOM_ID(state, numb) {
      state.currentRoomId = numb
    },
    SET_CURRENT_ROOM_MSG(state, payload) {
      state.currentRoomMsg = payload
    },
    ADD_CURRENT_ROOM_MSG(state, payload) {
      // Vue.set(state.currentRoomMsg, state.currentRoomMsg.length, payload)
      state.currentRoomMsg.splice(state.currentRoomMsg.length - 1, 0, payload)
    },
    SET_CURRENT_ROOM_MSG_TOTAL(state, numb) {
      state.currentRoomMsgTotal = numb
    },
    SET_CURRENT_ROOM_MEMBERS(state, payload) {
      state.currentRoomMembers = payload
    },
  },
  actions: {
    async getAllRoomFromApi({ commit }) {
      const res = await chatApi.getMyGroupChat()
      if (!res) {
        return
      }
      try {
        commit("SET_LIST_ROOMS", res.data.groups)
        this._vm.$repositories.group_rooms.addArray(res.data.groups)
        // const rm = await this._vm.$indexedDB.getAll("group_rooms")
        // console.log(rm)
      } catch (error) {
        console.log(error)
      }
    },
    async getAllRoomFromDatabase({ commit }) {
      const users = await database.getUsersContact()
      for (let index = 0; index < 10; index++) {
        database.addUserContact(index)
      }
    },
    async getCurrentRoomMsgFromApi(
      { commit },
      { _roomId, count = 50, offset = 0 },
    ) {
      const res = await chatApi.getCurrentRoomMsg(_roomId, count, offset)
      if (!res) {
        return
      }
      try {
        commit("SET_CURRENT_ROOM_MSG", res.data.messages)
        commit("SET_CURRENT_ROOM_MSG_TOTAL", res.data.total)
        const obj = {
          _id: _roomId,
          msgs: res.data.messages,
        }
        this._vm.$repositories.messages_by_rooms.add(obj)
      } catch (error) {
        console.log(error)
      }
    },
    async getCurrentRoomMembersFromApi({ commit }, { _roomId, count = 1000 }) {
      const res = await chatApi.getCurrentRoomMembers(_roomId, count)
      if (!res) {
        return
      }
      try {
        commit("SET_CURRENT_ROOM_MEMBERS", res.data.members)
        // this._vm.$repositories.group_rooms.addArray(res.data.groups)
      } catch (error) {
        console.log(error)
      }
    },
    addNewMsg({ commit, state }, payload) {
      // payload type
      // {
      //   _id : roomId,
      //   msg :{}
      // }
      commit("UPDATE_LIST_MSG_BY_ROOM", payload)
      if (payload._id === state.currentRoomId) {
        commit("ADD_CURRENT_ROOM_MSG", payload.msg)
      }
    },
  },
}
export default rooms
