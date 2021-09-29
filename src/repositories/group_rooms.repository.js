export default ($axios, $indexedDB, $store) => ({
  getAll: async () => {
    const rooms = await $indexedDB.getAll("group_rooms")
    return rooms
  },
  add: async (group = {}, addToVuex = false) => {
    if (addToVuex) {
      $store.commit("rooms/addGroup", group)
    }
    $indexedDB.add("group_rooms", [
      {
        _id: group._id,
        value: group,
      },
    ])
  },
  addArray: async (group = [], addToVuex = false) => {
    if (addToVuex) {
      $store.commit("rooms/addGroup", group)
    }
    $indexedDB.add("group_rooms", group)
  },
  update: async (group = {}) => {
    $indexedDB.updateByKey("group_rooms", group._id, { value: group })
    $store.commit("rooms/updateGroup", group)
  },
  remove: async (groupId) => {
    $indexedDB.remove("group_rooms", groupId)
    $indexedDB.remove("members_group", groupId)
    $indexedDB.remove("clicked_rooms", groupId)
    $store.commit("rooms/removeGroup", groupId)
  },
})
