<template>
  <div>
    <v-row class="ma-0">
      <v-spacer></v-spacer>
      <v-toolbar max-width="500" class="mt-3" dark color="lighten-2 green">
        <v-toolbar-title>Suppliers</v-toolbar-title>
        <v-autocomplete
          v-model="select"
          @change="
            $router.push({
              path: `/suppliers/${select}`,
            })
          "
          :loading="loading"
          item-text="storeName"
          item-value="id"
          :items="suppliers"
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="Search"
          solo-inverted
        ></v-autocomplete>
      </v-toolbar>
      <v-spacer></v-spacer>
    </v-row>
    <v-row justify="center" class="mx-5 my-10">
      <v-col cols="6" md="3" v-for="(x, i) in suppliers" :key="i">
        <CategoryCard
          :width="250"
          :title="x.storeName"
          image="https://www.khaoscontrol.com/wp-content/uploads/2020/06/supplier-management-header.jpg"
          :id="x.id"
          :supplier="true"
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
    this.$store.dispatch("getSuppliers");
  },
  computed: {
    suppliers() {
      return this.$store.getters.suppliers;
    },
  },
};
</script>

<style scoped></style>
