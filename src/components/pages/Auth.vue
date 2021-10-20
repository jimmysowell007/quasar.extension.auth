<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card square>
          <q-card-section>
            <div class="text-h5 text-center head">
              {{ $t("auth.title") }}
            </div>
          </q-card-section>

          <q-form class="q-gutter-md" @submit="onSubmit">
            <q-card-section>
              <q-input
                data-cy="email"
                v-model.trim="email"
                type="email"
                :label="$t('auth.email')"
                :rules="validations['email']"
                lazy-rules
                autofocus
                rounded
                outlined
                dense
                class="full-width q-mb-md"
              />
              <q-input
                data-cy="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :label="$t('auth.password')"
                :rules="validations['password']"
                lazy-rules
                rounded
                outlined
                dense
                class="full-width q-mb-md"
              >
                <template #append>
                  <q-icon
                    :name="showPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
            </q-card-section>
            <div class="forgottenPass">
              <q-btn
                @click="forgottenPassword = true"
                no-caps
                flat
                :label="$t('auth.forgottenPassword')"
              />
            </div>
            <q-card-actions>
              <q-btn
                data-cy="submit-login"
                rounded
                :label="$t('auth.login')"
                color="primary"
                :loading="loading"
                type="submit"
                class="full-width"
                :disable="isSubmitBtnDisabled()"
              />
            </q-card-actions>
          </q-form>
        </q-card>
        <div>
          <q-dialog v-model="forgottenPassword" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <p class="resetPasswordTitle">
                  {{ $t("auth.tapEmail") }}
                </p>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  v-model="emailResetPassword"
                  dense
                  rounded
                  outlined
                  :placeholder="$t('auth.email')"
                  autofocus
                />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  outline
                  rounded
                  :label="$t('common.cancel')"
                  class="btn-min"
                  v-close-popup
                />
                <q-btn
                  rounded
                  color="primary"
                  :label="$t('common.send')"
                  class="btn-min"
                  @click="resetPassword"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
//import prompts from "app/quasar.extensions.json";
import isEmail from "validator/es/lib/isEmail";
import { defineComponent, ref, onMounted } from "vue";
import { $api, $prompts, $router, $store } from "../../injects";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { AxiosError, AxiosResponse } from "axios";
export default defineComponent({
  name: "Auth",
  setup() {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const showPassword = ref(false);
    const forgottenPassword = ref(false);
    const emailResetPassword = ref("");
    const { post } = $api();
    const {
      LOCAL_SUCCESS_REDIRECTION_ROUTE,
      AUTH_SERVER_SIGNING_ROUTE,
      AUTH_SERVER_RESET_PASSWORD_ROUTE,
    } = $prompts();
    const $q = useQuasar();
    const { push, replace } = $router();
    const { state, dispatch } = $store();
    const { t } = useI18n();

    onMounted(() => {
      if (state.auth.token) {
        replace(LOCAL_SUCCESS_REDIRECTION_ROUTE);
      }
    });

    const validations = ref({
      email: [
        (val: string) => !!val || t("auth.emailPresenceError"),
        (val: string) => isEmail(val.trim()) || t("auth.emailValidationError"),
      ],
      password: [(val: string) => !!val || t("auth.passwordPresenceError")],
    });

    const resetPassword = () => {
      const data = {
        email: emailResetPassword.value,
      };

      post(AUTH_SERVER_RESET_PASSWORD_ROUTE, data)
        .then(() => {
          $q.notify({
            message: t("auth.emailSent"),
            color: "positive",
            position: "top",
          });
          forgottenPassword.value = false;
        })
        .catch(() => {
          $q.notify({
            message: t("auth.emailNotRecognize"),
            color: "negative",
            position: "top",
          });
        });
    };

    const onSubmit = () => {
      loading.value = true;
      const data = {
        auth: {
          email: email.value,
          password: password.value,
        },
      };

      post(AUTH_SERVER_SIGNING_ROUTE, data)
        .then((response: AxiosResponse) => {
          const token = response.data.jwt;
          dispatch("auth/updateToken", token);
          const payload = parseJwt(token);
          const user = { roles: payload.roles };
          dispatch("auth/updateUser", user);

          push(LOCAL_SUCCESS_REDIRECTION_ROUTE);
        })
        .catch((error: AxiosError) => {
          loading.value = false;
          $q.notify({
            message: t("auth.loginFailed"),
            color: "negative",
            position: "top",
          });
        });
    };

    const isSubmitBtnDisabled = () => {
      return !(
        email.value &&
        isEmail(email.value) &&
        password.value &&
        password.value.length > 5
      );
    };

    const parseJwt = (token: string) => {
      return JSON.parse(window.atob(token.split(".")[1]));
    };

    return {
      email,
      password,
      loading,
      showPassword,
      validations,
      isSubmitBtnDisabled,
      onSubmit,
      forgottenPassword,
      emailResetPassword,
      resetPassword,
    };
  },
});
</script>
