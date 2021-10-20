import { AuthStateInterface } from "../interfaces";

function state(): AuthStateInterface {
  return {
    token: "",
    user: {
      roles: [],
    },
  };
}

export default state;
