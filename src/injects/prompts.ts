import { inject } from "vue";
export interface PromptsInterface {
  LOCAL_LOGIN_ROUTE: string;
  LOCAL_SUCCESS_REDIRECTION_ROUTE: string;
  LOCAL_CHECK_CODE_ROUTE: string;
  LOCAL_UPDATE_PASSWORD_ROUTE: string;
  AUTH_SERVER_BASE_URL: string;
  AUTH_SERVER_SIGNING_ROUTE: string;
  AUTH_SERVER_RESET_PASSWORD_ROUTE: string;
  AUTH_SERVER_UPDATE_PASSWORD_ROUTE: string;
  AUTH_TYPE: string;
  VUEX_SET_TOKEN_MUTATION: string;
  VUEX_CLEAR_TOKEN_MUTATION: string;
  VUEX_SET_EMAIL_OR_PHONENUMBER_USER_MUTATION: string;
  VUEX_SET_INFOS_USER_MUTATION: string;
  VUEX_GET_TOKEN_GETTER: string;
  VUEX_GET_INFOS_USER_GETTER: string;
}
export const $prompts = (): PromptsInterface => {
  const $prompts = inject<Record<"mamy-auth", PromptsInterface>>("$prompts");
  if ($prompts == undefined) {
    throw Error("Could not inject prompts");
  }
  return $prompts["mamy-auth"];
};
