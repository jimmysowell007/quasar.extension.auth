import { inject } from "vue";
import { Router } from "vue-router";

export const $router = (): Router => {
  const $router = inject<Router>("$router");
  if ($router == undefined) {
    throw Error("Could not inject router");
  }
  return $router;
};
