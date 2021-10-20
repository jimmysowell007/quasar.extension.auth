// @ts-ignore
import prompts from "app/quasar.extensions.json";
import { boot } from "quasar/wrappers";
import { BootInterface } from "../interfaces";

export default boot(({ router, store }: BootInterface) => {
  const {
    "mamy-auth": { LOCAL_LOGIN_ROUTE, LOCAL_CHECK_CODE_ROUTE },
  } = prompts;

  router.beforeEach((to, from, next) => {
    const token = store.state.auth.token;
    if (
      !token &&
      to.path !== LOCAL_LOGIN_ROUTE &&
      to.path !== LOCAL_CHECK_CODE_ROUTE
    ) {
      next(LOCAL_LOGIN_ROUTE);
    } else {
      next();
    }
  });
});
