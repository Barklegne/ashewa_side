<template>
  <v-container v-show="showErrorMessage">
    <v-layout style="z-index:3000">
      <v-flex>
        <v-snackbar
          v-model="showErrorMessage"
          color="error"
          multi-line
          bottom
          :timeout="-1"
        >
          <ul>
            <li v-for="(item, index) in error" :key="index">
              {{ item.substring(7, item.length) }}
            </li>
          </ul>
          <v-btn text @click="showErrorMessage = false">Close</v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as types from "@/store/mutation-types";
import { formatErrorMessages } from "@/utils/utils.js";

export default {
  name: "ErrorMessage",
  computed: {
    showErrorMessage: {
      get() {
        return this.$store.state.error.showErrorMessage;
      },
      set(value) {
        this.$store.commit(types.SHOW_ERROR, value);
      },
    },
    error() {
      return formatErrorMessages(
        "errors",
        this.$store.state.error.errorMessage
      );
    },
  },
  watch: {
    error() {
      setTimeout(() => {
        if(this.error !== null){
          if(this.error[0] !== "errors.SERVER_TIMEOUT_CONNECTION_ERROR")
          {
            this.showErrorMessage = this.error !== null;
          }
          else{
          this.showErrorMessage = false;}
        }
        else{
          this.showErrorMessage = false;
          }
        
      }, 100);
    },
  },
};
</script>
