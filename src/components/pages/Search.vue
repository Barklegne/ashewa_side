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
        <v-row class="ma-2">
          <v-col
            class="pa-2"
            cols="6"
            md="3"
            v-for="(n, index) in products"
            :key="index"
          >
            <ProductMobile
              :vendor="n.vendor"
              :productName="n.name"
              :productImages="
                n.productimageSet.length == 0
                  ? [{ image: n.image }]
                  : n.productimageSet
              "
              :sellingPrice="n.sellingPrice"
              :usdPrice="n.usdPrice"
              :productId="`${n.id}`"
              :productCategory="n.category"
              :productrateSet="n.productrateSet"
            />
          </v-col>
        </v-row>
      </div>
    </section>
  </div>
</template>

<script>
import ProductMobile from "../product/ProductCard.vue";

export default {
  components: {
    ProductMobile,
  },
  created() {
    this.searchBy(JSON.parse(this.$route.params.id));
  },
  methods: {
    searchBy(id) {
      this.$store.dispatch("searchFilter", id);
      //This event signifies that a successfull search has happend
      this.$gtag.event("Serch", {
        event_category: "Product Search",
        event_label: "Number of User Searched on Ashewa",
      });
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
