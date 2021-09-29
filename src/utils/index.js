export const cipher = (text) => {
  return text
}
export const decipher = (text) => {
  return text
}
String.prototype.hexDecode = function () {
  var j
  var hexes = this.match(/.{1,4}/g) || []
  var back = ""
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16))
  }

  return back
}
export const convertHexToUTF8 = (hexString) => {
  let result = ""
  try {
    result = decodeURIComponent(hexString.replace(/(..)/g, "%$1"))
  } catch (e) {
    result = hexString
  }
  return result
}

export const encodeUTF8ToHex = (str) => {
  let hex
  try {
    hex = unescape(encodeURIComponent(str))
      .split("")
      .map(function (v) {
        return v.charCodeAt(0).toString(16)
      })
      .join("")
  } catch (e) {
    hex = str
  }
  return hex
}
const getDayOfMessage = (messageTime) => {
  const now = new Date(messageTime)
  const date = now.getDate().toString().padStart(2, "0")
  const month = (now.getMonth() + 1).toString().padStart(2, "0")
  const year = now.getFullYear().toString()

  return `${date}/${month}/${year}`
}
const sortMessages = (messages) => {
  return messages.sort((m1, m2) => {
    let time1 = m1.ts
    let time2 = m2.ts

    if (new Date(time1) < new Date(time2)) {
      return -1
    } else if (new Date(time1) > new Date(time2)) {
      return 1
    } else return 0
  })
}
export const splitMessages = (messages) => {
  const distance = 60 * 3 // 3'
  let currentDay = ""
  let currentUser = ""
  let result = []
  let objectIds = {}
  const _messages = sortMessages(messages)

  for (let message of _messages) {
    if (objectIds[message._id]) continue
    objectIds[message._id] = message._id
    if (
      currentDay &&
      getDayOfMessage(message.ts) !== getDayOfMessage(currentDay)
    ) {
      result.push({
        breaking_day: message.ts,
      })
    }

    if (message.t) {
      result.push(message)
      currentDay = message.ts
      currentUser = ""
      continue
    }

    if (currentUser === message.u._id) {
      if (result.length === 0) {
        result[result.length] = {
          u: message.u,
          messages: [message],
        }
      } else {
        if (
          !result[result.length - 1].t &&
          !result[result.length - 1].breaking_day
        ) {
          const firstMessageInBlock = result[result.length - 1].messages[0]
          const timeOfFirstMessage = new Date(firstMessageInBlock.ts).getTime()
          const timeOfCurrentMessage = new Date(message.ts).getTime()

          if ((timeOfCurrentMessage - timeOfFirstMessage) / 1000 <= distance) {
            if (result[result.length - 1]) {
              result[result.length - 1].messages =
                result[result.length - 1].messages.concat(message)
            } else {
              result[result.length - 1] = {
                u: message.u,
                messages: [message],
              }
            }
          } else {
            result[result.length] = {
              u: message.u,
              messages: [message],
            }
          }
        } else {
          result[result.length] = {
            u: message.u,
            messages: [message],
          }
        }
      }
    } else {
      result[result.length] = {
        u: message.u,
        messages: [message],
      }
    }
    currentDay = message.ts
    currentUser = message.u._id
  }

  return result
}
export const sortGroupByLatestMessage = (groups) => {
  return groups.sort((r1, r2) => {
    let time1 = r1.lm || r1._updatedAt
    let time2 = r2.lm || r2._updatedAt

    if (r1.lm) {
      time1 = r1.lm
    }

    if (r2.lm) {
      time2 = r2.lm
    }

    if (new Date(time1) > new Date(time2)) {
      return -1
    } else if (new Date(time1) < new Date(time2)) {
      return 1
    } else return 0
  })
}
export const getImageDimensions = (img) => {
  return new Promise((resolve) => {
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
  })
}
