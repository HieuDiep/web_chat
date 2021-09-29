function IndexedDB(name, version) {
  this.db = null

  const request = window.indexedDB.open(name, version)
  localStorage.setItem("idb_current_version", version)
  request.onerror = () => {
    throw Error("Error")
  }

  request.onsuccess = (event) => {
    this.db = event.target.result
    console.log("sucess changes")
    this.db.onversionchange = () => {
      this.db.close()
    }
  }

  request.onupgradeneeded = (event) => {
    const db = event.target.result
    db.createObjectStore("users", { keyPath: "id" })
    db.createObjectStore("messages_by_rooms", { keyPath: "_id" })
    db.createObjectStore("group_rooms", { keyPath: "_id" })
    db.createObjectStore("clicked_rooms", { keyPath: "_id" })
  }
}

IndexedDB.prototype.getAll = function (storeName) {
  return new Promise((resolve) => {
    if (!this.db) {
      return
    }
    let trans = this.db.transaction([storeName], "readonly")
    trans.oncomplete = () => {
      resolve(users_contact)
    }
    let users_contact = []
    let store = trans.objectStore(storeName)
    store.openCursor().onsuccess = (e) => {
      let cursor = e.target.result
      if (cursor) {
        users_contact.push(cursor.value)
        cursor.continue()
      }
    }
  })
}

IndexedDB.prototype.add = function (storeName, items) {
  return new Promise((resolve) => {
    const trans = this.db.transaction([storeName], "readwrite")

    trans.oncomplete = () => {
      resolve()
    }

    const store = trans.objectStore(storeName)

    for (let item of items) {
      store.put(item)
    }
  })
}

IndexedDB.prototype.remove = function (storeName, key) {
  return new Promise((resolve) => {
    const trans = this.db.transaction([storeName], "readwrite")
    trans.oncomplete = () => {
      resolve()
    }

    const store = trans.objectStore(storeName)
    store.delete(key)
  })
}

IndexedDB.prototype.updateByKey = function (storeName, key, itemUpdate) {
  return new Promise((resolve) => {
    const trans = this.db.transaction([storeName], "readwrite")

    let store = trans.objectStore(storeName)

    store.openCursor().onsuccess = function (event) {
      const cursor = event.target.result
      if (cursor) {
        const item = cursor.value
        if (item._id === key) {
          const request = cursor.update({
            ...item,
            ...itemUpdate,
          })
          request.onsuccess = function () {
            resolve()
          }
        }
        cursor.continue()
      }
    }
  })
}

IndexedDB.prototype.getById = function (storeName, key, field = "") {
  return new Promise((resolve) => {
    const trans = this.db.transaction([storeName], "readonly")

    let store = trans.objectStore(storeName)
    const storeRequest = store.get(key)

    storeRequest.onsuccess = (e) => {
      const result = e.target.result || {}

      if (field) {
        resolve(result[field])
      } else {
        resolve(result)
      }
    }
    storeRequest.onerror = () => {
      resolve(null)
    }
  })
}

// IndexedDB.prototype.updateAll = function (storeName) {
//   return new Promise((resolve) => {
//     const trans = this.db.transaction([storeName], 'readwrite');

//     trans.oncomplete = () => {
//       resolve();
//     };

//     // const store = trans.objectStore(storeName);

//     // for (let item of items) {
//     //   store.put(item);
//     // }
//   });
// };

export default IndexedDB
