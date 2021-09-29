export default ($axios, $indexedDB) => ({
  getAll: async () => {
    // await $indexedDB.add('rooms', [{ _id: 2 }]);
    const rooms = await $indexedDB.getAll("clicked_rooms");
    // console.log('getAll()', rooms);
    return rooms;
  },
  add: async (group = {}) => {
    await $indexedDB.add("clicked_rooms", [group]);
    // const rooms = await $indexedDB.getAll('clicked_rooms');
    // console.log('add()', rooms);
  },
});
