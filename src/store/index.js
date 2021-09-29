import Vue from "vue"
import Vuex from "vuex"
import rooms from "./rooms"
import user from "./users"
Vue.use(Vuex)
export default new Vuex.Store({
  state: () => ({
    dialog: false,
    auth: {
      isAuth: false,
      user: null,
      token: null,
    },
    logoutIsOpen: false,
    fileType: {
      image: [
        "jpg",
        "png",
        "jpeg",
        "gif",
        "webp",
        "JPG",
        "PNG",
        "JPEG",
        "GIF",
        "WEBP",
      ],
      files: [
        "xlsx",
        "pdf",
        "docx",
        "txt",
        "text",
        "xls",
        "XLSX",
        "PDF",
        "DOCX",
        "TXT",
        "TEXT",
        "bpmn",
        "BPMN",
        "rar",
        "RAR",
        "zip",
        "ZIP",
        "apk",
        "APK",
        "exe",
        "EXE",
        "dll",
        "DLL",
        "json",
        "JSON",
      ],
      pdf: ["pdf", "PDF"],
      doc: ["docx", "DOCX", "doc"],
      xls: ["xls", "xlsx", "XLSX"],
      video: [
        "mp4",
        "MP4",
        "mpeg4",
        "MPEG4",
        "avi",
        "AVI",
        "mpg",
        "mpeg",
        "MPEG",
        "wmv",
        "WMV",
        "ogg",
        "Ogg",
        "OGG",
        "webm",
        "WebM",
        "WEBM",
        "mov",
        "MOV",
      ],
    },
    listImgPreview: [],
    imageIdx: 0,
    // SOCKET
    socket: {
      isConnected: false,
      message: "",
      reconnectError: false,
      loggedInUser: {},
      isLogging: false,
      errorLogging: "",
      isReconnecting: false,
    },
  }),
  mutations: {
    SET_USER_LOGGEDIN(state, payload) {
      state.auth = { ...payload }
    },
    SET_LOGOUT_USER(state) {
      state.auth = { isAuth: false, user: null, token: null }
    },
    SET_LIST_IMAGE_PREVIEW(state, payload) {
      state.listImgPreview = payload
    },
    SET_INDEX_IMAGE_PREVIEW(state, payload) {
      state.imageIdx = payload
    },
    CONFIRM_LOGOUT(state, payload) {
      state.logoutIsOpen = payload
    },
    // SOCKET
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
      if (state.socket.isReconnecting) {
        state.socket.isReconnecting = false
      }
      Vue.prototype.$socket.send(
        JSON.stringify({
          msg: "connect",
          version: "1",
          support: ["1"],
        }),
      )
      console.log(Vue.prototype.$socket)
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      // console.log(message, "msgg")
      state.socket.message = message
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      state.socket.isReconnecting = true
      console.info(state.socket, count, "reconnect socket")
      if (count >= 3) {
        // window.location.href = '/';
      }
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true
    },
    SET_DIALOG(state, payload) {
      state.dialog = payload
    },
  },
  actions: {},
  modules: { rooms, user },
})
