<template>
  <div
    v-if="productImages.length > 0"
    class="mr-3 mb-3 white"
    style="background-color:#FFFFFF"
  >
    <!-- :src="`http://188.166.153.99/media/${productImages[0].image}`" -->

    <v-card
      flat
      @mouseenter="mo = true"
      @mouseleave="mo = false"
      class=" white rounded-lg my-5"
      :elevation="6"
      background-color="#43DB80"
    >
      <v-card class="white">
        <v-img
          :src="
            productImages[0].image[0] == 'h'
              ? productImages[0].image
              : `http://api.ashewa.com/media/${productImages[0].image}`
          "
          class="white--text align-start text-start  rounded-lg"
          lazy-src="/img/icons/mobile-logo.png"
          aspect-ratio="1.0"
          @click="
            $router.push({
              path: `/ProductDetails/${productId}`,
            })
          "
        >
          <v-chip x-small class="ma-2 pa-2" color="white">
            <v-rating
              v-if="productrateSet.length > 0"
              :value="averageRating"
              readonly
              background-color="green lighten-3"
              color="#09B750"
              x-small
            ></v-rating>
            <v-rating
              v-else
              :value="averageRating"
              readonly
              background-color="green lighten-3"
              color="#09B750"
              x-small
            >
            </v-rating>
          </v-chip>

          <!-- <div style="background-color: rgba(255, 0, 0, 0.336);">
           
            <v-rating
              v-if="productrateSet.length > 0"
              :value="averageRating"
              readonly
              background-color="green lighten-3"
              color="#09B750"
              x-small
            ></v-rating>
          </div> -->
        </v-img>
      </v-card>
      <p
        style="font-size:14px;color:#000000"
        class="ma-0 pa-0 ml-3 mt-2 text-start"
      >
        {{
          productName.length > 19
            ? `${productName.slice(0, 16)}...`
            : productName.charAt(0).toUpperCase() +
              productName.slice(1).toLowerCase()
        }}
      </p>
      <v-row>
        <!-- <v-col cols="6"> -->
        <v-card-title
          class="text-md-h6 ma-0 pa-0 pl-0  ml-1 text-subtitle-1 "
          style="font-size:8px;font-weight:500;color:#09B750"
        >
          <!-- {{ currency === "USD" ? "$  " : "ETB  " }} -->

          <div class="ma-0 ml-5 mt-3 text-subtitle-2" style="font-weight:550">
            {{
              currency === "USD"
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(parseFloat(usdPrice).toFixed(2))
                : new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "ETB",
                  }).format(sellingPrice)
            }}
          </div>
        </v-card-title>
        <!-- </v-col> -->
        <!-- <v-col cols="6"> -->
        <v-row class="pa-0 ma-0 ml-8">
          <v-col cols="4"
            ><v-btn
              @click="
                addToCart({
                  image: productImages[0].image,
                  price: sellingPrice,
                  title: productName,
                  id: productId,
                  category: productCategory.categoryName,
                })
              "
              icon
              class="mx-auto"
              ><v-icon size="22" style="color:#09B750;"
                >mdi-cart-outline</v-icon
              ></v-btn
            >
          </v-col>

          <v-col cols="4"
            ><v-btn
              @click="
                addToWish({
                  image: productImages[0].image,
                  price: sellingPrice,
                  title: productName,
                  id: productId,
                  category: productCategory.categoryName,
                })
              "
              icon
              style=""
              ><v-icon size="22" style="color:#09B750;"
                >mdi-heart-outline</v-icon
              ></v-btn
            ></v-col
          >
          <!-- <v-spacer></v-spacer> -->
        </v-row>
        <!-- </v-col> -->
      </v-row>
      <v-divider v-if="false"></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    totalWishList() {
      return this.$store.getters.totalWishList;
    },
    currency() {
      return this.$store.state.product.currency;
    },
    averageRating() {
      if (this.productrateSet.length === 1) {
        return this.productrateSet[0].rate;
      }
      if (this.productrateSet.length > 0) {
        let average = (arr) =>
          arr.reduce((a, b) => a.rate + b.rate) / arr.length;
        return average([...this.productrateSet]);
      }
      return 0;
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
    usdPrice: {
      type: Number,
      default: 0
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    productrateSet: {
      type: Array,
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
      sh: false,
      mo: false,
    };
  },
  methods: {
    addToCart(product) {
      if (!this.$store.state.auth.isTokenSet) {
        this.$router.push({ path: "/login" });
      } else {
        this.$store.dispatch("addToCart", product);
        //This event signifies that a successfull add to cart
        this.$gtag.event("Add to Cart", {
          event_category: "Product added to cart",
          event_label: "Add to Cart",
        });
      }
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
.outerCard {
  width: 150px;
}
</style>
