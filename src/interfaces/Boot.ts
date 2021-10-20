import { Router } from "vue-router";
import { Store } from "vuex";
import { App } from "vue";
export interface BootInterface {
  router: Router;
  store: Store<any>;
  app: App<any>;
}
