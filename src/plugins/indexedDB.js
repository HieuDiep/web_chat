import IndexedDB from "../indexedDB"
import Vue from "vue"
const indexedDB = new IndexedDB("mv_talk", 1)
localStorage.setItem("idb_lastest_version", 1)
Vue.prototype.$indexedDB = indexedDB
