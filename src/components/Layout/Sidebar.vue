<template>
  <v-card class="sidebar-card-body bg-white" style="position: unset">
    <!-- <v-btn color="accent" x-small elevation="2" class="btn-toggle-mini" :class="mini ? 'goto-collapse' : 'goto-expand'" @click="toggleMini">
   <v-icon>mdi-chevron-left</v-icon>
  </v-btn> -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      width="100%"
      style="border-radius: unset"
    >
      <v-list-item class="px-0">
        <div class="sidebar-logo-link pointer"></div>
      </v-list-item>
      <div class="user-left">
        <div class="us-ft-wr position-relative pointer">
          <v-badge bordered top color="#F48131" dot offset-x="12" offset-y="10">
            <v-avatar
              style="border: 2px solid #ffff"
              size="44"
              @click="showUserFt = true"
            >
              <v-img
                src="https://www.pngkit.com/png/full/83-835129_yellow-claw.png"
              ></v-img>
            </v-avatar>
          </v-badge>
        </div>
      </div>
      <!-- <v-divider></v-divider> -->
    </v-navigation-drawer>
    <div class="sidebar-right">
      <p class="header" v-if="tab == 0">Tin nhắn</p>
      <p class="header" v-if="tab == 1">Nhóm chờ</p>
      <div class="filter-group--mod">
        <img src="@/assets/images/search-icon.png" height="20" alt="" />
        <input
          class="w-100"
          type="text"
          placeholder="Tìm kiếm tin nhắn hoặc nhóm..."
        />
      </div>
      <v-tabs v-model="tab" grow>
        <v-tab style="font-size: 18px">Nhóm của bạn</v-tab>
        <v-tab style="font-size: 18px">Nhóm chờ</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="px-0">
        <v-tab-item>
          <div
            class="user-block px-0"
            v-for="(room, idx) in listRoomParsed"
            :key="idx"
            :class="currentRouteId === room._id ? 'active-room' : ''"
            @click="navigateTo(`/room/${room._id}`)"
          >
            <div class="user-block-top-l px-3">
              <div class="user-block-top col-3 p-0">
                <div class="left-side">
                  <v-badge
                    bordered
                    top
                    color="#F48131"
                    dot
                    offset-x="6"
                    offset-y="10"
                  >
                    <v-avatar size="44">
                      <!-- <v-img
                        v-if="room.lastMessage"
                        :src="room ? room.avatar : ''"
                      ></v-img> -->
                      <img
                        class="room-avatar"
                        src="../../assets/images/logo-fav.png"
                        alt=""
                      />
                    </v-avatar>
                  </v-badge>
                </div>
              </div>
              <div class="item-circle col-9 p-0">
                <div class="right-side">
                  <div class="right-side-top d-flex justify-content-between">
                    <p class="user-name">
                      {{ room ? room.convert_name : "---" }}
                    </p>
                    <p class="user-des">
                      {{ parseDateLm(room._updatedAt) }}
                    </p>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <p class="user-content col-10 text-left">
                      {{ room.lastMessage ? room.lastMessage.msg : "" }}
                    </p>
                    <div class="col-2 p-0 d-flex justify-content-end">
                      <div class="circle">3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="user-block-bottom pr-4 pl-3">
              <img
                class="class-avatar ml-2"
                :src="room.class ? room.class.avatar : ''"
                height="26px"
              />
              <p class="class-name-l ml-2">
                {{ room ? room.convert_name : "room_name" }}
              </p>
              <div class="class-list">
                <div>
                  <img
                    class="class-list-avatar"
                    :src="room.class ? room.class.avatar : ''"
                    height="26px"
                  />
                </div>
                <div style="margin-left: -12px">
                  <img
                    class="class-list-avatar"
                    :src="room.class ? room.class.avatar : ''"
                    height="26px"
                  />
                </div>
                <div style="margin-left: -12px">
                  <img
                    class="class-list-avatar"
                    :src="room.class ? room.class.avatar : ''"
                    height="26px"
                  />
                </div>
                <div
                  style="margin-left: -12px; border-radius: 50%; color: #ebf1f7"
                  class="circle2"
                >
                  +3
                </div>
              </div>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item class="tab-wait">
          <div
            class="user-block pt-6 pb-4"
            v-for="(room, idx) in groups"
            :key="idx"
          >
            <div class="user-block-top px-4">
              <div class="left-side">
                <img
                  class="user-avatar"
                  src="https://www.pngkit.com/png/full/83-835129_yellow-claw.png"
                  height="60px"
                  @click="handleOpenSelect"
                />
              </div>
              <div class="right-side">
                <p class="user-name">
                  {{ room.group_name }}
                </p>
                <p class="user-content text-left room-last-msg">
                  {{ room.group_name }}
                </p>
              </div>
            </div>
            <div class="user-block-bottom">
              <div class="tab-block-bottom-l">
                <img
                  class="class-avatar"
                  src="https://www.pngkit.com/png/full/83-835129_yellow-claw.png"
                  height="26px"
                />
                <p class="class-name">{{ room.emails.length }} Thành viên</p>
              </div>
              <div class="class-list">
                <v-btn color="#F48131" rounded height="30" elevation="0"
                  ><p class="p-0 btn-text">Tham gia</p></v-btn
                >
              </div>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <div
      v-if="showUserFt"
      class="ft-wr position-fixed"
      @click="showUserFt = false"
    >
      <div class="menu-user">
        <p
          class="mb-0 font-size-14 pointer text-left each-ft"
          @click="handleUserDetail"
        >
          Chi tiết
        </p>
        <p
          class="mb-0 font-size-14 pointer text-left each-ft"
          @click="handleLogout"
        >
          Đăng xuất
        </p>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import api from "@/services"
