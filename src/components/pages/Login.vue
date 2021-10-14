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
    </v-layout>
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
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ path: "/" });
    }
  },
};
</script>
