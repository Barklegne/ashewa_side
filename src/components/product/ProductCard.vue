<template>
  <div v-if="productImages.length > 0">
    <v-card
      :color="$vuetify.theme.dark ? '#121212' : ''"
      elevation="0"
      :width="width"
      ><v-img
        :src="
          productImages[0].image[0] == 'h'
            ? productImages[0].image
            : `http://api.ashewa.com/media/${productImages[0].image}`
        "
        :height="height"
        class="white--text align-end"
        @click="
          $router.push({
            path: `/ProductDetails/${productId}`,
          })
        "
      >
        <div style="background-color: rgba(0, 0, 0, 0.336);">
          <v-rating
            v-if="productrateSet.length > 0"
            :value="averageRating"
            readonly
            background-color="green lighten-3"
            color="#09B750"
            x-small
          ></v-rating>
        </div>
      </v-img>
      <p class="overline ma-0 pa-0">{{ vendor.storeName }}</p>
      <v-divider class="mb-2 pa-0"></v-divider>
      <p class="h4 font-weight-bold ma-0" style="color:#09B750;">
        {{ sellingPrice }} ETB
      </p>
      <div>
        <a
          @click="
            $router.push({
              path: `/ProductDetails/${productId}`,
            })
          "
          class="subtitle-2"
          style="text-decoration:none;"
          >{{
            productName.length > 21
              ? `${productName.slice(0, 16)}...`
              : productName
          }}</a
        >
      </div>

      <v-divider></v-divider>
      <v-row class="mt-1" justify="center">
        <v-btn
          @click="
            addToCart({
              image: productImages[0].image,
              price: sellingPrice,
              title: productName,
              id: `${productId}`,
              category: productCategory.name,
            })
          "
          icon
          class="hover-icon"
          style=""
          ><v-icon small>mdi-cart-outline</v-icon></v-btn
        >
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon class="hover-icon" style=""
              ><v-icon small>mdi-eye-outline</v-icon></v-btn
            >
          </template>
          <v-card style="padding-bottom:20px">
            <v-row>
              <v-col cols="12" md="5" class="my-4">
                <zoom-on-hover
                  :img-normal="
                    productImages[index].image[0] == 'h'
                      ? productImages[0].image
                      : `http://api.ashewa.com/media/${productImages[index].image}`
                  "
                  :img-zoom="
                    productImages[index].image[0] == 'h'
                      ? productImages[0].image
                      : `http://api.ashewa.com/media/${productImages[index].image}`
                  "
                  style="max-width:400px"
                  :scale="1.3"
                ></zoom-on-hover>

                <v-slide-group multiple show-arrows>
                  <v-slide-item v-for="(n, i) in productImages" :key="n.id">
                    <div
                      :style="index == i ? 'border:3px solid green' : ''"
                      class="ma-1"
                      @click="toggle(i)"
                    >
                      <v-img
                        height="50px"
                        width="50px"
                        :src="
                          n.image[0] == 'h'
                            ? n.image
                            : `http://api.ashewa.com/media/${n.image}`
                        "
                      ></v-img>
                    </div>
                  </v-slide-item>
                </v-slide-group>
              </v-col>
              <v-col>
                <v-col>
                  <v-row justify="start">
                    <v-col>
                      <p class="text-h4">Overview</p>
                    </v-col>
                  </v-row>
                  <v-row justify="start" class="ml-4 text-left">
                    <div class="headline">
                      {{ productName }}
                    </div>
                  </v-row>
                  <v-row justify="start" class="ma-4">
                    <span>
                      Brand:
                      {{ vendor.storeName }}</span
                    >

                    <v-rating
                      v-if="productrateSet.length > 0"
                      v-model="averageRating"
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      dense
                      readonly
                      half-increments
                      hover
                      size="18"
                    ></v-rating>
                    <span class="caption ml-2 mt-1">({{ 3 }} review)</span>
                  </v-row>
                  <v-divider></v-divider>

                  <v-row class="mt-3 ml-2">
                    <p class="text-caption text-start">
                      {{ description }}
                    </p>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col cols="6" md="2">Unit Price:</v-col>
                    <v-col cols="6" md="3">
                      <v-row
                        ><h2 class="text-weight-bolder">
                          ETB {{ sellingPrice }}
                        </h2>
                      </v-row>
                      <v-row>
                        <h5
                          class="text-decoration-line-through text-weight-normal"
                        >
                          ETB {{ dealerPrice }}
                        </h5>
                      </v-row>
                    </v-col>

                    <v-col cols="5" lg="2">
                      <v-card class="ma-0 text-center" elevation="0">
                        <v-card-title class="ma-0 pa-0" style="font-size:16px"
                          >Quantity</v-card-title
                        >
                        <v-row class="mt-1">
                          <v-btn icon depressed @click="decrement">
                            <v-icon> mdi-arrow-down </v-icon>
                          </v-btn>

                          <span class="mt-2">{{ quantity }}</span>

                          <v-btn icon depressed @click="increment">
                            <v-icon> mdi-arrow-up </v-icon>
                          </v-btn>
                        </v-row>
                      </v-card>
                    </v-col>
                    <v-col
                      ><v-btn
                        dark
                        class="btn mt-2 mr-2"
                        tile
                        elevation="0"
                        color="btn"
                        @click="
                          addToCart({
                            image: productImages[0].image,
                            price: sellingPrice,
                            title: productName,
                            id: `${productId}`,
                            category: productCategory.name,
                            quantity: quantity,
                          })
                        "
                        style="background-color:white;color:#09b750;border:1px solid #09b750;"
                        >Buy it Now</v-btn
                      >
                      <v-btn
                        class="btn mt-2 mr-2"
                        tile
                        dark
                        elevation="0"
                        color="success"
                        >Visit Store</v-btn
                      ></v-col
                    >
                  </v-row>

                  <v-divider class="my-6"></v-divider>
                  <v-row>
                    <v-col cols="12" lg="6">
                      <v-card-title>Price per Quantity</v-card-title>
                      <v-card class=" text-start" color="white" flat>
                        <v-simple-table style="border:1px solid black" dense>
                          <template v-slot:default>
                            <tbody>
                              <tr v-for="(item, i) in prices" :key="i">
                                <td style="background-color:#bbc4bdb4">
                                  {{ item.name }}
                                </td>
                                <td>{{ item.calories }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card>
                    </v-col>
                    <v-col cols="12" lg="6">
                      <v-card-title class="mx-13 text-start"
                        >Specification</v-card-title
                      >
                      <v-card class="text-start" color="white" flat>
                        <v-simple-table style="border:1px solid black" dense>
                          <template v-slot:default>
                            <tbody>
                              <tr v-for="(item, i) in desserts" :key="i">
                                <td style="background-color:#bbc4bdb4">
                                  {{ item.name }}
                                </td>
                                <td>{{ item.calories }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card></v-col
                    >
                  </v-row>
                  <v-divider class="my-6"></v-divider>
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <v-btn
          @click="
            addToWish({
              image: productImages[0].image,
              price: sellingPrice,
              title: productName,
              id: `${productId}`,
              category: productCategory.name,
            })
          "
          icon
          class="hover-icon"
          style=""
          ><v-icon small>mdi-heart-outline</v-icon></v-btn
        >
        <v-btn icon class="hover-icon" style=""
          ><v-icon small>mdi-chart-box-outline</v-icon></v-btn
        >
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    totalWishList() {
      return this.$store.getters.totalWishList;
    },
    averageRating() {
      if (this.productrateSet.length > 0) {
        let average = (arr) =>
          arr.reduce((a, b) => a.rate + b.rate) / arr.length;
        return average([{ rate: 5 }, { rate: 4 }]);
      }
      return 0;
    },
    active: {
      // getter

      get: function() {
        if (this.product) {
          return {
            id: 0,
            url_normal: `http://188.166.153.99/media/${this.product.productimageSet[0].image}`,
            url_zoom: `http://188.166.153.99/media/${this.product.productimageSet[0].image}`,
          };
        } else {
          return {};
        }
      },
      // setter
    },
    totalCartList() {
      switch (this.$store.getters.totalCartList.length) {
        case 0:
          return [];
        default:
          return this.$store.getters.totalCartList;
      }
    },
  },

  props: {
    vendor: {
      type: Object,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    dealerPrice: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImages: {
      type: Array,
      required: true,
    },
    productrateSet: {
      type: Array,
      required: true,
    },
    productCategory: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 300,
    },
  },

  data() {
    return {
      index: 0,
      items: ["Overview", "Customer Reviews", "Specification"],
      prices: [
        {
          name: "One Item",
          calories: 5000,
        },
        {
          name: "Two Items",
          calories: 9900,
        },
        {
          name: "Three Items",
          calories: 14500,
        },
      ],
      desserts: [
        {
          name: "Brand Name",
          calories: "KevinSmithGender",
        },
        {
          name: "MENOrigin",
          calories: "CN(Origin)",
        },
        {
          name: "Athletic Shoe Typ",
          calories: "Basketball",
        },
        {
          name: "ShoesShoe Widt",
          calories: "Medium(B, M)",
        },
      ],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tab: null,
      sheet: false,
      rating: 4.5,
      quantity: 1,
      zoomerOptions: {
        zoomFactor: 3,
        pane: "pane",
        hoverDelay: 300,
        namespace: "zoomer-bottom",
        move_by_click: false,
        scroll_items: 4,
        choosed_thumb_border_color: "#dd2c00",
        scroller_position: "bottom",
        zoomer_pane_position: "right",
      },
      sh: false,
      dialog: false,
    };
  },
  methods: {
    addToCart(product) {
      if (!this.$store.state.auth.isTokenSet) {
        this.$router.push({ path: "/login" });
      } else {
        console.log(this.totalCartList);
        if (this.totalCartList.find((p) => p.productId == product.id)) {
          console.log("here");
          var foundIndex = this.totalCartList.findIndex(
            (x) => x.productId == product.id
          );
          this.$store.commit("INCREMENT_QUANTITY_CART", foundIndex);
        } else {
          this.$store.commit("ADD_PRODUCT_TO_CART_LIST", product);
        }
      }
      this.$router.push({ path: "/cart" });
    },
    increment() {
      this.quantity = parseInt(this.quantity, 10) + 1;
      console.log(this.$vuetify.breakpoint.name);
    },
    decrement() {
      this.quantity =
        this.quantity > 1 ? parseInt(this.quantity, 10) - 1 : this.quantity;
    },
    toggle(n) {
      this.index = n;
      console.log(this.index);
    },
    addToWish(product) {
      if (!this.$store.state.auth.isTokenSet) {
        this.$router.push({ path: "/login" });
      } else {
        console.log(this.totalWishList);
        if (this.totalWishList.find((p) => p.productId == product.id)) {
          console.log("here");
          var foundIndex = this.totalWishList.findIndex(
            (x) => x.productId == product.id
          );
          this.$store.commit("INCREMENT_QUANTITY", foundIndex);
        } else {
          this.$store.commit("ADD_PRODUCT_TO_WISH_LIST", product);
        }
      }
    },
  },
};
</script>

<style scoped>
.hover-icon:hover {
  background-color: #09b750;
  color: white;
}
</style>
