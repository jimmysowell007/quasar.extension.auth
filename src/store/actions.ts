import { ActionTree } from "vuex";
import { AuthStateInterface, UserInterface } from "../interfaces";

const actions: ActionTree<AuthStateInterface, any> = {
  updateToken({ commit }, value: string) {
    commit("setToken", value);
  },
  updateUser({ commit }, value: UserInterface) {
    commit("setUser", value);
  },
};

export default actions;
