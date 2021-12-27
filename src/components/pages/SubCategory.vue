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

              <div
                class="my-1"
                :style="selected === item.id? 'cursor: pointer;color:#43DB80':'cursor: pointer;'"
                v-for="item in categories"
                :key="item.id"
                @click="
                  selected = item.id
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
             
            </v-app-bar>
            <div class="mx-4 my-5">
              <v-row>
                <v-col
                  cols="6"
                  lg="3"
                  md="4"
                  sm="6"
                  v-for="(n, i) in selectedSubcategory.categorySet"
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
                    :productrateSet="n.productrateSet"
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
                  :productrateSet="n.productrateSet"
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
    this.selected = this.$route.params.id
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
      if(this.productsFromSelected){
      this.productsFromSelected.data.forEach((da) => {
        if (da.productimageSet.length == 0) {
          if (da.image) {
            
            if(!da.usdPrice){
              d.push({ ...da, productimageSet: [{ image: da.image }] ,usdPrice:0});
            }
            else{
              d.push({ ...da, productimageSet: [{ image: da.image }] });
              }
          }
        } else {
          
          if(!da.usdPrice){
              d.push({...da,usdPrice:0});
            }
            else{
              d.push(da);
            }
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
    parentCategoriesProducts(){
      return this.$store.state.categories.parentCategoriesProducts
    },
    selectedSubcategory(){
      return this.categories.find(item => item.id === this.selected)
    },
    productsFromSelected(){
      if(this.selectedSubcategory){
        
      if(!this.parentCategoriesProducts.find(item => item.id === this.selected)){
        
        this.$store.dispatch('singleCat',{id: this.selected,name:this.selectedSubcategory.name})
        return null
      }
      return this.parentCategoriesProducts.find(item => item.id === this.selected)}
      return null
    }
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
      selected: ""
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
