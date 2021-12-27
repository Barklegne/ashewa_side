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
                  $router.push({
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
    <!-- <landingAd></landingAd> -->
    <SecondAd></SecondAd>
    
    <ProductSlide
      v-for="(n, i) in parentCategoriesProducts"
      :key="i"
      :title="n.name"
      :data="n.data"
    />
    <div v-if="categories.length !== parentCategoriesProducts.length" class="mb-2">
    <v-app-bar color="#f2f7f4" v-if="title != 'Deal of the day'" dense flat>
      <v-toolbar-title class="hidden-md-and-down font-weight-bold"
        >All Products
      </v-toolbar-title>
      <v-toolbar-title
        style="font-size:15px"
        class="hidden-lg-and-up font-weight-bold"
        >All Products
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-row class="hidden-sm-and-down">
    <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item class="mr-5 mb-4" v-for="(n, i) in 5" :key="i">
          <v-sheet
            color="grey lighten-4"
            class="pa-3"
          >
            <v-skeleton-loader
              class="mx-auto"
              width="300"
              type="card"
            ></v-skeleton-loader>
          </v-sheet>
        </v-slide-item>
    </v-slide-group>
    </v-row>
    <v-row style="background-color:#FFFFFF" class="mx-4 py-5 hidden-md-and-up">
      <v-col
        v-for="(n, i) in 4"
        :key="i"
        cols="6"
        lg="3"
        md="4"
        sm="6"
        class="ma-0 pa-0"
      >
       <v-sheet
            color="grey lighten-4"
            class="pa-3"
          >
            <v-skeleton-loader
              class="mx-auto"
              width="150"
              type="card"
            ></v-skeleton-loader>
          </v-sheet>
      </v-col>
    </v-row>
    </div>
    <ProductSlide class="mb-5" title="New Arrivals" :data="newArrivals" />
    <ThirdAd ref="users" ></ThirdAd>
    <SuccessMessage></SuccessMessage>
  </div>
</template>

<script>
const FirstAd = () => import("../advertisement/FirstAd.vue");
const SecondAd = () => import("../advertisement/SecondAd.vue");
const ThirdAd = () => import("../advertisement/ThirdAd.vue");
const ProductSlide = () => import("../product/ProductSlide.vue");
const SuccessMessage = () => import("@/components/common/SuccessMessage");

export default {
  components: {
    FirstAd,
    SecondAd,
    ThirdAd,
    ProductSlide,
    // CategoryCard,
    // LandingAd,
    SuccessMessage,
  },
  data(){
      return{
        lastIndex:0
      }
    },
  methods:{
    getNextCategory() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= (document.documentElement.offsetHeight*0.5);
        if (bottomOfWindow ) {
              if(this.categories.length > this.lastIndex){
              this.$store.dispatch('singleCat',{id: this.categories[this.lastIndex].id,name:this.categories[this.lastIndex].name})
              this.lastIndex++ 
              }
              
          }
      }
    }, 
    },
    mounted() {
      this.getNextCategory();   
    },
  computed: {
    categories() {
      const d=[];
      this.$store.getters.categories.forEach(element => {
        if(element.image){
          d.push({...element})
        }
        else{
          d.push({...element,image:""})
        }
      });
      return d;
    },
    parentCategoriesProducts() {
      return this.$store.state.categories.parentCategoriesProducts
    },
    // loadProducts(){
    //   if(this.$store.state.categories.loadedProducts < )
    // },
    
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
