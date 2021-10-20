import { MutationTree } from "vuex";
import { AuthStateInterface, UserInterface } from "../interfaces";

const mutation: MutationTree<AuthStateInterface> = {
  setToken(state, value: string) {
    return (state.token = value);
  },
  setUser(state, value: UserInterface) {
    return (state.user = value);
  },
};

export default mutation;
