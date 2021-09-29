export default ($axios, $indexedDB) => ({
  getAll: async () => {
    const users = await $indexedDB.getAll("users")
    return users
  },
  add: async (user = {}) => {
    await $indexedDB.add("users", [user])
  },
  addArray: async (users = []) => {
    await $indexedDB.add("users", users)
  },
})
