<template>
  <v-container class="mt-2" style="min-height:75vh">
    <v-row class="mt-5" justify="center">
      <v-col cols="12" md="8">
        <v-row justify="end">
          <v-col
            ><h1 class="mx-auto text-h4 mb-4" style="color:#43DB80">
              Shopping Cart
            </h1></v-col
          >
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
              :lazy-src="
                item.image[0] == 'h'
                  ? item.image
                  : `http://api.ashewa.com/media/${item.image}`
              "
              :src="
                item.image[0] == 'h'
                  ? item.image
                  : `http://api.ashewa.com/media/${item.image}`
              "
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row> </template
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
                color="#09b750"
                dark
                @click="vis = true"
              >
                Proceed to checkout
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
    <v-dialog
      persistent
      v-model="vis"
      style="background-color:red"
      :overlay-opacity="0.8"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-5">
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Dropoff Location
        </p>
        <v-row class="ma-0">
          <v-col class="ma-0 pa-0" cols="12" md="7">
            <v-text-field
              background-color="#ebe9e9"
              class="ma-0"
              height="50"
              solo
              flat
              placeholder="Enter your address"
              v-model="address"
            >
            </v-text-field
          ></v-col>
          <v-col class="ma-0 pa-0" cols="12" md="5">
            <v-btn
              :loading="loading"
              class="ml-3 mt-1"
              style="font-size:12px;text-transform:none"
              large
              dark
              @click="locatorButtonPressed"
            >
              <v-icon class="mr-2"> mdi-map-marker</v-icon>
              Current location
            </v-btn>
          </v-col>
        </v-row>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Total Price
        </p>
        <div
          background-color="#ebe9e9"
          style="background-color:#ebe9e9;height:50px;width:200px"
          class="pa-3 mb-3"
          solo
          flat
        >
          <p class="text-subtitle-1  subTitle">{{ total }} birr</p>
        </div>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Delivery Option
        </p>
        <v-select
          background-color="#ebe9e9"
          class="mb-0"
          height="50"
          solo
          flat
          placeholder="Please select a delivery option"
          :items="[
            'Cash on Delivery (COD)',
            'EMS(Express Mail Service)',
            'DHL(Adrian Dalsey, Larry Hillblom)',
            'RIDE DELIVERY ',
            'MOTOR CYCLE DELIVERY',
            'BUS DELIVERY ',
            'PHYSICAL PICK UP',
          ]"
          v-model="delivery"
        ></v-select>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Payment Method
        </p>
        <v-select
          background-color="#ebe9e9"
          class="mb-0"
          height="50"
          solo
          flat
          placeholder="Please select a payment method"
          :items="[
            'Bank of Abyssinia ',
            'Commercial bank of Ethiopian/CBE',
            'Tele birr',
            'Mbirr',
            'Amole',
            'Abyssinia Bank',
            'Amole',
            'Telegraphic transfer',
            'PayPal',
            'Online bank payment (Bank transfer)',
            'Western Union',
            'Cash on delivery',
          ]"
          v-model="payment"
        ></v-select>
        <v-row justify="center">
          <v-btn
            @click="vis = false"
            dark
            class="mx-5"
            style="text-transform:none"
            color="#43DB80"
            >Proceed</v-btn
          >
          <v-btn
            @click="vis = false"
            class="mx-5"
            style="text-transform:none"
            color="error"
            >Cancel</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import router from "@/router";