import { convertHexToUTF8 } from "@/utils"
import { tDate } from "validation_t/src"
import RouteMix from "@/mixins/RouteMix.js"
import io from "socket.io-client"
export default {
  name: "SideBar",
  props: {
    sidebarIsCollapse: Boolean,
    toggleColappse: Function,
  },
  mixins: [RouteMix],
  data() {
    return {
      showUserFt: false,
      dataSidebar: [
        {
          name: "Maeve Willey",
          openWord:
            "i got what u need,i got what u neei got what u neei got what u neei got what u nee ",
          avatar: "https://www.pngkit.com/png/full/83-835129_yellow-claw.png",
          class: {
            name: "Lớp KOTL",
            avatar: "https://www.pngkit.com/png/full/83-835129_yellow-claw.png",
            listMembers: [
              {
                name: "no1",
                avatar:
                  "https://www.pngkit.com/png/full/83-835129_yellow-claw.png",
              },
              {
                name: "no2",
                avatar:
                  "https://www.pngkit.com/png/full/83-835129_yellow-claw.png",
              },
            ],
          },
        },
        {
          name: "Otis Milburn",
          openWord: "bully maguire",
          avatar: "https://www.pngkit.com/png/full/83-835129_yellow-claw.png",
          class: {
            name: "Lớp 3",
            avatar: "https://www.pngkit.com/png/full/83-835129_yellow-claw.png",
            listMembers: [
              {
                name: "no1",
                avatar:
                  "https://www.pngkit.com/png/full/83-835129_yellow-claw.png",
              },
              {
                name: "no2",
                avatar:
                  "https://www.pngkit.com/png/full/83-835129_yellow-claw.png",
              },
            ],
          },
        },
      ],
      currentRouteId: "",
      currentTab: "aprroval",
      signOut: false,
      drawer: true,
      tab: 0,
      mini: false,
      groups: [],
      listRoomsFromIDB: [],
      socket: io(),
    }
  },
  async created() {
    this.getAllGroups()
  },
  computed: {
    ...mapState({
      logoutIsOpen: (state) => state.logoutIsOpen,
      isMini: (state) => state.isMini,
      listRooms: (state) => state.rooms.listRoom,
      listRoomIDB: (state) => state.rooms.listRoomIDB,
      auth: (state) => state.auth,
      isConnected: (state) => state.socket.isConnected,
    }),
    listRoomComputed() {
      let arr = []
      if (!this.listRooms || !this.listRooms.length) {
        arr =
          this.listRoomIDB && this.listRoomIDB.length
            ? [...this.listRoomIDB]
            : []
      } else {
        arr = [...this.listRooms]
      }
      return arr
    },
    listRoomParsed() {
      let arr = [...this.listRoomComputed]
      arr.forEach((o) => (o.convert_name = convertHexToUTF8(o.fname)))
      return arr
    },
    ...mapGetters({
      user: "getUser",
    }),
  },
  mounted() {
    const _this = this
    this.lm()
    const currentParams = this.$route.params

    if (currentParams) {
      this.currentRouteId = currentParams.id
    }
    this.$socket.onmessage = function (event) {
      const data = JSON.parse(event.data)
      console.log(data)
      if (data.msg === "changed") {
        if (data.collection === "stream-room-messages") {
          // tin nhắn mới
          let arrmsg = data.fields.args

          arrmsg.forEach((o) => {
            const msgComputed = { ...o }
            if (o.ts.$date) {
              msgComputed.ts = new Date(o.ts.$date).toISOString()
            }
            const payloadPushStore = {
              _id: o.rid,
              msg: msgComputed,
            }
            _this.$store.dispatch("addNewMsg", payloadPushStore)
          })
        }
      }
    }
    this.$socket.send(
      JSON.stringify({
        msg: "sub",
        id: `${this.currentRouteId}`,
        name: "stream-room-messages",
        params: [`${this.currentRouteId}`, false],
      }),
    )
  },
  watch: {
    $route(_newVal) {
      const currentParams = _newVal.params
      if (currentParams) {
        this.currentRouteId = currentParams.id
        this.$socket.emit(
          "send",
          JSON.stringify({
            msg: "sub",
            id: `${this.currentRouteId}`,
            name: "stream-room-messages",
            params: [`${this.currentRouteId}`, false],
          }),
        )
      }
    },
    isConnected: {
      deep: true,
      async handler() {
        await this.lm()
        await this.$socket.send(
          JSON.stringify({
            msg: "sub",
            id: `${this.currentRouteId}`,
            name: "stream-room-messages",
            params: [`${this.currentRouteId}`, false],
          }),
        )
        const _this = this
        if (this.isConnected) {
          this.$socket.onmessage = function (event) {
            const data = JSON.parse(event.data)
            // console.log(data)
            if (data.msg === "changed") {
              if (data.collection === "stream-room-messages") {
                // tin nhắn mới
                let arrmsg = data.fields.args
                arrmsg.forEach((o) => {
                  const msgComputed = { ...o }
                  if (o.ts.$date) {
                    msgComputed.ts = new Date(o.ts.$date).toISOString()
                  }
                  const payloadPushStore = {
                    _id: o.rid,
                    msg: msgComputed,
                  }
                  _this.$store.dispatch("addNewMsg", payloadPushStore)
                })
              }
            }
          }
        }
      },
    },
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
    currentTab() {
      if (this.currentTab === "sso") {
        this.$nextTick(() => {
          this.currentTab = "aprroval"
        })
      }
    },
  },

  methods: {
    async getAllGroups() {
      const res = await api.groups.getAllGroup()
      this.groups = res.data.data
    },
    redirectToApps() {
      window.open(`${process.env.VUE_APP_LOGIN_URL}`)
    },

    onChangeTabs(val) {
      console.log(val)
    },
    handleLogout() {
      this.$store.commit("CONFIRM_LOGOUT", true)
    },
    handleUserDetail() {
      this.$store.commit("SET_DIALOG", true)
    },
    handleOpenSelect() {
      this.dialog = false
    },
    parseDateLm(_date) {
      if (!_date) {
        return ""
      }
      const dateObj = tDate.formatDateCustomize(_date)
      return `${dateObj.hh}:${dateObj.mm} ${dateObj.dd}/${dateObj.MM}`
    },
    lm() {
      const params = [
        {
          resume: this.auth.user.authToken,
        },
      ]
      this.$socket.send(
        JSON.stringify({
          msg: "method",
          method: "login",
          id: "42",
          params,
        }),
      )
    },
  },
}
</script>

