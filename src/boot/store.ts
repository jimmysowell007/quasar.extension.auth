//@ts-ignore
import { boot } from "quasar/wrappers";
import { BootInterface } from "../interfaces";
import authModule from "../store";

export default boot(({ app, store }: BootInterface) => {
  // Register store module
  store.registerModule("auth", authModule);
  app.provide("$store", store);
});
