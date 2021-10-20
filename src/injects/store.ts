import { inject } from "vue";
import { Store } from "vuex";

export const $store = (): Store<any> => {
  const $store = inject<Store<any>>("$store");
  if ($store == undefined) {
    throw Error("Could not inject store");
  }
  return $store;
};
