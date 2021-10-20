//@ts-ignore
import prompts from "app/quasar.extensions.json";
import { boot } from "quasar/wrappers";
import { BootInterface } from "../interfaces";

export default boot(({ app }: BootInterface) => {
  app.provide("$prompts", prompts);
});
