import user from "./user";
import users from "./users";
import groups from "./groups";
import chat from "./chat";
import axios from "axios";

const repository = axios => {
  return {
    user: user(axios),
    users: users(axios),
    groups: groups(axios),
    chat: chat(axios),
  };
};
const repo = repository(axios);
export default repo;
