<template>
  <q-page class="flex flex-center">
    <q-card square>
      <q-card-section>
        <div class="text-h5 text-center head">
          {{ $t("auth.passwordRecovery") }}
        </div>
      </q-card-section>

      <q-form class="q-gutter-md" @submit="onSubmit">
        <q-card-section>
          <q-input
            id="password"
            v-model="password"
            type="password"
            :label="$t('auth.newPassword')"
            :rules="validations['passwordRules']"
            rounded
            outlined
            dense
            class="full-width q-mb-md"
          >
          </q-input>
          <q-input
            id="passwordConfirmation"
            v-model="passwordConfirmation"
            type="password"
            :label="$t('auth.newPasswordConfirmation')"
            :rules="validations['passwordConfirmationRules']"
            rounded
            outlined
            dense
            class="full-width q-mb-md"
          >
          </q-input>
        </q-card-section>

        <q-card-actions>
          <q-btn
            rounded
            :label="$t('common.register')"
            color="primary"
            :loading="loading"
            type="submit"
            class="full-width"
            :disable="canSubmit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { $api, $prompts } from "../../injects";

export default defineComponent({
  name: "ResetPassword",

  setup() {
    const { patch } = $api();
    const {
      AUTH_SERVER_UPDATE_PASSWORD_ROUTE,
      LOCAL_SUCCESS_REDIRECTION_ROUTE,
    } = $prompts();
    const $q = useQuasar();
    const router = useRouter();
    const password = ref("");
    const passwordConfirmation = ref("");
    const loading = ref(false);
    const { t } = useI18n();

    const canSubmit = computed(() => {
      return password.value != "" &&
        password.value === passwordConfirmation.value
        ? false
        : true;
    });

    const validations = {
      passwordRules: [
        (val: string) => !!val || t("auth.newPasswordPresenceError"),
      ],
      passwordConfirmationRules: [
        (val: string) =>
          val === password.value || t("auth.newPasswordConfirmationFailed"),
      ],
    };

    const onSubmit = () => {
      const data = {
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      };
      patch(AUTH_SERVER_UPDATE_PASSWORD_ROUTE, data)
        .then(() => {
          $q.notify({
            message: t("auth.passwordRecoverySuccess"),
            color: "positive",
            position: "top",
          });
          router.push(LOCAL_SUCCESS_REDIRECTION_ROUTE);
        })
        .catch(() => {
          $q.notify({
            message: t("auth.passwordRecoveryFailed"),
            color: "negative",
            position: "top",
          });
        });
    };

    return {
      password,
      passwordConfirmation,
      validations,
      loading,
      onSubmit,
      canSubmit,
    };
  },
});
</script>

<style scoped>
.head,
.q-page {
  opacity: 0.7;
}

.q-card {
  width: 400px;
  padding: 50px;
}
</style>
