<template>
  <v-container
    style="background-color:white;min-height:63vh"
    fluid
    class="my-10"
  >
    <v-layout row wrap class="mx-10">
      <v-flex xs12 sm6 offset-sm3>
        <div class="my-4">
          <h1 style="font-size:50px; text-color:#4DBA87;" class="">
            Log In
          </h1>
        </div>
        <div>
          <v-subheader dense>Please Sign in to your Ashewa Account</v-subheader>
        </div>
        <v-divider inset></v-divider>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <v-layout column>
              <v-flex>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    id="userName"
                    name="userName"
                    label="User Name"
                    v-model="userName"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                    color="#4DBA87"
                  >
                  </v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex>
                <ValidationProvider rules="required|min:5" v-slot="{ errors }">
                  <v-text-field
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    v-model="password"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    color="#4DBA87"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-row>
                <v-col cols="auto" class="mr-auto">
                  <v-btn
                    :to="{ path: '/signup' }"
                    small
                    text
                    class="btnForgotPassword"
                    >Don't have account?</v-btn
                  >
                  <v-btn
                    @click="forgotPassword = true"
                    small
                    text
                    class="btnForgotPassword"
                    >Forgot password?</v-btn
                  >
                </v-col>

                <v-col cols="auto">
                  <SubmitButton
                    class="white--text"
                    buttonText="Login"
                    color="#4DBA87"
                  />
                </v-col>
              </v-row>
            </v-layout>
          </form>
        </ValidationObserver>
      </v-flex>
      <ErrorMessage />
      <SuccessMessage />
    </v-layout>
    <v-dialog
      persistent
      v-model="forgotPassword"
      style="background-color:red"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-5">
        <h1>Forgot Password?</h1>
        <v-subheader dense
          >Please provide your email to reset your password
        </v-subheader>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(sendEmail)">
            <v-layout column>
              <v-flex>
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <v-text-field
                    id="email"
                    name="email"
                    label="Email"
                    v-model="email"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    prepend-inner-icon="mdi-email"
                    color="#4DBA87"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex>
                <SubmitButton
                  class="white--text"
                  buttonText="Send"
                  color="#4DBA87"
                />
              </v-flex>
            </v-layout>
          </form>
        </ValidationObserver>
      </v-card>
    </v-dialog>
    <v-dialog
      persistent
      v-model="resetPassword"
      style="background-color:red"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-5">
        <h1>Reset Password?</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(resetMyPassword)">
            <v-layout column>
              <v-flex>
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <v-text-field
                    id="email"
                    name="email"
                    label="Email"
                    v-model="email"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    prepend-inner-icon="mdi-email"
                    color="#4DBA87"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    id="userName"
                    name="userName"
                    label="Code"
                    v-model="code"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                    color="#4DBA87"
                  >
                  </v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex>
                <ValidationProvider rules="required|min:5" v-slot="{ errors }">
                  <v-text-field
                    id="password"
                    name="password"
                    type="password"
                    label="New Password"
                    v-model="newPassword"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    color="#4DBA87"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex>
                <SubmitButton
                  class="white--text"
                  buttonText="Send"
                  color="#4DBA87"
                />
              </v-flex>
            </v-layout>
          </form>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import router from "@/router";
import { mapActions } from "vuex";

export default {
  metaInfo() {
    return {
      title: "Ashewa",
      titleTemplate: `Ashewa`,
    };
  },
  data() {
    return {
      userName: "",
      password: "",
      newPassword: "",
      code: "",
      forgotPassword: false,
    };
  },
  methods: {
    ...mapActions(["userLogin"]),
    async submit() {
      //This event signifies that a successfull login has happend
      this.$gtag.event("Sign In", {
        event_category: "Ashewa Form Sign In",
        event_label: "User Sign In",
      });
      await this.userLogin({
        email: this.userName,
        password: this.password,
      });
    },
    async sendEmail() {
      this.forgotPassword = false;
      this.$store.dispatch("requestPasswordReset", this.email);
    },
    async resetMyPassword() {
      this.$store.dispatch("resetPassword", {
        email: this.email,
        password: this.newPassword,
        code: this.code,
      });
    },
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ path: "/" });
    }
  },
  computed: {
    resetPassword() {
      return this.$store.state.auth.passwordReset;
    },
  },
};
</script>
