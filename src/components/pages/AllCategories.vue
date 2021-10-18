<template>
  <div>
    <p style="font-size:16px;font-weight:600" class="text-start mx-5 mt-4">
      All Categories
    </p>
    <v-divider></v-divider>
    <v-row class="ma-0 mt-2">
      <v-col class="pa-1" v-for="cat in categories" :key="cat.id" cols="4">
        <CategoryCard
          :title="cat.name"
          :image="cat.image"
          :id="cat.id"
        ></CategoryCard>
      </v-col>
    </v-row>
    <!-- <v-select
      class="hidden-md-and-up"
      :items="categories"
      label="Categories"
      solo
    >
    </v-select> -->
  </div>
</template>

<script>
import CategoryCard from "../category/CategoryCard.vue";
export default {
  components: {
    CategoryCard,
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
};
</script>
