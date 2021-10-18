<template>
  <div class="mt-5 mx-5">
    <v-row justify="space-around" v-if="!!subCategory">
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
        <v-row class="mb-4">
          <div
            :class="!$vuetify.theme.dark ? 'leftContLight' : 'leftContDark'"
            style="width:100%;text-align:start;"
          >
            <div class="mb-4" style="font-size:20px;">SUB-CATEGORIES</div>
            <div
              class="my-1"
              style="cursor: pointer;"
              v-for="item in subCategory.subcategorySet"
              :key="item.id"
              @click="
                $router.push({
                  path: `/category/${item.id}`,
                })
              "
            >
              {{ item.name }}
            </div>
          </div>
        </v-row>
      </v-col>
      <v-col class="test1" cols="11" md="8">
        <section class="sec" id="best-sale-items">
          <v-row>
            <h2 style="font-weight:normal;">Best Sale Items</h2>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-slide-group
              v-model="model"
              class="pa-4"
              active-class="success"
              show-arrows
            >
              <v-slide-item class="mr-5 mb-4" v-for="(n, i) in dataN" :key="i">
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
                  :productrateSet="n.productrateSet"
                />
              </v-slide-item>
            </v-slide-group>
          </v-row>
        </section>
        <section class="sec" id="recomended-sale-items">
          <v-row>
            <h2 style="font-weight:normal;">Recomended Items</h2>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-slide-group
              v-model="model"
              class="pa-4"
              active-class="success"
              show-arrows
            >
              <v-slide-item class="mr-5 mb-4" v-for="(n, i) in dataN" :key="i">
                <ProductCard
                  :vendor="n.vendor"
                  :description="n.description"
                  :dealerPrice="0"
                  :productName="n.name"
                  :productImages="n.productimageSet"
                  :sellingPrice="n.sellingPrice"
                  :productId="`${n.id}`"
                  :productCategory="n.category"
                  :width="150"
                  :height="150"
                  :productrateSet="n.productrateSet"
                />
              </v-slide-item>
            </v-slide-group>
          </v-row>
        </section>
        <section class="sec" id="products-found">
          <div>
            <v-row
              class="pa-3"
              :style="
                $vuetify.theme.dark
                  ? 'background-color:#121212'
                  : 'background-color:#F5F5F5;'
              "
              ><div class="mt-3">
                {{
                  `${
                    !!subCategory.productSet ? subCategory.productSet.length : 0
                  }`
                }}
                Products found
              </div>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-col cols="6" md="3" v-for="(n, index) in dataN" :key="index">
                <ProductMobile
                  :vendor="n.vendor"
                  :productName="n.name"
                  :productImages="n.productimageSet"
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
      </v-col>
    </v-row>
    <div v-else>Test</div>
  </div>
</template>

<script>
import ProductCard from "../product/ProductCard.vue";
import ProductMobile from "../product/ProductMobile.vue";
export default {
  components: {
    ProductCard,
    ProductMobile,
  },
  created() {
    this.getSubCat(this.$route.params.id);
  },
  methods: {
    async getSubCat(id) {
      await this.$store.dispatch("getSubCat", id);
      
    },
  },
  computed: {
    subCategory() {
      if (this.$store.getters.subCategory) {
        return this.$store.getters.subCategory;
      }
      return {};
    },
    dataN() {
      const d = [];
      if (this.subCategory.productSet) {
        this.subCategory.productSet.forEach((da) => {
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
