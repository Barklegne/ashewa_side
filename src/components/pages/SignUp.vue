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
                <v-col cols="auto" class="mr-auto">
                  <v-btn
                    :to="{ path: '/signup' }"
                    small
                    text
                    class="btnForgotPassword"
                    >Sign Up as Business</v-btn
                  >
                </v-col>
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
    };
  },
  methods: {
    ...mapActions(["userSignUp"]),
    async submit() {
      console.log({
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        email: this.email,
        password: this.password,
        phone: this.yourValue,
      });
      await this.userSignUp({
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        email: this.email,
        password: this.password,
        phone: this.yourValue,
      });
    },
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ name: "landing" });
    }
  },
};
</script>
