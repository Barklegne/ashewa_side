<template>
  <v-container
    style="background-color:white;margin-bottom:80px;"
    fluid
    class="mb-25"
  >
    <v-layout row wrap class="mx-10">
      <v-flex xs12 sm6 offset-sm3>
        <div class="my-5">
          <h1 style="font-size:50px; font-color:#4DBA87;">Sign Up</h1>
        </div>
        <div>
          <v-subheader dense
            >Please fill the form to create your Ashewa Account</v-subheader
          >
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <v-layout column>
              <v-flex>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    v-model="firstName"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    color="#4DBA87"
                    prepend-inner-icon="mdi-account-circle-outline"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>

              <v-flex>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    v-model="lastName"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    color="#4DBA87"
                    prepend-inner-icon="mdi-account-circle-outline"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>

              <v-flex>
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <v-text-field
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    v-model="email"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    color="#4DBA87"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
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
                    color="#4DBA87"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex mb-5>
                <VuePhoneNumberInput
                  default-country-code="ET"
                  v-model="yourValue"
                  :error="error"
                />
              </v-flex>
              <v-flex>
                <ValidationProvider
                  rules="required|min:5"
                  v-slot="{ errors }"
                  vid="password"
                >
                  <v-text-field
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    v-model="password"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    ref="password"
                    autocomplete="off"
                    outlined
                    dense
                    color="#4DBA87"
                    prepend-inner-icon="mdi-lock-outline"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex>
                <ValidationProvider
                  rules="required|min:5|confirmed:password"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    v-model="confirmPassword"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    color="#4DBA87"
                    prepend-inner-icon="mdi-lock-outline"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-row>
                <v-col cols="auto">
                  <SubmitButton
                    buttonText="Signup"
                    color="#4DBA87"
                    class="white--text"
                  />
                </v-col>
              </v-row>
              <v-btn
                :to="{ path: '/login' }"
                small
                text
                class="btnForgotPassword"
                >Already have an account?
                <span style="color:#4DBA87;">Login</span></v-btn
              >
            </v-layout>
          </form>
        </ValidationObserver>
      </v-flex>
      <ErrorMessage />
    </v-layout>
    <v-dialog
      v-model="serVerify"
      style="background-color:red"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-5">
        <h3 class="mb-2">Verify Email</h3>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(verifyEmailA)">
            <v-layout column>
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
              <v-flex>
                <SubmitButton
                  class="white--text"
                  buttonText="Verify"
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
      titleTemplate: `Signup`,
    };
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      yourValue: "",
      userName: "",
      accountType: "",
      email: "",
      password: "",
      address: "",
      confirmPassword: "",
      code: "",
    };
  },
  methods: {
    ...mapActions(["userSignUp"]),
    async verifyEmailA() {
      this.$store.dispatch("verifyEmail", {
        email: this.email,
        code: this.code,
        password: this.password,
        userName: this.userName,
      });
    },
    async submit() {
      console.log({
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        email: this.email,
        password: this.password,
        phone: this.yourValue,
      });
      //This event signifies that a successfull signup has happend
      this.$gtag.event("Sign Up", {
        event_category: "Ashewa Form Sign Up",
        event_label: "User Sign Up",
      });

      if (this.yourValue.replace(/\s+/g, "").length != 10) {
        console.log("phone number is too short");
        this.error = true;
      } else {
        this.error = false;
        await this.userSignUp({
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
          password: this.password,
          phone: this.yourValue,
        });
      }
    },
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ name: "landing" });
    }
  },
  computed: {
    error() {
      return this.yourValue.length !== 12 ? true : false;
    },
    requestSent() {
      return this.$store.state.auth.requestSent;
    },
    verify() {
      return this.$store.state.auth.verify;
    },
    serVerify() {
      return this.requestSent && !this.verify;
    },
  },
};
</script>
