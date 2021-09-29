<template>
  <div id="app">
    <router-view />
    <PreviewImage
      v-if="onViewDetailImg"
      :items="listImgPreview"
      :handler-close-popup="handlerClosePopup"
      :item-idx="itemIdx"
    />
    <UserDetail
      v-if="dialog"
      :dialog="dialog"
      @handleClose="handleClose"
      :yourSefl="true"
    ></UserDetail>
     <ConfirmSignout v-if="logoutIsOpen" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import PreviewImage from "@/components/Layout/PreviewImage.vue"
import "@/indexedDB"
import UserDetail from "@/components/Dialog/UserDetail.vue"
import ConfirmSignout from "@/components/Dialog/ConfirmSignout.vue"

export default {
  components: {
    UserDetail,
    PreviewImage,
    ConfirmSignout,
  },
  async mounted() {
    // console.log(this.$indexedDB)

    if (this.auth.user) {
      // this.$store.dispatch("getAllRoomFromApi")
      // const res = await this.$repositories.getAll("group_rooms")
      // console.log(res)
      // this.$indexedDB.add("users_contact", [
      //   { id: 1, name: "hehe" },
      //   { id: 3, name: "hahaaa" },
      // ])
    }
  },
  computed: {
    ...mapState({
      dialog: (state) => state.dialog,
      auth: (state) => state.auth,
      listImgPreview: (state) => state.listImgPreview,
      itemIdx: (state) => state.imageIdx,
      logoutIsOpen: (state) => state.logoutIsOpen,
    }),
    onViewDetailImg() {
      return !!this.listImgPreview && this.listImgPreview.length
    },
  },
  watch: {
    auth: {
      deep: true,
      async handler() {
        if (this.auth.user) {
          // this.$store.dispatch("getAllRoomFromApi")
          // const res = await this.$repositories.group_rooms.getAll()
          // console.log(res)
          // await database.getDatabase()
          // const res = await this.$indexedDB.getAll("users_contact")
          // console.log(res)
        }
      },
    },
  },
  methods: {
    handlerClosePopup() {
      this.$store.commit("SET_LIST_IMAGE_PREVIEW", [])
      this.$store.commit("SET_INDEX_IMAGE_PREVIEW", 0)
    },
    handleClose() {
      this.$store.commit("SET_DIALOG", false)
    },
  },
}
</script>
<style lang="scss">
@import "@/assets/style/main.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
