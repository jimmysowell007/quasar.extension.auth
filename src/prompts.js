"use strict";
module.exports = function () {
  return [
    {
      name: "LOCAL_LOGIN_ROUTE",
      type: "input",
      required: true,
      message: "Route to authenticate (page)",
      default: "/login",
    },
    {
      name: "LOCAL_SUCCESS_REDIRECTION_ROUTE",
      type: "input",
      required: true,
      message: "Route to be redirected once connected (page)",
      default: "/",
    },
    {
      name: "LOCAL_CHECK_CODE_ROUTE",
      type: "input",
      required: true,
      message: "Route to check the code (page)",
      default: "/check_code",
    },
    {
      name: "LOCAL_UPDATE_PASSWORD_ROUTE",
      type: "input",
      required: true,
      message: "Route to update the password (page)",
      default: "/reset_password",
    },
    {
      name: "AUTH_SERVER_BASE_URL",
      type: "input",
      required: true,
      message: "Basic Url for API",
      default: "http://localhost:3000",
    },
    {
      name: "AUTH_SERVER_SIGNING_ROUTE",
      type: "input",
      required: true,
      message: "API endpoint for signin (without host)",
      default: "/users/sign_in",
    },
    {
      name: "AUTH_SERVER_RESET_PASSWORD_ROUTE",
      type: "input",
      required: true,
      message: "API endpoint for reset password (without host)",
      default: "/users/reset_password",
    },
    {
      name: "AUTH_SERVER_UPDATE_PASSWORD_ROUTE",
      type: "input",
      required: true,
      message: "API endpoint for update password (without host)",
      default: "/users/passwords",
    },
    {
      name: "AUTH_TYPE",
      type: "input",
      required: true,
      message: "Authorization type",
      default: "Bearer",
    },
    {
      name: "VUEX_SET_TOKEN_MUTATION",
      type: "input",
      required: true,
      message: "Vuex mutation to set token",
      default: "auth/set_token",
    },
    {
      name: "VUEX_CLEAR_TOKEN_MUTATION",
      type: "input",
      required: true,
      message: "Vuex mutation to clear token",
      default: "auth/clear_token",
    },
    {
      name: "VUEX_SET_EMAIL_MUTATION",
      type: "input",
      required: true,
      message:
        "Vuex mutation to store user email when authenticated",
      default: "auth/set_email_user"
    },
    {
      name: "VUEX_SET_INFOS_USER_MUTATION",
      type: "input",
      required: true,
      message: "Vuex mutation to set user information to reset password",
      default: "auth/set_infos_user",
    },
    {
      name: "VUEX_GET_TOKEN_GETTER",
      type: "input",
      required: true,
      message: "Vuex getter token",
      default: "auth/get_token",
    },
    {
      name: "VUEX_GET_INFOS_USER_GETTER",
      type: "input",
      required: true,
      message: "Vuex getter user information",
      default: "auth/get_infos_user",
    },
  ];
};
