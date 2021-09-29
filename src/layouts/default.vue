<template>
  <div class="container-fluid-t layout-default">
    <div class="sidebar-container">
      <keep-alive>
        <SideBar
          :sidebar-is-collapse="sidebarIsCollapse"
          :toggle-colappse="toggleColappse"
        />
      </keep-alive>
    </div>
    <div class="rest-container" :class="isMini ? 'rest-container-full' : ''">
      <!-- <TopMarker /> -->
      <keep-alive>
        <slot></slot>
      </keep-alive>
    </div>
    <div v-if="currentRouteId" class="sidebar-right">
      <keep-alive>
        <SideBarRight />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Layout/Sidebar.vue"
import SideBarRight from "@/components/Layout/SideBarRight.vue"

// import TopMarker from "@/components/Layout/TopMarker.vue";
import { mapState } from "vuex"
export default {
  components: {
    SideBar,
    SideBarRight,
    // TopMarker,
    // BreadCrumb
  },
  data() {
    return {
      sidebarIsCollapse: false,
      viewWidth: 1920,
      showBC: true,
      currentRouteId: "",
    }
  },
  async created() {
    this.viewWidth = window.outerWidth
    const currentParams = this.$route.params
    if (currentParams) {
      this.currentRouteId = currentParams.id
    }
    if (this.$route.fullPath.includes("/login")) {
      this.showBC = false
    }
    this.setListMsgByRoomFromIDB()
    const group_rooms = await this.$repositories.group_rooms.getAll()
    const users = await this.$repositories.users.getAll()
    if (group_rooms) {
      this.$store.commit("SET_LIST_ROOM_FROM_IDB", group_rooms)
    }
    if (users) {
      this.$store.commit("SET_LIST_USER_FROM_IDB", users)
    }
    if (this.auth.user) {
      this.$store.dispatch("getAllRoomFromApi")
      this.$store.dispatch("getAllUsersFromApi")
    }
  },
  computed: {
    ...mapState({
      countryList: (state) => state.others.listCountries,
      roleList: (state) => state.others.listRole,
      isMini: (state) => state.isMini,
      auth: (state) => state.auth,
    }),
  },
  watch: {
    auth: {
      deep: true,
      handler() {
        if (this.auth.user) {
          this.$store.dispatch("getAllRoomFromApi")
          console.log("hehe")
          this.$store.dispatch("getAllUsersFromApi")
        }
      },
    },
    $route(_newVal) {
      const currentParams = _newVal.params
      if (currentParams) {
        this.currentRouteId = currentParams.id
      }
    },
  },
  methods: {
    toggleColappse() {
      this.sidebarIsCollapse = !this.sidebarIsCollapse
    },
    async setListMsgByRoomFromIDB() {
      try {
        const res = await this.$repositories.messages_by_rooms.getAll()
        this.$store.commit("SET_LIST_MSG_BY_ROOM_FROM_IDB", res)
        this.$store.commit("SET_LIST_MSG_BY_ROOM", res)
      } catch (error) {
        console.log(error, "error when get msg by room from idb")
      }
    },
  },
}
</script>

<style lang="scss">
.layout-default {
  display: flex;
}
.rest-container {
  padding: 0;
  width: calc(100% - 250px);
}
.rest-container-full {
  width: 100%;
}
.v-application--wrap {
  display: none !important;
}
</style>
