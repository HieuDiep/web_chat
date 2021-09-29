<template>
  <v-app class="index">
    <div>
      <v-dialog v-model="selfDialog" width="500" scrollable>
        <v-card tile>
          <v-card class="card-info">
            <div class="card-header text-left">
              <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img
                v-bind="attrs" v-on="on"
                  @click="handleClose"
                  class="img mt-1"
                  src="@/assets/leftne.png"
                  alt=""
                  srcset=""
                />
              </template>
              <span>Đóng</span>
            </v-tooltip>
            </div>
            <v-avatar size="90" class="avatar">
              <img :src="user.avatarUrl" alt="alt" />
            </v-avatar>
            <div class="text-name" style="padding-top:56px">
              <b>{{ user.name }}</b>
            </div>
            <div class="text-title pb-5">{{ user.status }}</div>
          </v-card>
          <div class="dialogne">
            <v-card class="m-0 p-4 card-info text-left px-5" tile>
              <v-card-text class="">
                <div class="text-title">Họ và tên</div>
                <div class="pb-4 text-data">
                  <b>{{ user.name }}</b>
                </div>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-text>
                <div class="text-title">Số điện thoại</div>
                <div class="pb-4 text-data">
                  <b>{{ user.name }}</b>
                </div>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-text>
                <div class="text-title">Gmail</div>
                <div class="pb-4 text-data">
                  <b>{{ user.email }}</b>
                </div>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-text>
                <div class="text-title">Facebook</div>
                <div class="pb-4 text-data">
                  <b>{{ user.email }}</b>
                </div>
              </v-card-text>
            </v-card>
            <v-card class="card-bottom px-5 card-info text-left">
              <v-card-text class="d-flex justify-content-between">
                <div class="align-start">
                  <div class="text-data"><b>Trạng thái hoạt động</b></div>
                  <p class="text-title">hiện thị khi trạng thái đang hoạt động</p>
                </div>
                <v-switch v-model="user.active"></v-switch>
              </v-card-text>
            </v-card>
            <v-card class="px-5 logout" style="border-radius: 0px !important;">
              <v-card-text v-if="yourSefl" class="text-left">
                <div class="text-title pb-4">Cài đặt</div>
                <v-divider></v-divider>
                <div class="text-data pt-4 pb-5 text-logout">
                  <b class="pointer" color="#EC0C3A" @click="handleLogout"
                    >Đăng xuất</b
                  >
                </div>
              </v-card-text>
              <v-card-text v-else class="text-left">
                <div class="text-title pb-4">Gửi tin nhắn</div>
                <v-divider></v-divider>
                <div class="text-data pt-4 pb-5 text-logout">
                  <b class="pointer" color="#EC0C3A" @click="handleLogout"
                    >Chặn Người dùng này</b
                  >
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex"
export default {
  components: {
  },
  props: {
    dialog: {
      type: Boolean,
    },
    yourSefl: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user.me,
    }),
  },
  data() {
    return {
      selfDialog: true,
    }
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.selfDialog = true
      }
    },
    selfDialog() {
      if (!this.selfDialog) {
        this.handleClose()
      }
    },
  },
  created() {},
  methods: {
    handleLogout() {
      // this.dialog=false
      this.$store.commit("SET_DIALOG", false)
      this.$store.commit("CONFIRM_LOGOUT", true)
    },
    handleClose() {
      this.$emit("handleClose")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
@import "@/assets/style/_flex.scss";
.index {
  z-index: 5;
}

.card-bottom {
  border-top: 10px solid #ebf1f7;
}
.img {
  padding: 4px 0 0 4px !important;
  cursor: pointer;
}
.pointer {
  cursor: pointer;
}
.card-header {
  height: 141px;
  background: #0052a2 0% 0% no-repeat padding-box !important;
  opacity: 1;
  border-radius: 0 0 450px 450px/ 0 0 75px 75px !important;
}
.card-info {
  position: relative;
  border-bottom: 14px solid #ebf1f7 !important;
  border-radius: 0px !important;
}
.avatar {
  position: absolute;
  left: 42%;
  top: 34%;
  background-color: white;
}
.text-name {
  font-size: 24px;
}
.text-title {
  color: #a0b3ce;
  font-size: 15px;
}
.text-data {
  color: #333333;
  font-size: 16px;
}
.text-logout {
  color: #ec0c3a;
}
.dialogne{
  overflow-y: scroll;
  border: none;
  border-top: 5px solid white;
  z-index: 1;
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
  &::-webkit-scrollbar-thumb:hover {
    border-radius: 10px;
    background: #b9c0cc;
    opacity: 0.6;
  }
}
.logout{
  box-shadow: unset !important;
}
</style>
