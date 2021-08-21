<template>
  <div>
    <h1 class="mt-10">News</h1>
    <v-row justify="center" class="mx-5 my-10">
      <v-col v-for="(x, i) in services" :key="i">
        <v-card class="mx-auto" width="500">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="
              x.image[0] == 'h'
                ? x.image
                : `http://api.ashewa.com/media/${x.image}`
            "
          >
            <v-card-title>{{ x.title }}</v-card-title>
          </v-img>
          <v-card-text class="text--primary text-start">
            <div v-html="x.content"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="mx-4 my-0"></div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getServices");
  },
  computed: {
    services() {
      return this.$store.getters.services;
    },
  },
};
</script>

<style scoped></style>
