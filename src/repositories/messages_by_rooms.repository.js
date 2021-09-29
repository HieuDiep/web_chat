export default ($axios, $indexedDB) => ({
  getAll: async () => {
    const rooms = await $indexedDB.getAll("messages_by_rooms");
    return rooms;
  },
  add: async (msg = {}) => {
    await $indexedDB.add("messages_by_rooms", [msg]);
  },
});
