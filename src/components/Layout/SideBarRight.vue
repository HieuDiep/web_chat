<template>
  <v-card
    height="100vh"
    width="400"
    outlined
    tile
    style="border-radius: 0"
    data-app
  >
    <div class="sidebar-right">
      <div class="sb-top d-flex align-center justify-content-between mx-4">
        <div class="img">
          <img src="@/assets/left.png" />
        </div>
        <div class="img">
          <img src="@/assets/horizone.png" />
        </div>
      </div>
      <v-divider></v-divider>
      <div class="sb-bottom">
        <div class="mt-5">
          <v-avatar size="90">
            <v-img
              src="https://www.pngkit.com/png/full/83-835129_yellow-claw.png"
            ></v-img>
          </v-avatar>
          <div class="text-title my-3">Lớp Prek</div>
          <div class="text-des">
            <p>Nhóm dành cho các thành viên lớp mẫu giáo Prek</p>
          </div>
        </div>
        <div class="menu mt-5 mx-4">
          <v-tabs v-model="tab" grow light height="49" class="mb-5">
            <v-tab class="item">Thành viên</v-tab>
            <v-tab class="item"> Media</v-tab>
            <v-tab class="item">Files</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item class="list-user">
              <v-card
                class="user-block px-0"
                v-for="(member, idx) in [...dataSidebar, ...dataSidebar]"
                :key="idx"
                tile
                style="border-radius: 0; box-shadow: none"
              >
                <div class="d-flex align-center justify-content-between py-4">
                  <div class="d-flex align-center justify-content-between">
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
                          <v-img :src="member.avatar"></v-img>
                        </v-avatar>
                      </v-badge>
                    </div>
                    <div class="ml-4">
                      <p class="text-left font-weight-bold">
                        {{ member.name }}
                      </p>
                      <p class="text-left text-des mt-2">Online</p>
                    </div>
                  </div>
                  <div class="select pointer">
                    <v-menu
                      bottom
                      left
                      :offset-y="true"
                      content-class="elevation-0"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <div color="primary" dark v-bind="attrs" v-on="on">
                          <img src="@/assets/horizone.png" />
                        </div>
                      </template>
                      <v-card elevation="0" class="menu-action" max-width="160">
                        <v-list class="p-0">
                          <v-list-item class="menu-action-item">
                            <v-list-item-title
                              class="text-left"
                              style="color: #a0b3ce; font-size: 16px"
                              >Profile</v-list-item-title
                            >
                            <img src="@/assets/person.png" />
                          </v-list-item>
                          <v-list-item class="menu-action-item">
                            <v-list-item-title
                              class="text-left"
                              style="color: #a0b3ce; font-size: 16px"
                              >Hạn chế</v-list-item-title
                            >
                            <img src="@/assets/chart.png" />
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item class="menu-action-item">
                            <v-list-item-title
                              class="text-left"
                              style="color: red; font-size: 16px"
                              >Xóa</v-list-item-title
                            >
                            <img src="@/assets/delete.png" />
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-menu>
                  </div>
                </div>
                <v-divider></v-divider>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <h1>Media</h1>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <h1>Files</h1>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
// import { mapGetters, mapState } from "vuex"
// import api from "@/services"
// import ConfirmSignout from "@/components/Dialog/ConfirmSignout.vue"
// import UserDetail from "@/components/Dialog/UserDetail.vue"
// import { convertHexToUTF8 } from "@/utils"

export default {
  name: "SideBarRight",
  props: {},
  components: {},

  data() {
    return {
      menu: false,
      tab: 0,
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
    }
  },
  created() {},

  methods: {},
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
.sidebar-right {
  background-color: $primaryWhite;
  .sb-top {
    height: 100px;
  }
  .sb-bottom {
    .text-title {
      font-size: 24px !important;
      font-weight: bold;
    }
    .text-des {
      color: #a0b3ce;
      font-size: 15px;
      width: 170px;
      margin: 0 auto;
    }
    .menu {
      position: relative;
      height: calc(100vh - 420px);
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
      &::-webkit-scrollbar-thumb:hover {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.48);
        opacity: 0.6;
      }
      .item {
        border-radius: 25px;
      }
      .v-tabs {
        position: sticky;
        top: 0;
        z-index: 2;
        background-color: #fff;
      }
    }
    .menu-detail {
      position: absolute;
      right: 43%;
      font-size: 12px !important;
      line-height: 12px !important;
      width: 156px;
      height: 100px;
      padding: 0;
      min-height: 30px !important;
      .item {
        min-height: 30px;
        cursor: pointer;
      }
      .item:hover {
        background-color: #dee5eb;
      }
    }
    .theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
      color: #a0b3ce;
    }
    .v-tabs-slider-wrapper {
      display: none;
    }
    .theme--light.v-tabs > .v-tabs-bar {
      background-color: #ebf1f7;
      border-radius: 25px;

      padding: 0 16px;
    }
    .v-tabs--grow > .v-tabs-bar .v-tab {
      max-width: 50%;
      font-size: 15px;
      text-transform: none;
      color: white;
      font-weight: 500;
      &--active {
        margin: 8px 0;
        color: black;
        background-color: rgb(255, 255, 255);
      }
    }
    .sidebar-right .sb-bottom .v-tab:before:hover {
      background-color: #09213a;
    }
    .v-tab:before,
    .v-tabs-slider {
      background-color: #ebf1f7;
    }
    .menu-notifi {
      border-radius: 8px !important;
      z-index: 99 !important;
    }
  }
}
.v-menu__content {
  box-shadow: 3px 3px 30px #0000000d !important;
  border-radius: 14px !important;
}
.menu-action {
  width: 160px;
  border-radius: 14px !important;
  .menu-action-item {
    &:hover {
      cursor: pointer;
      background-color: #e2ebf559;
    }
  }
}
</style>
