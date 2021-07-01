<template>
  <v-container class="mt-2" style="min-height:75vh">
    <v-row class="mt-5">
      <v-spacer></v-spacer>
      <v-col cols="12" :md="col">
        <v-row justify="end">
          <v-col
            ><h1 class="mx-auto text-h4 mb-4">{{ title }}</h1></v-col
          >
        </v-row>

        <v-data-table
          :headers="headers"
          :items="totalWishList"
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
              <v-btn @click="inc(item.productId)" x-small text
                ><v-icon>mdi-arrow-up</v-icon></v-btn
              >
              {{ item.quantity }}
              <v-btn @click="dec(item.productId)" x-small text
                ><v-icon>mdi-arrow-down</v-icon></v-btn
              >
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
        </v-data-table>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    col: {
      default: "8",
      type: String,
    },
    title: {
      default: "Wish List",
      type: String,
    },
  },
  computed: {
    totalWishList() {
      return this.$store.getters.totalWishList;
    },
  },
  data() {
    return {
      headers: [
        { text: "Image", value: "image" },
        {
          text: "Product ID",
          align: "start",
          sortable: false,
          value: "productId",
        },
        { text: "Product", value: "name" },
        { text: "Quantity", value: "quantity" },
        { text: "Price", value: "price" },
        { text: "Action", value: "action" },
      ],
      search: "",
    };
  },
  methods: {
    getColor(status) {
      if (status == "Delivered") return "green";
      else if (status == "On going") return "orange";
      else return "red";
    },
    removeProduct(id) {
      this.$store.commit("REMOVE_PRODUCT_FROM_WISH_LIST", id);
    },
    inc(id) {
      var foundIndex = this.totalWishList.findIndex((x) => x.productId == id);
      this.$store.commit("INCREMENT_QUANTITY", foundIndex);
    },
    dec(id) {
      var foundIndex = this.totalWishList.findIndex((x) => x.productId == id);
      this.$store.commit("DECREMENT_QUANTITY", foundIndex);
    },
  },
};
</script>
