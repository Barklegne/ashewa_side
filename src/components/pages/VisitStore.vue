<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row v-if="tab === 4" class="pa-0 ma-0">
      <!-- {{ vendorInfo }} -->
      <Home :products="vendorProducts" :information="vendorInfo"></Home>
    </v-row>
    <v-row v-else-if="tab === 0" class="my-5 pa-0">
      <Products></Products>
    </v-row>
    <v-row justify="center" v-else-if="tab === 1" class="my-5 pa-0">
      <v-col cols="12" md="10">
        <v-container>
          <v-row no-gutters>
            <v-col :cols="12">
              <v-card-text class="" tile outlined>
                <v-card-title class="subheading ">New Arrivals</v-card-title>
                <v-divider></v-divider>
                <div class="row my-1">
                  <div
                    v-for="(n, i) in vendorProducts.length < 4
                      ? vendorProducts
                      : 4"
                    :key="i"
                    class="col-12 col-md-3 col-sm-6 col-xs-6 text-center"
                  >
                    <v-hover v-slot:default="{ hover }" open-delay="200">
                      <v-card :elevation="hover ? 16 : 2">
                        <v-img
                          class="white--text align-end"
                          height="200px"
                          :src="
                            vendorProducts[i].image[0] == 'h'
                              ? vendorProducts[i].image
                              : `http://api.ashewa.com/media/${vendorProducts[i].image}`
                          "
                          gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.5)"
                        >
                          <v-card-title style="font-size:18px">
                            {{ vendorProducts[i].name }}
                          </v-card-title>
                        </v-img>

                        <v-card-text class=" text-center">
                          <h3>{{ vendorProducts[i].category.name }}</h3>
                        </v-card-text>

                        <div class="text-center">
                          <v-btn
                            @click="
                              $router.push({
                                path: `/ProductDetails/${vendorProducts[i].id}`,
                              })
                            "
                            class="ma-2"
                            outlined
                            color="info"
                          >
                            Explore
                          </v-btn>
                        </div>
                      </v-card>
                    </v-hover>
                  </div>
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row no-gutters>
            <v-col :cols="12">
              <v-card-text class="" tile outlined>
                <v-card-title class="subheading ">Best Sellers</v-card-title>
                <v-divider></v-divider>
                <div class="row my-1">
                  <div
                    v-for="(n, i) in vendorProducts.length > 4
                      ? vendorProducts
                      : 4"
                    :key="i"
                    class="col-12 col-md-3 col-sm-6 col-xs-6 text-center"
                  >
                    <v-hover v-slot:default="{ hover }" open-delay="200">
                      <v-card :elevation="hover ? 16 : 2">
                        <v-img
                          class="white--text align-end"
                          height="200px"
                          :src="
                            vendorProducts[i].image[0] == 'h'
                              ? vendorProducts[i].image
                              : `http://api.ashewa.com/media/${vendorProducts[i].image}`
                          "
                          gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.5)"
                        >
                          <v-card-title style="font-size:18px">
                            {{ vendorProducts[i].name }}
                          </v-card-title>
                        </v-img>

                        <v-card-text class=" text-center">
                          <h3>{{ vendorProducts[i].category.name }}</h3>
                        </v-card-text>

                        <div class="text-center">
                          <v-btn
                            @click="
                              $router.push({
                                path: `/ProductDetails/${vendorProducts[i].id}`,
                              })
                            "
                            class="ma-2"
                            outlined
                            color="info"
                          >
                            Explore
                          </v-btn>
                        </div>
                      </v-card>
                    </v-hover>
                  </div>
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row v-else class="my-5 pa-0 ma-0">
      <About></About>
    </v-row>
  </div>
</template>

<script>
import Home from "../store/Home.vue";
// import Product from "../store/Product.vue";
import Products from "../store/Products.vue";
import About from "../store/About.vue";
export default {
  created() {
    this.$store.dispatch("getVendorInformation", this.$route.params.id);
  },
  components: {
    Home,
    // Product,
    Products,
    About,
  },
  computed: {
    tab() {
      return this.$store.state.product.tab;
    },
    vendorInfo() {
      return this.$store.state.product.vendorInfo;
    },
    loading() {
      return this.$store.state.product.loading;
    },
    vendorProducts() {
      return this.$store.state.product.vendorProducts;
    },
    catagories() {
      function arrayUnique(array) {
        var a = array.concat();
        for (var i = 0; i < a.length; ++i) {
          for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) a.splice(j--, 1);
          }
        }
        return a;
      }
      return arrayUnique(this.vendorProducts.map((n) => n.category));
    },
  },
};
</script>

<style></style>
