// @ts-ignore
import prompts from "app/quasar.extensions.json";
import { RouteRecordRaw } from "vue-router";

const {
  "mamy-auth": { LOCAL_LOGIN_ROUTE, LOCAL_UPDATE_PASSWORD_ROUTE },
} = prompts;

const routes: RouteRecordRaw[] = [
  {
    path: LOCAL_LOGIN_ROUTE,
    // @ts-ignore
    component: () => import("mamy-auth/pages/Auth.vue"),
  },
  {
    path: LOCAL_UPDATE_PASSWORD_ROUTE,
    // @ts-ignore
    component: () => import("mamy-auth/pages/ResetPassword.vue"),
  },
];

export default routes;
