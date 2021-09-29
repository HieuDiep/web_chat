import UserRepository from "./user.repository"
import GroupRoomRepository from "./group_rooms.repository"
import ClickedRoomRepository from "./clicked_rooms.repository"
import MessagesByRooms from "./messages_by_rooms.repository"

export default ($axios, $indexedDB, $store) => ({
  users: UserRepository($axios, $indexedDB, $store),
  group_rooms: GroupRoomRepository($axios, $indexedDB, $store),
  clicked_rooms: ClickedRoomRepository($axios, $indexedDB, $store),
  messages_by_rooms: MessagesByRooms($axios, $indexedDB, $store),
})
