import { mapState } from "vuex"

export default {
  computed: {
    ...mapState({
      imageType: (state) => state.fileType.image,
      filesType: (state) => state.fileType.files,
      videoPath: (state) => state.fileType.video,
    }),
  },
  methods: {
    isQuote(_msg) {
      try {
        let obj_mess = JSON.parse(_msg)
        if (typeof obj_mess === "object") {
          if (obj_mess.type === "ActionType.QUOTE" && obj_mess.quote) {
            return true
          }
        }
        return false
      } catch (e) {
        return false
      }
    },
    isDelete(_msg) {
      try {
        let obj_mess = JSON.parse(_msg)
        if (typeof obj_mess === "object") {
          if (obj_mess.type === "ActionType.DELETE") {
            return true
          }
        }
        return false
      } catch (e) {
        return false
      }
    },
    isEdit(_msg) {
      try {
        let obj_mess = JSON.parse(_msg)
        if (typeof obj_mess === "object") {
          if (obj_mess.isEdited) {
            return true
          }
        }
        return false
      } catch (e) {
        return false
      }
    },
    isForward(_msg) {
      try {
        let obj_mess = JSON.parse(_msg)
        if (typeof obj_mess === "object") {
          if (obj_mess.type == "ActionType.FORWARD") {
            return true
          }
        }
        return false
      } catch (e) {
        return false
      }
    },
    isMention(_msg) {
      try {
        let obj_mess = JSON.parse(_msg)
        if (typeof obj_mess === "object") {
          if (obj_mess.type == "ActionType.MENTION") {
            return true
          }
        }
        return false
      } catch (e) {
        return false
      }
    },
    isRoomMsg(_msg) {
      return !!_msg.t
    },
    getTextQuoteMsg(_msg) {
      let tx = ""
      try {
        let obj_mess = JSON.parse(_msg)
        if (typeof obj_mess === "object") {
          if (obj_mess.type === "ActionType.QUOTE" && obj_mess.quote) {
            tx = obj_mess.msg
          }
        }
        return tx
      } catch (e) {
        return tx
      }
    },
    getFilePath(_fileLink) {
      return _fileLink.toString().split(".").pop().toString().toLowerCase()
    },
    getForwardObject(msg) {
      let tx = {}
      try {
        let obj_mess = JSON.parse(msg)
        if (typeof obj_mess === "object") {
          if (obj_mess.type === "ActionType.FORWARD") {
            tx = obj_mess
          }
        }
        return tx
      } catch (e) {
        console.log(e)
        return tx
      }
    },
    checkTypeOfMsg(_mess = {}) {
      let type = ""
      if (!_mess.attachments) {
        if (this.isQuote(_mess.msg)) {
          type = "quoteType"
        } else if (this.isDelete(_mess.msg)) {
          type = "deleteType"
        } else if (this.isForward(_mess.msg)) {
          type = "forwardType"
        } else if (this.isMention(_mess.msg)) {
          type = "mentionType"
        } else if (this.isRoomMsg(_mess)) {
          type = "roomType"
        } else if (this.isEdit(_mess.msg)) {
          type = "editType"
        } else {
          type = "textType"
        }
      } else {
        if (!_mess.attachments[0]) {
          return
        }
        if (this.isDelete(_mess.msg)) {
          return (type = "deleteType")
        }
        // định dạng tin nhắn
        let type = this.getFilePath(_mess.attachments[0].title_link)
        if (this.imageType.includes(type) || ["svg", "SVG"].includes(type)) {
          if (
            !_mess.attachments[0].thumb_url &&
            _mess.attachments[0].title_link
          ) {
            return (type = "stickerType")
          }
          return (type = "imageType")
        } else if (this.videoPath.includes(type)) {
          // console.log(`f`);
          return (type = "videoType")
        } else {
          // console.log(`v`);
          return (type = "fileType")
        }
      }
      return type
    },
  },
}