import axios from "axios";
export default {
  data() {
    return {
      isMobile: false,
      vis: false,
      loading: false,
      delivery: "",
      payment: "",
      key: "AIzaSyCVZffDCQLlsX9vz9TGBg0h8aZkG5eIUoY",
      address: "",
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
  created() {
    if (!this.$store.state.auth.isTokenSet) {
      router.push({ path: "/login" });
    }
  },
  methods: {
    removeProduct(id) {
      this.$store.commit("REMOVE_PRODUCT_FROM_CART_LIST", id);
    },
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getStreetAddressFrom(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    async getStreetAddressFrom(lat, long) {
      this.loading = true;
      try {
        var { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyDWcLelnVruUu7vMx93jpvJs-XkMgoolEg"
        );
        if (data.error_message) {
          console.log(data.error_message);
          this.address = lat + "," + long;
        } else {
          this.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
      this.loading = false;
    },
    clear() {
      this.$store.commit("CLEAR_CART");
    },
    checkout() {
      if (!this.$store.state.auth.isTokenSet) {
        this.$router.push({ path: "/login" });
      } else {
        const ids = this.totalCartList.map((p) => {
          return p.productId;
        });
        this.$store.dispatch("checkout", ids);
      }
    },
    inc(id) {
      var foundIndex = this.totalCartList.findIndex((x) => x.productId == id);
      this.$store.commit("INCREMENT_QUANTITY_CART", foundIndex);
    },
    dec(id) {
      var foundIndex = this.totalCartList.findIndex((x) => x.productId == id);
      this.$store.commit("DECREMENT_QUANTITY_CART", foundIndex);
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
        t = t + element.price * element.quantity;
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

<style>
.apply-btn:hover {
  background-color: #07a04b;
  color: white;
}

.btn {
  text-transform: none;
}
.v-list .v-list-item--active {
  background-color: #07a04b !important;
}
.v-list .v-list-item--active .v-list-item__title {
  color: white !important;
}
</style>

<!-- <template>
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
                @click="vis = true"
              >
                Proceed to checkout
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
    <v-dialog
      persistent
      v-model="vis"
      style="background-color:red"
      :overlay-opacity="0.8"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-5">
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Dropoff Location
        </p>
        <v-row justify="center">
          <vue-google-autocomplete
            ref="address"
            id="map"
            classname="form-control"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            v-model="address"
            country="sg"
          >
          </vue-google-autocomplete>
          <v-btn
            :loading="loading"
            class="ml-3"
            large
            @click="locatorButtonPressed"
          >
            <v-icon> mdi-map-marker</v-icon>
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import router from "@/router";
import axios from "axios";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: {
    VueGoogleAutocomplete,
  },
  mounted() {
    this.$refs.address.focus();
  },
  data() {
    return {
      isMobile: false,
      vis: false,
      loading: false,
      key: "AIzaSyCVZffDCQLlsX9vz9TGBg0h8aZkG5eIUoY",
      address: "",
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
  created() {
    if (!this.$store.state.auth.isTokenSet) {
      router.push({ path: "/login" });
    }
  },
  methods: {
    removeProduct(id) {
      this.$store.commit("REMOVE_PRODUCT_FROM_CART_LIST", id);
    },
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getStreetAddressFrom(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    getAddressData: function(addressData) {
      this.address = addressData;
    },
    async getStreetAddressFrom(lat, long) {
      this.loading = true;
      try {
        var { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyDWcLelnVruUu7vMx93jpvJs-XkMgoolEg"
        );
        if (data.error_message) {
          console.log(data.error_message);
        } else {
          this.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
      this.loading = false;
    },
    clear() {
      this.$store.commit("CLEAR_CART");
    },
    checkout() {
      if (!this.$store.state.auth.isTokenSet) {
        this.$router.push({ path: "/login" });
      } else {
        const ids = this.totalCartList.map((p) => {
          return p.productId;
        });
        this.$store.dispatch("checkout", ids);
      }
    },
    inc(id) {
      var foundIndex = this.totalCartList.findIndex((x) => x.productId == id);
      this.$store.commit("INCREMENT_QUANTITY_CART", foundIndex);
    },
    dec(id) {
      var foundIndex = this.totalCartList.findIndex((x) => x.productId == id);
      this.$store.commit("DECREMENT_QUANTITY_CART", foundIndex);
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
        t = t + element.price * element.quantity;
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
</style> -->
