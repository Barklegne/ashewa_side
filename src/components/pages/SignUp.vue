<template>
  <v-container style="background-color:white" fluid class="mb-3">
    <v-layout row wrap class="mx-10">
      <v-flex xs12 sm6 offset-sm3>
        <div class="my-5">
          <h1 style="font-size:50px">Signup</h1>
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
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex>
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
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex>
                <v-select
                  id="accountType"
                  label="Account Type"
                  name="accountType"
                  v-model="accountType"
                  :items="[
                    'Customer',
                    'Vendor',
                    'Supplier',
                    'Delivery Personal',
                    'Affiliate',
                  ]"
                  color="#09B750"
                />
              </v-flex>
              <div
                v-if="
                  accountType == 'Vendor' ||
                    accountType == 'Supplier' ||
                    accountType == 'Affiliate'
                "
              >
                <v-flex>
                  <v-text-field
                    label="Phone Number"
                    name="phoneNumber"
                    type="text"
                    color="#09B750"
                  />
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="Commission"
                    name="commission"
                    type="text"
                    color="#09B750"
                  />
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="License Number"
                    name="licenseNumber"
                    type="text"
                  />
                </v-flex>
              </div>
              <v-flex text-xs-center mt-5>
                <SubmitButton buttonText="Signup" />
              </v-flex>
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
