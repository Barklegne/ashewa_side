<template>
  <div>
    <section class="sec" id="products-found">
      <div>
        <v-row
          class="pa-3 mt-2 mx-0"
          :style="
            $vuetify.theme.dark
              ? 'background-color:#121212'
              : 'background-color:#F5F5F5;'
          "
          ><div class="mt-3">
            {{ `${products.length}` }}
            Products found
          </div>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col cols="6" md="3" v-for="(n, index) in products" :key="index">
            <ProductMobile
              :vendor="n.vendor"
              :productName="n.name"
              :productImages="
                n.productimageSet.length == 0
                  ? [{ image: n.image }]
                  : n.productimageSet
              "
              :sellingPrice="n.sellingPrice"
              :productId="`${n.id}`"
              :productCategory="n.category"
              :width="150"
              :productrateSet="n.productrateSet"
              :height="150"
            />
          </v-col>
        </v-row>
      </div>
    </section>
  </div>
</template>

<script>
import ProductMobile from "../product/ProductMobile.vue";

export default {
  components: {
    ProductMobile,
  },
  created() {
    this.searchBy(this.$route.params.id);
  },
  methods: {
    searchBy(id) {
      this.$store.dispatch("search", id);
    },
  },
  computed: {
    products() {
      return this.$store.state.search.products;
    },
  },
};
</script>

<style scoped></style>
