import { GetterTree } from "vuex";
import { AuthStateInterface } from "../interfaces";

const getters: GetterTree<AuthStateInterface, any> = {
  getToken(state) {
    return state.token;
  },
  getUser(state) {
    return state.user;
  },
};

export default getters;
