<template>
  <DefaultLayout>
    <div class="home room-content px-2">
      <div class="room-header">
        <p>
          {{ currentRouteId }}
        </p>
      </div>
      <div class="room-msg-wrapper" id="room-msg-wrapper">
        <div
          v-for="msgBlock in listMsgComputed"
          :key="msgBlock.refKey"
          class="each-block mb-15--m"
          :class="
            isMyMsg(msgBlock)
              ? 'each-block__user-msg'
              : 'each-block__other-user-msg'
          "
        >
          <div class="each-block__content">
            <!-- Thêm người dùng -->
            <div v-if="!msgBlock.messages && msgBlock.t === 'au'" class="w-100">
              <p class="add-user-noti">
                Người dùng <b>{{ userByUsernane(msgBlock.msg).name }}</b> vừa
                tham gia nhóm.
              </p>
            </div>
            <!-- Cách ngày -->
            <div
              v-if="!msgBlock.messages && msgBlock.breaking_day"
              class="w-100 day-break"
            >
              <p class="day-break__day">
                {{ parseDMY(msgBlock.breaking_day) }}
              </p>
              <div class="day-break__line"></div>
            </div>
            <!-- CONTENT -->
            <div
              v-if="msgBlock.u && msgBlock.messages"
              class="msg-block-avatar"
            >
              <MsgAvatar :url="userById(msgBlock.u).avatar" />
            </div>
            <div
              v-if="msgBlock.messages && msgBlock.messages.length"
              class="normal-msg"
            >
              <span
                v-if="msgBlock.u && msgBlock.messages"
                class="each-block__user-name"
                >{{ userById(msgBlock.u).name }}</span
              >
              <div
                class="each-msg-in-block"
                v-for="(msg, idx) in msgBlock.messages"
                :key="msg._id"
                :class="[
                  idx === 0 ? 'first-msg' : '',
                  idx === msgBlock.messages.length - 1 ? 'last-msg' : '',
                  ['stickerType', 'imageType'].includes(msg.msgType)
                    ? 'no-bg'
                    : '',
                ]"
              >
                <!-- TEXT -->
                <pre
                  v-if="msg.msg"
                  class="each-msg-in-block__text"
                  :class="
                    idx === msgBlock.messages.length - 1 ? '' : 'mb-15--m'
                  "
                  >{{ msg.msg ? String(msg.msg).trim() : "" }}</pre
                >
                <!-- IMAGE -->
                <div
                  class="each-msg-in-block__image mb-3"
                  v-if="msg.msgType === 'imageType'"
                >
                  <div class="image-wrapper">
                    <img
                      v-for="(img, idx) in msg.attachments.slice(0, 3)"
                      alt=""
                      :key="img.thumb_url + idx"
                      :src="img.thumb_url || img.title_link"
                      class="pointer img-thumb-detail"
                      @click="onViewListImg(msg.attachments, idx)"
                    />
                    <div
                      v-if="msg.attachments.length > 3"
                      class="image-over-4 pointer"
                      @click="onViewListImg(msg.attachments, 3)"
                    >
                      <img
                        alt=""
                        :src="msg.attachments[3].thumb_url"
                        class="pointer img-thumb-detail"
                      />
                      <p class="image-over-4__counter">
                        +{{ msg.attachments.length - 3 }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- STICKER -->
                <div
                  class="each-msg-in-block__image"
                  v-if="msg.msgType === 'stickerType'"
                >
                  <div class="image-wrapper">
                    <img
                      v-for="(img, idx) in msg.attachments"
                      alt=""
                      :key="img.thumb_url + idx"
                      :src="img.thumb_url || img.title_link"
                      class="pointer img-thumb-detail"
                    />
                  </div>
                </div>
              </div>
              <span class="each-msg-in-block__time d-block">12:34</span>
              <!-- "" -->
            </div>
          </div>
        </div>
      </div>

      <!-- TYPE AREA -->
      <div
        class="comment-areas mb-3 mt-3"
        :class="lineNumber < 3 ? 'align-items-center' : ''"
      >
        <label for="comment-attachment">
          <img
            src="@/assets/images/icon-attachment.svg"
            alt=""
            class="comment-attachment pl-2 pointer"
          />
        </label>
        <input
          id="comment-attachment"
          type="file"
          class="d-none"
          multiple
          @change="onChangeFile"
        />
        <textarea
          id="type-area"
          v-model="message"
          class="w-100 cm-area focus-no-outline active-no-outline"
          :rows="lineNumber"
          placeholder="Viết bình luận"
          @keypress.enter.exact.prevent="sendMsg"
          @keypress.enter.prevent
          @keypress.shift.enter.exact="newline"
        >
        </textarea>
        <div>
          <img src="@/assets/images/send-btn.svg" alt="" class="pointer" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
// @ is an alias to /src
import DefaultLayout from "@/layouts/default.vue"
import { mapGetters, mapState } from "vuex"
import { splitMessages } from "@/utils"
import UserMix from "@/mixins/UserMix.js"
import DateMix from "@/mixins/DateMix.js"
import MsgMix from "@/mixins/MsgMix.js"
import MsgAvatar from "@/components/ChatBlock/MsgAvatar.vue"
export default {
  components: { DefaultLayout, MsgAvatar },
  data() {
    return {
      currentRouteId: "",
      message: "",
      lineNumber: 1,
      filesClipboard: [],
      limitFiles: {
        amount: 30,
        maxFileSize: 104857600, // 100MB,
      },
      newMsgInPhase: [],
      firstLoadOnRooms: true,
    }
  },
  mixins: [UserMix, DateMix, MsgMix],
  computed: {
    ...mapState({
      auth: (state) => state.auth,
      currentRoomMembers: (state) => state.rooms.currentRoomMembers,
      currentRoomsMsg: (state) => state.rooms.currentRoomsMsg,
      currentRoomsMsgTotal: (state) => state.rooms.currentRoomsMsgTotal,
    }),
    ...mapGetters({
      currentRoomMsgGetter: "currentRoomMsgGetter",
    }),
    listMsgComputed() {
      const arr =
        this.currentRoomMsgGetter && this.currentRoomMsgGetter.length
          ? [...this.currentRoomMsgGetter]
          : []
      const currentRoomCp = [...arr, ...this.newMsgInPhase]
      const result = splitMessages(currentRoomCp)
      result.forEach((o) => {
        o.refKey = Math.random() * 1000 + Math.random() * 1000
        if (o.messages) {
          o.messages.forEach((k) => {
            k.msgType = this.checkTypeOfMsg(k)
          })
        }
      })
      return result
    },
  },
  mounted() {
    const currentParams = this.$route.params
    if (currentParams) {
      this.currentRouteId = currentParams.id
      this.$store.commit("SET_CURRENT_ROOM_ID", currentParams.id)
      this.$store.dispatch("getCurrentRoomMsgFromApi", {
        _roomId: currentParams.id,
        count: 50,
        offset: 0,
      })
      this.$store.dispatch("getCurrentRoomMembersFromApi", {
        _roomId: currentParams.id,
        count: 1000,
      })
      setTimeout(() => {
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }, 100)
    }
  },
  watch: {
    $route(_newVal) {
      const currentParams = _newVal.params
      if (currentParams) {
        this.firstLoadOnRooms = false
        this.currentRouteId = currentParams.id
        this.$store.commit("SET_CURRENT_ROOM_ID", currentParams.id)
        this.$store.dispatch("getCurrentRoomMsgFromApi", {
          _roomId: currentParams.id,
          count: 50,
          offset: 0,
        })
        this.$store.dispatch("getCurrentRoomMembersFromApi", {
          _roomId: currentParams.id,
          count: 1000,
        })
      }
    },
    message(_newVal) {
      if (!_newVal) {
        this.lineNumber = 1
      }
    },
    lineNumber() {
      if (this.lineNumber > 7) {
        this.lineNumber = 7
      }
    },
    currentRouteId() {
      this.scrollToBottom()
    },
    firstLoadOnRooms() {
      if (this.firstLoadOnRooms) {
        this.scrollToBottom()
      }
    },
    listMsgComputed() {
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
  },
  methods: {
    scrollToBottom() {
      const target = document.querySelector("#room-msg-wrapper")
      if (target) {
        this.$nextTick(() => {
          target.scrollTop = target.scrollHeight
        })
      }
    },
    isMyMsg(msg) {
      if (!msg || !msg.u || !this.auth || !this.auth.user) {
        return false
      }
      return msg.u._id === this.auth.user.userId
    },
    sendMsg() {
      let objMsgPreview = {}
      const objMsg = {
        rid: this.currentRouteId,
        msg: this.message,
      }
      objMsgPreview = {
        isSending: true,
        msg: this.message,
        rid: this.currentRouteId,
        ts: new Date().toISOString(),
        u: {
          ...this.auth.user.me,
        },
        unread: true,
        _updatedAt: new Date().toISOString(),
      }
      console.log(objMsg)
      console.log(objMsgPreview)
      this.newMsgInPhase.push(objMsgPreview)
      this.message = ""
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    newline() {
      this.message = `${this.message}\n`
      this.lineNumber += 1
    },
    onChangeFile(event) {
      const files = event.target.files
      if (files.length + this.filesClipboard.length > this.limitFiles.amount) {
        alert("Số lượng file quá lớn !")
        return
      }
      for (const file of files) {
        // console.log(file.name);
        if (file.size > this.limitFiles.maxFileSize) {
          // valid size
          this.confirm.showConfirm = true
          alert("File quá lớn !")

          return
        }
        if (file.type.includes("image")) {
          const reader = new FileReader()
          reader.onload = async (event) => {
            const img = document.createElement("img")
            img.src = event.target.result
            this.filesClipboard = [
              ...this.filesClipboard,
              {
                _id: `${new Date().getTime()}_${Math.random()}`,
                name: file.name,
                src: event.target.result,
                type: "image",
                blob: file,
                sizes: file.size,
              },
            ]
          }
          reader.readAsDataURL(file)
        } else {
          this.filesClipboard = [
            ...this.filesClipboard,
            {
              _id: `${new Date().getTime()}_${Math.random()}`,
              name: file.name,
              type: "file",
              blob: file,
              sizes: file.size,
            },
          ]
        }
      }
    },
    onViewListImg(listImg, idx = 0) {
      const arr = listImg.map((o) => {
        return {
          ...o,
          src: o.image_url,
        }
      })
      this.$store.commit("SET_LIST_IMAGE_PREVIEW", arr)
      this.$store.commit("SET_INDEX_IMAGE_PREVIEW", idx)
    },
  },
}
</script>
<style lang="scss" scoped>
.room-content {
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-flow: column;
}
.room-header {
  height: 100px;
  background: #fff;
  border-bottom: 2px solid #f5f8fb;
  p {
    height: 100px;
    margin-bottom: 0;
  }
}
.room-msg-wrapper {
  height: calc(100%);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    height: 6px;
    opacity: 0;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.15);
    }
  }
}
.each-block {
  &__content {
    display: flex;
    align-items: flex-end;
  }
  &__user-name {
    display: block;
    font-size: 13px;
    color: #232323;
    font-weight: bold;
    margin-bottom: 4px;
    width: fit-content;
  }
  .user-msg__avatar {
    order: 2;
  }
}
.mb-15--m {
  margin-bottom: 15px;
}
.normal-msg {
  max-width: 560px;
  .each-msg-in-block {
    min-width: 90px;
    width: fit-content;
    &.no-bg {
      background-color: transparent !important;
    }
    .each-msg-in-block__text {
      font-size: 15px;
      font-family: "Roboto";
      white-space: pre-wrap;
      word-break: break-word;
      text-align: left;
      padding: 20px;
    }
    border-radius: 14px 0px 0px 14px;
    &.first-msg {
      border-radius: 14px 14px 0px 14px;
    }
    &.last-msg {
      border-radius: 14px 0px 14px 14px;
    }
    &.first-msg.last-msg {
      border-radius: 14px;
    }

    // image
    .image-wrapper {
      display: flex;
      align-items: center;
      .img-thumb-detail {
        width: 128px;
        height: 128px;
        border-radius: 14px;
        object-fit: cover;
        object-position: center;
        margin-left: 9px;
      }
      .image-over-4 {
        position: relative;
        .image-over-4__counter {
          width: 128px;
          height: 128px;
          border-radius: 14px;
          position: absolute;
          top: 0;
          right: 0;
          background-color: rgba(61, 61, 61, 0.493);
          color: #fff;
          font-weight: bold;
          font-size: 29px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .each-msg-in-block__time {
    font-size: 10px;
    color: #a0b3ce;
    width: fit-content;
    padding-top: 10px;
  }
}
.add-user-noti {
  width: 100%;
  text-align: center;
}
.day-break {
  &__line {
    width: 80%;
    margin: 0 auto;
    height: 1px;
    background-color: #a0b3ce;
    transform: translateY(-24px);
  }
  &__day {
    font-size: 15px;
    position: relative;
    z-index: 2;
    background-color: #fff;
    padding: 0 8px;
    width: fit-content;
    margin: 0 auto 15px auto;
  }
}
.each-block__user-msg {
  .each-block__user-name {
    display: none;
  }
  .each-block__content {
    justify-content: flex-end;

    .msg-block-avatar {
      order: 2;
    }
    .each-msg-in-block {
      margin-left: auto;
      background: #0052a2;
      color: #fff;
      margin-right: 15px;
      &__time {
        margin-left: auto;
        margin-right: 15px;
      }
    }
  }
}
.each-block__other-user-msg {
  .each-block__user-name {
    margin-left: 18px;
  }
  .each-msg-in-block {
    background: #f6f9fb 0% 0% no-repeat padding-box;
    color: #a0b3ce;
    margin-left: 15px;
    &__time {
      margin-left: 15px;
      margin-right: auto;
    }
    border-radius: 0px 14px 14px 0px;
    &.first-msg {
      border-radius: 14px 14px 14px 0px;
    }
    &.last-msg {
      border-radius: 0px 14px 14px 14px;
    }
  }
}

.comment-areas {
  display: flex;
  background: #ebf1f7 0% 0% no-repeat padding-box;
  border-radius: 30px;
  padding: 10px 20px;
  textarea {
    resize: none;
    padding: 0 12px;
    &::placeholder {
      color: #a0b3ce;
    }
    &::-webkit-scrollbar {
      width: 4px;
      height: 6px;
      opacity: 0;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.15);
    }
  }
  .comment-attachment {
    opacity: 0.3;
  }
}
</style>
