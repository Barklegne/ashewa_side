<template>
  <div style="width:100%">
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(n, i) in vendorImageGallerySet"
        :key="i"
        :src="n"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
            <strong>{{ vendorInfo.storeName.toUpperCase() }}</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <div class="pl-4 pr-4 row">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            :src="
              vendorProducts[0].image[0] == 'h'
                ? vendorProducts[0].image
                : `http://api.ashewa.com/media/${vendorProducts[0].image}`
            "
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.5)"
            aspect-ratio="1"
            height="400px"
          >
            <h1 class="text-center font-size">Top Picks</h1>
            <div class="text-center">
              <v-btn
                @click="
                  $router.push({
                    path: `/ProductDetails/${vendorProducts[0].id}`,
                  })
                "
                class="white--text "
                outlined
                >SHOP NOW</v-btn
              >
            </div>
          </v-img>
        </v-card>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            :src="
              vendorProducts[1].image[0] == 'h'
                ? vendorProducts[1].image
                : `http://api.ashewa.com/media/${vendorProducts[1].image}`
            "
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.5)"
            aspect-ratio="1"
            height="400px"
          >
            <h1 class="text-center font-size">New Arrivals</h1>
            <div class="text-center">
              <v-btn
                @click="
                  $router.push({
                    path: `/ProductDetails/${vendorProducts[1].id}`,
                  })
                "
                class="white--text"
                outlined
                >SHOP NOW</v-btn
              >
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
    <div class="pl-4 pr-4 row">
      <div
        v-for="(n, i) in vendorProducts.length < 3 ? vendorProducts : 3"
        :key="i"
        class="col-md-4 col-sm-4 col-xs-12"
      >
        <v-card outlined>
          <v-img
            :src="
              vendorProducts[i].image[0] == 'h'
                ? vendorProducts[i].image
                : `http://api.ashewa.com/media/${vendorProducts[i].image}`
            "
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.5)"
            height="300px"
            aspect-ratio="1"
          >
            <h1 class="text-center font-size">{{ vendorProducts[i].name }}</h1>
            <div class="text-center mt-2">
              <v-btn
                class="white--text caption"
                @click="
                  $router.push({
                    path: `/ProductDetails/${vendorProducts[i].id}`,
                  })
                "
                text
                >SHOP NOW
                <v-icon class="white--text caption"
                  >mdi-arrow-right</v-icon
                ></v-btn
              >
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
    <v-container>
      <v-row no-gutters>
        <v-col :cols="12">
          <v-card-text class="" tile outlined>
            <v-card-title class="subheading ">Deals of the Day</v-card-title>
            <v-divider></v-divider>
            <div class="row my-1">
              <div
                v-for="(n, i) in vendorProducts.length < 4 ? vendorProducts : 4"
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
    <!-- <v-card class="accent">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">FREE SHIPPING & RETURN</h3>
                <p class="font-weight-thin">Free Shipping over $300</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">MONEY BACK GUARANTEE</h3>
                <p class="font-weight-thin">30 Days Money Back Guarantee</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">020-800-456-747</h3>
                <p class="font-weight-thin">24/7 Available Support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      activeBtn: 1,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  computed: {
    vendorInfo() {
      return this.$store.state.product.vendorInfo;
    },
    vendorProducts() {
      return this.$store.state.product.vendorProducts;
    },
    vendorImageGallerySet() {
      // if()
      console.log(
        this.$store.state.product.vendorInfo.vendorgallerySet.length == 0
          ? this.vendorProducts[0].image
          : this.$store.state.product.vendorgallerySet.length == 0
      );
      return this.$store.state.product.vendorInfo.vendorgallerySet.length == 0
        ? [
            "https://loving-leavitt-9cb65b.netlify.app/static/img/slider2.b3a6509.jpg",
          ]
        : this.$store.state.product.vendorgallerySet.length == 0;
    },
  },
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
