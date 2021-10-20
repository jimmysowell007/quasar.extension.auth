import { Module } from "vuex";
import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { AuthStateInterface } from "../interfaces";

const authModule: Module<AuthStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default authModule;