<style lang="scss" scopped>
@import "@/assets/style/_variables.scss";
@import "@/assets/style/_flex.scss";
@import "@/assets/style/_text.scss";

.sidebar-container {
  height: 100vh;
  width: 510px;
  position: sticky;
  top: 0;
  .theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
    color: #a0b3ce;
  }
  .v-tabs--grow > .v-tabs-bar .v-tab {
    max-width: 50%;
    font-size: 16px;
    text-transform: none;
    color: #a0b3ce;
    background-color: #ffffff;
    font-weight: 500;
    &--active {
      color: #0052a2;
    }
  }
  .sidebar-right .sb-bottom .v-tab:before:hover {
    background-color: #09213a;
  }
  .v-tab:before,
  .v-tabs-slider {
    background-color: #0052a2;
  }
  .v-window > .v-window__container > .v-window-item {
    background-color: #f6f9fb;
  }
  .v-navigation-drawer {
    height: calc(100% - 80px);
  }
  .v-navigation-drawer__content {
    overflow: hidden;
  }
  .body-sidebar-dense {
    height: calc(100% - 183px);
    overflow-y: scroll;
    &-mini {
      padding-left: 6px !important;
    }
    &::-webkit-scrollbar {
      width: 5px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: none;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0);
    }
  }

  .user-left {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    .user-avatar {
      border-radius: 50%;
      border: 2px solid #ffffff;
      cursor: pointer;
    }
  }

  .sidebar-card-body {
    display: flex;
    box-shadow: none !important;
    width: 510px;
    height: 100vh;
    .v-navigation-drawer {
      height: 100%;
      width: 100px !important;
    }
    .v-navigation-drawer__content {
      background-color: #0052a2 !important;
      height: 100%;
    }
    .v-navigation-drawer__border {
      display: none !important;
    }
    /* position: relative; */

    .sidebar-right {
      width: 410px;
      padding: 35px 22px;
      background-color: #f6f9fb;
      .user-block {
        background-color: #ffffff;
        width: 100%;
        margin-top: 16px;
        border: 1px solid #ffffff;
        padding: 28px 16px 17px 18px;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
          background-color: #e2edee1a;
        }
        .user-block-top {
          display: flex;
          height: 65%;
          .left-side {
            margin-right: 18px;
            .user-avatar {
              border-radius: 50%;
            }
          }
          .right-side {
            .user-name {
              color: #333333;
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 10px;
              text-align: left;
            }
            .user-content {
              color: #a0b3ce;
              font-size: 15px;
              font-weight: 400;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }
          }
        }
        .user-block-top-l {
          display: flex;
          justify-content: space-between;
          width: 100%;
          border-bottom: 2px solid #f5f8fb;
          .user-block-top {
            padding: 0 0 0 20px;
            display: unset;
            height: 65%;
            .left-side {
              margin-right: 18px;
              .user-avatar {
                border-radius: 50%;
              }
            }
          }
        }
        .item-circle {
          display: flex;
          flex-flow: column;
          .right-side {
            .user-name {
              color: #333333;
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 10px;
              text-align: left;
            }
            .user-content {
              padding: 0;
              color: #a0b3ce;
              font-size: 15px;
              font-weight: 400;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }
            .user-des {
              text-align: end;
              font-weight: bold;
              font-size: 10px;
              color: #a0b3ce;
              margin: 0;
              padding: 0;
            }
            .item-circle {
              padding: 0;
              display: flex;
              flex-flow: column;
              .circle {
                display: flex;
                align-self: end;
                justify-content: center;
                align-items: center;
                text-align: end;
                background: #0052a2;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                color: #ffff;
                font-size: 10px !important;
                margin: auto 0;
              }
            }
          }
          .user-des {
            text-align: end;
            font-weight: bold;
            font-size: 10px;
            color: #a0b3ce;
            margin: 0;
            padding: 0;
          }
          .circle {
            display: flex;
            align-self: end;
            justify-content: center;
            align-items: center;
            text-align: end;
            background: #0052a2;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            color: #ffff;
            font-size: 10px;
            margin: auto 0;
          }
        }

        .user-block-bottom {
          display: flex;
          margin: 17px 19px 0 12px;
          align-items: center;
          .class-avatar {
            border-radius: 50%;
            margin-right: 16px;
          }
          .class-name {
            color: #a0b3ce;
            font-size: 15px;
          }
          .class-name-l {
            color: #0052a2;
            font-size: 16px;
            font-weight: bold;
          }
          .class-list {
            display: flex;
            right: 18px;
            position: absolute;
            .class-list-avatar {
              border-radius: 50%;
              border: 2px solid #ffff;
            }
            .circle2 {
              display: flex;
              align-self: end;
              justify-content: center;
              align-items: center;
              text-align: end;
              background: #0052a2;
              width: 26px;
              height: 26px;
              border-radius: 50%;
              color: #ffff;
              font-size: 10px !important;
              margin-bottom: 4px;
            }
            .btn-text {
              color: #ffff;
              text-transform: initial;
              font: normal 15px Roboto;
            }
          }
        }
      }
      .tab-wait {
        height: 75vh;
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          width: 5px;
          height: 6px;
        }

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0);
          border-radius: 10px;
          box-shadow: none;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.48);
          opacity: 0.6;
        }
        .user-block {
          background-color: #ffffff;
          width: 100%;
          margin-top: 16px;
          border: 1px solid #ffffff;
          padding: 28px 0 17px 0;
          border-radius: 8px;

          .user-block-top {
            display: flex;
            border-bottom: 2px solid #f5f8fb;
            .left-side {
              .user-avatar {
                border-radius: 50%;
              }
            }
            .right-side {
              .user-name {
                color: #333333;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
                text-align: left;
              }
            }
          }
          .user-block-bottom {
            display: flex;
            margin: 17px 24px 0 24px;
            align-items: center;
            justify-content: space-between;
            align-self: center;
            .tab-block-bottom-l {
              display: flex;
              .class-avatar {
                border-radius: 50%;
                margin-right: 16px;
              }
              .class-name {
                color: #a0b3ce;
                font-size: 15px;
                align-self: center;
              }
            }
            .class-list {
              display: flex;
              right: 24px;
              position: unset;
              .class-list-avatar {
                border-radius: 50%;
                border: 2px solid #ffff;
              }
              .circle2 {
                display: flex;
                align-self: end;
                justify-content: center;
                align-items: center;
                text-align: end;
                background: #0052a2;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                color: #ffff;
                font-size: 10px;
                margin-bottom: 4px;
              }
              .btn-text {
                color: #ffff;
                text-transform: initial;
                font: normal 15px Roboto;
              }
            }
          }
        }
      }
      .header {
        margin-bottom: 29px;
        text-align: left;
        color: #333333;
        font-size: 24px;
        font-weight: bold;
      }
      .filter-group--mod {
        background-color: #ebf1f7;
        padding: 15px 10px 14px 20px;
        border: 1px solid $borderColor;
        border-radius: 14px;
        height: 47px;
        border: solid 1px $borderColor;
        min-width: 365px;
        width: 365px;
        text-align: left;
        display: flex;
        align-items: center;
        img {
          height: 16px;
        }
        input {
          padding: 0 10px;
          outline: none;
          font-size: 15px;
          &::placeholder {
            font-size: 11px;
            color: #a0b3ce;
          }
        }
      }
    }
  }
}
.sidebar-logo {
  max-width: 200px;
  display: block;
  margin: auto;
}
.sidebar-logo-link {
  height: 70px;
  display: flex;
  width: 70%;
}

.ft-wr {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 15;
  background: rgba(255, 255, 255, 0);
  position: fixed;
  width: 100vw;
  height: 100vh;
  .menu-user {
    padding: 12px 0;
    background-color: white;
    border-radius: 4px;
    position: absolute;
    bottom: 60px;
    left: 90px;
    overflow: hidden;
    min-width: 140px;
    .each-ft {
      padding: 6px 12px;
      font-weight: 500;
      transition: 0.3s ease;
      &:hover {
        background-color: #0051a259;
      }
    }
  }
}

.sb-item-menu {
  &:hover {
    &::before {
      background-color: #65c6f388 !important;
      opacity: 0.5 !important;
    }
  }
}
.room-avatar {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background: #0052a2 0% 0% no-repeat padding-box;
}
.active-room {
  background-color: #d3e9eb1b !important;
  border-color: #0052a2 !important;
}
</style>
