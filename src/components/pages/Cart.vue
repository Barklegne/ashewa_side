<template>
  <v-container class="mt-2" style="min-height:75vh">
    <v-row class="mt-5" justify="center">
      <v-col cols="12" md="8">
        <v-row justify="end">
          <v-col><h1 class="mx-auto text-h4 mb-4">Shopping Cart</h1></v-col>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="totalCartList"
          :items-per-page="3"
        >
          <template v-slot:[`item.image`]="{ item }">
            <v-img
              height="200"
              width="200"
              :src="
                item.image[0] == 'h'
                  ? item.image
                  : `http://api.ashewa.com/media/${item.image}`
              "
            ></v-img>
          </template>
          <template v-slot:[`item.quantity`]="{ item }">
            <v-card
              style="background:transparent"
              tile
              class="py-3 text-center"
              elevation="0"
            >
              <v-btn x-small text><v-icon>mdi-arrow-up</v-icon></v-btn>
              {{ item.quantity }}
              <v-btn x-small text><v-icon>mdi-arrow-down</v-icon></v-btn>
            </v-card>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-btn @click="removeProduct(item.productId)" small color="error">
              <v-icon left dark>
                mdi-trash-can-outline
              </v-icon>
              {{ item.action }}Remove
            </v-btn>
          </template>
        </v-data-table></v-col
      >

      <v-col cols="12" md="4">
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-row justify="center" class="my-2">
            <v-col cols="10" class="grey lighten-2">
              <v-row justify="space-between" class="ma-4">
                <span>Total items</span>
                <span>{{ totalCartList.length }}</span>
              </v-row>
              <v-divider></v-divider>
              <v-row justify="space-between" class="ma-4">
                <span>tax</span>
                <span>{{ total * 0.15 }}</span>
              </v-row>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-row justify="space-between" class="ma-4">
                <h3>Total</h3>
                <h3 class="red--text">{{ total + total * 0.15 }} ETB</h3>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mb-14" justify="center">
            <v-col cols="10" class="px-0">
              <v-btn
                width="100%"
                height="50"
                class="btn"
                depressed
                color="primary"
                @click="clear"
              >
                Proceed to checkout
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
      headers: [
        { text: "IMAGE", value: "image", sortable: false },
        { text: "PRODUCT", value: "name", sortable: false },
        { text: "QUANTITY", value: "quantity", sortable: false },
        { text: "PRICE", value: "price", sortable: true },
        { text: "ACTION", value: "action", sortable: false },
      ],
      products: [
        {
          image:
            "http://45.76.97.89:3000/uploads/1e1f0f78e33d4ce7828d21465e84da7d.jpg",
          name: "Lorem ipsum dolor sit amet consectetur",
          price: "$ 106.72",
          quantity: 1,
          total: "$ 106.72",
        },
        {
          image:
            "http://45.76.97.89:3000/uploads/1e1f0f78e33d4ce7828d21465e84da7d.jpg",
          name: "Lorem ipsum dolor sit amet consectetur",
          price: "$ 106.72",
          quantity: 1,
          total: "$ 106.72",
        },
      ],
    };
  },
  methods: {
    removeProduct(id) {
      this.$store.commit("REMOVE_PRODUCT_FROM_CART_LIST", id);
    },
    clear() {
      this.$store.commit("CLEAR_CART");
    },
  },
  computed: {
    totalCartList() {
      switch (this.$store.getters.totalCartList.length) {
        case 0:
          return [];
        default:
          return this.$store.getters.totalCartList;
      }
    },
    total() {
      let t = 0;
      this.$store.getters.totalCartList.forEach((element) => {
        t = t + element.price;
      });
      return t;
    },
    btnWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 100;
        case "sm":
          return 25;
        case "md":
          return 25;
        case "lg":
          return 25;
        case "xl":
          return 25;
        default:
          return 25;
      }
    },
  },
};
</script>

<style scoped>
.apply-btn:hover {
  background-color: #07a04b;
  color: white;
}

.btn {
  text-transform: none;
}
</style>
