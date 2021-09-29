import { cipher, decipher } from "@/utils"

let DB

const DB_NAME = "mv_talk"
const DB_VERSION = 1

export default {
  async getDatabase() {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB)
      }
      let request = window.indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        reject("Error")
      }

      request.onsuccess = (event) => {
        DB = event.target.result
        resolve(DB)
      }

      request.onupgradeneeded = (event) => {
        let db = event.target.result
        db.createObjectStore("users_contact", { keyPath: "id" })
        db.createObjectStore("users_chat", { keyPath: "_id" })
        db.createObjectStore("members_group", { keyPath: "_id" })
      }
    })
  },
  async getUsersContact() {
    let db = await this.getDatabase()

    return new Promise((resolve) => {
      let trans = db.transaction(["users_contact"], "readonly")
      trans.oncomplete = () => {
        resolve(users_contact)
      }
      let users_contact = []
      let store = trans.objectStore("users_contact")
      store.openCursor().onsuccess = (e) => {
        let cursor = e.target.result
        if (cursor) {
          users_contact.push({
            ...cursor.value,
            email: decipher(cursor.value.email),
            username: decipher(cursor.value.username),
            mobile_phone: decipher(cursor.value.mobile_phone),
            asgl_id: decipher(cursor.value.asgl_id),
          })
          cursor.continue()
        }
      }
    })
  },
  async addUserContact(userContact) {
    let db = await this.getDatabase()
    console.log(userContact)
    return new Promise((resolve) => {
      let trans = db.transaction(["users_contact"], "readwrite")
      trans.oncomplete = () => {
        resolve()
      }

      let store = trans.objectStore("users_contact")
      store.put({
        ...userContact,
      })
    })
  },
  async getUsersChat() {
    let db = await this.getDatabase()

    return new Promise((resolve) => {
      let trans = db.transaction(["users_chat"], "readonly")
      trans.oncomplete = () => {
        resolve(users_chat)
      }
      let users_chat = []
      let store = trans.objectStore("users_chat")
      store.openCursor().onsuccess = (e) => {
        let cursor = e.target.result
        if (cursor) {
          const emails = cursor.value.emails || []
          users_chat.push({
            ...cursor.value,
            emails: emails.map((email) => ({
              ...email,
              address: decipher(email.address),
            })),
            username: decipher(cursor.value.username),
          })
          cursor.continue()
        }
      }
    })
  },
  async addUserChat(userChat) {
    let db = await this.getDatabase()

    return new Promise((resolve) => {
      let trans = db.transaction(["users_chat"], "readwrite")
      trans.oncomplete = () => {
        resolve()
      }

      let store = trans.objectStore("users_chat")
      const emails = userChat.emails || []
      store.put({
        ...userChat,
        emails: emails.map((email) => ({
          ...email,
          address: cipher(email.address),
        })),
        username: cipher(userChat.username),
      })
    })
  },
  async getMembersGroup(groupId) {
    let db = await this.getDatabase()

    return new Promise((resolve) => {
      let trans = db.transaction(["members_group"], "readonly")
      let store = trans.objectStore("members_group")
      const storeRequest = store.get(groupId)
      storeRequest.onsuccess = (e) => {
        resolve(e.target.result)
      }
      storeRequest.onerror = () => {
        resolve(null)
      }
    })
  },
  async addMembersGroup(membersGroup) {
    let db = await this.getDatabase()

    return new Promise((resolve) => {
      let trans = db.transaction(["members_group"], "readwrite")
      trans.oncomplete = () => {
        resolve()
      }

      let store = trans.objectStore("members_group")
      store.put(membersGroup)
    })
  },
  async addMemberGroup(groupId, memberGroup) {
    let db = await this.getDatabase()
    return new Promise((resolve) => {
      const transaction = db.transaction(["members_group"], "readwrite")
      const objectStore = transaction.objectStore("members_group")

      objectStore.openCursor().onsuccess = function (event) {
        const cursor = event.target.result
        if (cursor) {
          if (cursor.value._id === groupId) {
            const request = cursor.update({
              _id: groupId,
              members: cursor.value.members.concat(memberGroup),
            })
            request.onsuccess = function () {
              resolve()
            }
          }
          cursor.continue()
        }
      }
    })
  },
  async updateMemberGroup(groupId, memberGroup) {
    let db = await this.getDatabase()
    return new Promise((resolve) => {
      const transaction = db.transaction(["members_group"], "readwrite")
      const objectStore = transaction.objectStore("members_group")

      objectStore.openCursor().onsuccess = function (event) {
        const cursor = event.target.result
        if (cursor) {
          if (cursor.value._id === groupId) {
            const request = cursor.update({
              _id: groupId,
              members: cursor.value.members.map((m) => {
                if (m._id === memberGroup._id) {
                  return {
                    ...m,
                    ...memberGroup,
                  }
                }
                return m
              }),
            })
            request.onsuccess = function () {
              resolve()
            }
          }
          cursor.continue()
        }
      }
    })
  },
  async removeMemberGroup(groupId, memberUsername) {
    let db = await this.getDatabase()
    return new Promise((resolve) => {
      const transaction = db.transaction(["members_group"], "readwrite")
      const objectStore = transaction.objectStore("members_group")

      objectStore.openCursor().onsuccess = function (event) {
        const cursor = event.target.result
        if (cursor) {
          if (cursor.value._id === groupId) {
            const request = cursor.update({
              _id: groupId,
              members: cursor.value.members.filter(
                (member) => member.username !== memberUsername,
              ),
            })
            request.onsuccess = function () {
              resolve()
            }
          }
          cursor.continue()
        }
      }
    })
  },
}
