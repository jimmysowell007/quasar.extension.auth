// FIXME: find another way to call this path
//@ts-ignore
import prompts from "app/quasar.extensions.json";
import axios from "axios";
import { boot } from "quasar/wrappers";
import { BootInterface } from "../interfaces";

const {
  "mamy-auth": { AUTH_SERVER_BASE_URL },
} = prompts;

export default boot(({ app }: BootInterface) => {
  const $api = axios.create({
    baseURL: AUTH_SERVER_BASE_URL,
  });
  app.provide("$api", $api);
});
