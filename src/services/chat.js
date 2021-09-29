const CHAT_URL = process.env.VUE_APP_BASE_URL_CHAT
// const X_API_KEY = process.env.VUE_APP_X_API_KEY;
import store from "../store"
const usersRepo = (axios) => {
  return {
    getMyGroupChat() {
      const _axios = axios.create()
      if (!store.state.auth.user) {
        return
      }
      delete _axios.defaults.headers.Authorization
      const localToken = store.state.auth.user.authToken
      const userId = store.state.auth.user.userId
      const header = {
        "X-Auth-Token": localToken,
        "X-User-Id": userId,
      }
      return _axios
        .get(`${CHAT_URL}/api/v1/groups.list`, {
          headers: header,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },

    getAllUsers() {
      const _axios = axios.create()
      if (!store.state.auth.user) {
        return
      }
      delete _axios.defaults.headers.Authorization
      const localToken = store.state.auth.user.authToken
      const userId = store.state.auth.user.userId
      const header = {
        "X-Auth-Token": localToken,
        "X-User-Id": userId,
      }
      return _axios
        .get(`${CHAT_URL}/api/internal/users?pagination=false`, {
          headers: header,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getCurrentRoomMsg(_roomId, count, offset) {
      const _axios = axios.create()
      if (!store.state.auth.user) {
        return
      }
      delete _axios.defaults.headers.Authorization
      const localToken = store.state.auth.user.authToken
      const userId = store.state.auth.user.userId
      const header = {
        "X-Auth-Token": localToken,
        "X-User-Id": userId,
      }
      return _axios
        .get(
          `${CHAT_URL}/api/v1/groups.messages?roomId=${_roomId}&${count}=100&${offset}=0`,
          {
            headers: header,
          },
        )
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getCurrentRoomMembers(_roomId, count = 1000) {
      const _axios = axios.create()
      if (!store.state.auth.user) {
        return
      }
      delete _axios.defaults.headers.Authorization
      const localToken = store.state.auth.user.authToken
      const userId = store.state.auth.user.userId
      const header = {
        "X-Auth-Token": localToken,
        "X-User-Id": userId,
      }
      return _axios
        .get(
          `${CHAT_URL}/api/v1/groups.members?roomId=${_roomId}&${count}=1000`,
          {
            headers: header,
          },
        )
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    // Chat
    sendMsg(msg) {
      const _axios = axios.create()
      if (!store.state.auth.user) {
        return
      }
      delete _axios.defaults.headers.Authorization
      const localToken = store.state.auth.user.authToken
      const userId = store.state.auth.user.userId
      const header = {
        "X-Auth-Token": localToken,
        "X-User-Id": userId,
      }
      return _axios
        .post(`${CHAT_URL}/api/v1/chat.sendMessage`, msg, {
          headers: header,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
  }
}
export default usersRepo
