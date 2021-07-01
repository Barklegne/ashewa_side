<template>
  <div>
    <div class="hidden-md-and-down mt-5 mx-5">
      <v-row justify="space-around" v-if="!!category">
        <v-col class="hidden-sm-and-down" cols="3">
          <v-row class="mb-4">
            <div
              :class="!$vuetify.theme.dark ? 'leftContLight' : 'leftContDark'"
              style="width:100%;text-align:start;"
            >
              <div class="mb-4" style="font-size:20px;">CATEGORIES</div>
              <div class="my-1" style="cursor: pointer;">
                All Categories
              </div>
              <div
                class="my-1"
                style="cursor: pointer;"
                v-for="item in categories"
                :key="item.id"
                @click="
                  $router.push({
                    path: `/subcategory/${item.id}`,
                  })
                "
              >
                {{ item.name }}
              </div>
            </div>
          </v-row>
        </v-col>
        <v-col class="test1" cols="11" md="8">
          <section id="top-categories-of-the-month">
            <v-app-bar dense flat>
              <v-toolbar-title class="font-weight-bold"
                >Shop by Category
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn text depressed>View All</v-btn>
            </v-app-bar>
            <div class="mx-4 my-5">
              <v-row>
                <v-col
                  cols="6"
                  lg="3"
                  md="4"
                  sm="6"
                  v-for="(n, i) in category.categorySet"
                  :key="i"
                >
                  <CategoryCard :title="n.name" :image="n.image" :id="n.id" />
                </v-col>
              </v-row>
            </div>
          </section>
          <section class="sec" id="recomended-sale-items">
            <v-row>
              <h2 style="font-weight:normal;">Best Sellers</h2>
            </v-row>
            <v-divider class="my-4"></v-divider>
            <v-row>
              <v-slide-group
                v-model="model"
                class="pa-4"
                active-class="success"
                show-arrows
              >
                <v-slide-item
                  class="mr-5 mb-4"
                  v-for="(n, i) in dataN"
                  :key="i"
                >
                  <ProductCard
                    :vendor="n.vendor"
                    :productName="n.name"
                    :productImages="n.productimageSet"
                    :sellingPrice="n.sellingPrice"
                    :productId="`${n.id}`"
                    :productCategory="n.category"
                    :description="n.description"
                    :dealerPrice="0"
                    :width="150"
                    :height="150"
                  />
                </v-slide-item>
              </v-slide-group>
            </v-row>
          </section>
        </v-col>
      </v-row>
    </div>
    <v-row
      class="ma-0 hidden-lg-and-up"
      justify="space-around"
      v-if="!!category"
    >
      <p>{{ category.productSet }}</p>
      <v-col class="test1" cols="12">
        <section id="top-categories-of-the-month">
          <p class="text-start mx-5">Shop by Category</p>
          <div class="mx-4 my-5">
            <v-row>
              <v-col
                cols="6"
                lg="3"
                md="4"
                sm="6"
                class="ma-0 pa-1"
                v-for="(n, i) in category.categorySet"
                :key="i"
              >
                <CategoryCard :title="n.name" :image="n.image" :id="n.id" />
              </v-col>
            </v-row>
          </div>
        </section>
        <section class="sec" id="recomended-sale-items">
          <p class="text-start mx-5">Best Sellers</p>
          <div style="background-color:#ededed" class="py-3 pl-2">
            <v-row class="ma-0">
              <v-col
                class="pa-0 ma-0"
                cols="6"
                v-for="(n, i) in dataN"
                :key="i"
              >
                <ProductMobile
                  :vendor="n.vendor"
                  :productName="n.name"
                  :productImages="n.productimageSet"
                  :sellingPrice="n.sellingPrice"
                  :productId="`${n.id}`"
                  :productCategory="n.category"
                  :width="150"
                  :height="150"
                />
              </v-col>
            </v-row>
          </div>
        </section>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductCard from "../product/ProductCard.vue";
import ProductMobile from "../product/ProductMobile.vue";
import CategoryCard from "../category/SubCategoryCard.vue";

export default {
  components: {
    ProductCard,
    ProductMobile,
    CategoryCard,
    // ProductSlide,
  },
  created() {
    //this.getFilteredProducts();
  },
  methods: {
    async getFilteredProducts() {
      await this.$store.dispatch("filterProducts", {
        pcat: this.$route.params.id,
        page: 1,
        pageSize: 6,
        ranged: false,
        minP: 0,
        maxP: 1000000,
      });
    },
  },
  computed: {
    category() {
      return this.$store.getters.getCategoryId(this.$route.params.id);
    },
    dataN() {
      const d = [];
      if (this.category.productSet) {
        this.category.productSet.forEach((da) => {
          if (da.productimageSet.length == 0) {
            if (da.image) {
              d.push({ ...da, productimageSet: [{ image: da.image }] });
            }
          } else {
            d.push(da);
          }
        });
      }
      return d;
    },
    filteredProducts() {
      return this.$store.getters.filteredProducts;
    },
    categories() {
      return this.$store.getters.categories;
    },
    dealOfTheDay() {
      return this.$store.getters.products;
    },
    all() {
      return this.$store.getters.sampleProducts;
    },
    sampleProducts() {
      return this.$store.getters.sampleProducts;
    },
    sampleCategories() {
      return this.$store.getters.sampleCategories;
    },
  },

  data() {
    return {
      sortBy: [
        "sort by latest",
        "sort by latest",
        "sort by latest",
        "sort by latest",
        "sort by latest",
      ],
      checkbox1: null,
      model: null,
    };
  },
};
</script>

<style scoped>
.leftContLight {
  padding: 2rem;
  background-color: #f5f5f5;
}
.leftContDark {
  padding: 2rem;
  background-color: #1f1e1e;
}
.sec {
  margin-bottom: 20px;
}
.dropDown {
  border: 1px solid green;
}
</style>
