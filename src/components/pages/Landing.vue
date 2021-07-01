<template>
  <div>
    <FirstAd></FirstAd>
    <div id="top-categories-of-the-month">
      <v-app-bar color="white" dense flat>
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
            <CategoryCard
              :width="250"
              :title="n.name"
              :image="n.image"
              :id="n.id"
            />
          </v-slide-item>
        </v-slide-group>
      </div>
    </div>
    <landingAd></landingAd>
    <ProductSlide class="mb-5" title="Deal of the day" :data="dealOfTheDay" />
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
import CategoryCard from "../category/CategoryCard.vue";
import LandingAd from "../advertisement/Landing.vue";

export default {
  components: {
    FirstAd,
    SecondAd,
    ThirdAd,
    ProductSlide,
    CategoryCard,
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

<style lang="scss" scoped></style>
