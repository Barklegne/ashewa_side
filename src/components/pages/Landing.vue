<template>
  <div>
    <FirstAd></FirstAd>
    <div id="top-categories-of-the-month">
      <v-app-bar color="#f2f7f4" dense flat>
        <v-toolbar-title class="hidden-md-and-down font-weight-bold">
          All Categories
        </v-toolbar-title>
        <v-toolbar-title
          style="font-size:15px"
          class="hidden-lg-and-up font-weight-bold"
        >
          All Categories
        </v-toolbar-title>
      </v-app-bar>
      <div class="mx-4 my-0">
        <v-slide-group>
          <v-slide-item class="mr-5 mb-4" v-for="(n, i) in categories" :key="i">
            <!-- <CategoryCard
              :width="250"
              :title="n.name"
              :image="n.image"
              :id="n.id"
            /> -->
            <v-hover v-slot="{ hover }" open-delay="200">
              <div
                @click="
                  vendor
                    ? $router.push({
                        path: `/vendors/${n.id}`,
                      })
                    : supplier
                    ? $router.push({
                        path: `/suppliers/${n.id}`,
                      })
                    : $router.push({
                        path: `/subcategory/${n.id}`,
                      })
                "
                style="cursor: pointer;"
              >
                <v-card
                  class="hidden-md-and-down"
                  :elevation="hover ? 16 : 2"
                  :shaped="hover"
                  :class="{ 'on-hover': hover }"
                  :width="250"
                  :height="250 ? 250 - 50 : ''"
                >
                  <v-img
                    :src="
                      n.image[0] == 'h'
                        ? n.image
                        : `http://api.ashewa.com/media/${n.image}`
                    "
                    lazy-src="/img/icons/mobile-logo.png"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    :width="250"
                    :height="250 ? 250 - 50 : ''"
                  >
                    <v-card-title
                      class="text-md-h6 text-subtitle-2"
                      v-text="n.name.length > 21 ? n.name.slice(0, 21) : n.name"
                    ></v-card-title>
                  </v-img>
                </v-card>
                <v-card class="hidden-lg-and-up" width="150" height="100">
                  <v-img
                    :src="
                      n.image[0] == 'h'
                        ? n.image
                        : `http://api.ashewa.com/media/${n.image}`
                    "
                    lazy-src="/img/icons/mobile-logo.png"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
                    width="150"
                    height="100"
                  >
                    <v-card-title
                      class="text-md-h6 mb-0 text-subtitle-2 font-weight-bold align-content-lg-start"
                      v-text="n.name"
                    ></v-card-title>
                  </v-img>
                </v-card>
              </div>
            </v-hover>
          </v-slide-item>
        </v-slide-group>
      </div>
    </div>
    <landingAd></landingAd>
    <ProductSlide class="mb-5" title="New Arrivals" :data="newArrivals" />
    <SecondAd></SecondAd>
    <ProductSlide
      v-for="(n, i) in categories"
      :key="i"
      :title="n.name"
      :data="n.productSet"
    />
    <ThirdAd></ThirdAd>
  </div>
</template>

<script>
import FirstAd from "../advertisement/FirstAd.vue";
import SecondAd from "../advertisement/SecondAd.vue";
import ThirdAd from "../advertisement/ThirdAd.vue";
import ProductSlide from "../product/ProductSlide.vue";
// import CategoryCard from "../category/CategoryCard.vue";
import LandingAd from "../advertisement/Landing.vue";

export default {
  components: {
    FirstAd,
    SecondAd,
    ThirdAd,
    ProductSlide,
    // CategoryCard,
    LandingAd,
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    products() {
      return this.$store.getters.products;
    },
    totalProducts() {
      return this.$store.getters.totalProducts;
    },
    dealOfTheDay() {
      return this.$store.getters.dealOfTheDay;
    },
    newArrivals() {
      return this.$store.state.product.newArrivals;
    },
    electronics() {
      return this.$store.getters.electronics;
    },
    clothings() {
      return this.$store.getters.clothings;
    },
    home() {
      return this.$store.getters.home;
    },
    sampleCategories() {
      return this.$store.getters.sampleCategories;
    },
    sampleProducts() {
      return this.$store.getters.sampleProducts;
    },
  },
};
</script>

<style lang="sass" scoped></style>
