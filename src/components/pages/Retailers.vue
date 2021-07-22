<template>
  <div>
    <h1 class="mt-10">Retailers</h1>
    <v-row justify="center" class="mx-5 my-10">
      <v-col cols="6" md="3" v-for="(x, i) in retailers" :key="i">
        <CategoryCard
          :width="250"
          :title="x.storeName"
          :image="x.storeCover"
          :id="x.id"
        />
      </v-col>
    </v-row>
    <div class="mx-4 my-0"></div>
  </div>
</template>

<script>
import CategoryCard from "../category/CategoryCard.vue";
export default {
  components: {
    CategoryCard,
  },
  created() {
    this.$store.dispatch("getRetailers");
  },
  computed: {
    retailers() {
      return this.$store.getters.retailers;
    },
  },
};
</script>

<style scoped></style>
