<template>
  <div>
    <h1 class="mt-10">Suppliers</h1>
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
