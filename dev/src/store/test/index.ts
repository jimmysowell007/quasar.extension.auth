import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { AuthStateInterface, UserInterface } from '../../interfaces';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export function state(): AuthStateInterface {
  return {
    token: '',
    user: {
      roles: [],
    },
  };
}

export const getters: GetterTree<AuthStateInterface, any> = {
  getToken(state) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.token;
  },
  getUser(state) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.user;
  },
};

export const actions: ActionTree<AuthStateInterface, any> = {
  updateToken({ commit }, value: string) {
    commit('SET_TOKEN', value);
  },
  updateUser({ commit }, value: UserInterface) {
    commit('SET_USER', value);
  },
};

 export const  mutation: MutationTree<AuthStateInterface> = {
  SET_TOKEN(state, value: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (state.token = value);
  },
  SET_USER(state, value: UserInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (state.user = value);
  },
};
