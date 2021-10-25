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
                <span>{{ (total * 0.15).toFixed(2) }}</span>
              </v-row>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-row justify="space-between" class="ma-4">
                <h3>Total</h3>
                <h3 class="red--text">
                  {{ (total + total * 0.15).toFixed(2) }} ETB
                </h3>
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
      v-model="success"
      style="background-color:red"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-5">
        <h3>Delivery Information</h3>
        <p>Name:{{ deliveryInformation.provider.name }}</p>
        <p>Total Distance:{{ deliveryInformation.totalDistance }}</p>
        <p>Estimated Time:{{ deliveryInformation.estimatedTime }}</p>
        <p>Delivery Price:{{ deliveryInformation.deliveryPrice }}</p>
        {{
          payment === "BOA"
            ? ""
            : payment === "Hello Cash"
            ? "Dear customer, in order to proceed with your payment, please dial *912*4# and follow the instruction on your mobile phone to pay the invoice."
            : payment === "Mbirr"
            ? `Dear customer, in order to proceed with your payment, dial *818# then select 7(other) from the menu and then select 5(pay bill) and then enter ashewa's account number after that the enter this reference number ${text.m} and confirm your transaction, payment amount, your pin respectively.`
            : ""
        }}
        <h2>
          {{
            payment === "Hello Cash"
              ? `Delivery Reference Number : ${text}`
              : `Delivery Reference Number : ${text.a}`
          }}
        </h2>
        <h3 v-if="payment === 'BOA'">
          Dear customer, in order to proceed with your payment, press continue
          and you will be redirected to official BOA billing page
        </h3>
        <h3 v-if="payment === 'Telebirr'">
          Dear customer, in order to proceed with your payment, press continue
          and you will be redirected to official Telebirr billing page
        </h3>
        <h3 v-if="payment === 'PayPal'">
          Dear customer, in order to proceed with your payment, press continue
          and you will be redirected to official PayPal billing page
        </h3>
        <form
          v-if="payment === 'BOA'"
          action="https://secureacceptance.cybersource.com/pay"
          method="post"
        >
          <input
            type="hidden"
            name="access_key"
            v-model="JSON.parse(text.m).access_key"
          />
          <input
            type="hidden"
            name="profile_id"
            v-model="JSON.parse(text.m).profile_id"
          />
          <input
            type="hidden"
            name="transaction_uuid"
            v-model="JSON.parse(text.m).transaction_uuid"
          />
          <input
            type="hidden"
            name="signed_field_names"
            v-model="JSON.parse(text.m).signed_field_names"
          />
          <input
            type="hidden"
            name="unsigned_field_names"
            v-model="JSON.parse(text.m).unsigned_field_names"
          />
          <input
            type="hidden"
            name="signed_date_time"
            v-model="JSON.parse(text.m).signed_date_time"
          />
          <input
            type="hidden"
            name="locale"
            v-model="JSON.parse(text.m).locale"
          />
          <input
            type="hidden"
            name="transaction_type"
            v-model="JSON.parse(text.m).transaction_type"
          />
          <input
            type="hidden"
            name="reference_number"
            v-model="JSON.parse(text.m).reference_number"
          />
          <input
            type="hidden"
            name="amount"
            v-model="JSON.parse(text.m).amount"
          />
          <input
            type="hidden"
            name="currency"
            v-model="JSON.parse(text.m).currency"
          />
          <input
            type="hidden"
            name="signature"
            v-model="JSON.parse(text.m).signature"
          />

          <v-row v-if="payment === 'BOA'">
            <v-col>
              <v-btn
                class="btn btn-danger float-right"
                color="#09b750"
                dark
                type="submit"
                id="submit"
                name="submit"
                value="Submit"
              >
                Continue
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                @click="clearSuccess"
                color="error"
                type="button"
                class="btn btn-danger mx-4"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </form>

        <v-row v-if="payment === 'Telebirr'">
          <v-col>
            <v-btn
              class="btn btn-danger float-right"
              color="#09b750"
              dark
              :href="text.m"
            >
              Continue
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              @click="clearSuccess"
              color="error"
              type="button"
              class="btn btn-danger mx-4"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>

        <v-row v-if="payment === 'PayPal'">
          <v-col>
            <v-btn
              class="btn btn-danger float-right"
              color="#09b750"
              dark
              :href="text.m"
            >
              Continue
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              @click="clearSuccess"
              color="error"
              type="button"
              class="btn btn-danger mx-4"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          v-if="
            payment != 'BOA' && payment != 'Telebirr' && payment != 'PayPal'
          "
          justify="end"
        >
          <v-col cols="4">
            <v-btn class="pa-5 my-5" color="error" @click="clearSuccess">
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
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
              disabled
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
          Phone Number
        </p>
        <v-text-field
          background-color="#ebe9e9"
          class="ma-0"
          height="50"
          solo
          flat
          placeholder="Phone Number"
          v-model="phone"
        >
        </v-text-field>
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
          :items="deliveryItem"
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
            'BOA',
            'Hello Cash',
            'Mbirr',
            'Bank Payment',
            'Telebirr',
            'PayPal',
          ]"
          v-model="payment"
        ></v-select>
        <v-row justify="center">
          <v-btn
            @click="checkout"
            class="mx-5"
            style="text-transform:none"
            :disabled="!address || !delivery || !payment"
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
    <v-dialog v-model="testF" width="500">
      <v-card v-if="payment == 'Bank Payment'" class="pa-5">
        To pay via mobile payment, please click on "Finalize Checkout" below and
        send the grand total for your order to one of the following supported
        banks below as soon as possible.
        <v-row class="my-5" justify="center">
          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Bank of Abyssinia</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <p>
                  Account Name: Universal Courier Service PLC
                </p>
                <p>Account Number: 1000327571129</p>
                <p>Branch: Karamara Branch</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Nib Bank</v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>
                  Account Name: Universal Courier Service PLC
                </p>
                <p>Account Number: 1000327571129</p>
                <p>Branch: Karamara Branch</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Zemen Bank</v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>
                  Account Name: Universal Courier Service PLC
                </p>
                <p>Account Number: 1000327571129</p>
                <p>Branch: Karamara Branch</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Commercial Bank of Ethiopia</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <p>
                  Account Name: Universal Courier Service PLC
                </p>
                <p>Account Number: 1000327571129</p>
                <p>Branch: Karamara Branch</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        <v-btn @click="t = true" dark color="#07a04b">Finalize Checkout</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="t" width="500">
      <v-card class="pa-5">
        <h2>Finalize Checkout</h2>
        <v-text-field
          background-color="#ebe9e9"
          class="ma-0"
          height="50"
          solo
          flat
          placeholder="Deposited by"
          v-model="user"
        >
        </v-text-field>
        <v-text-field
          background-color="#ebe9e9"
          class="ma-0"
          height="50"
          solo
          flat
          placeholder="Reference"
          v-model="reference"
        >
        </v-text-field>
        <v-text-field
          background-color="#ebe9e9"
          class="ma-0"
          height="50"
          solo
          flat
          placeholder="Transaction Id"
          v-model="transaction"
        >
        </v-text-field>
        <v-btn @click="finalizeCheckout" dark color="#07a04b">Proceed</v-btn>
      </v-card>
    </v-dialog>
    <ErrorMessage />
  </v-container>
</template>

<script>
import router from "@/router";
import axios from "axios";
export default {
  data() {
    return {
      isMobile: false,
      test: true,
      testF: false,
      vis: false,
      loading: false,
      delivery: "",
      phone: "",
      payment: "",
      user: "",
      reference: "",
      transaction: "",
      t: false,
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
    this.getDelivery();
  },
  methods: {
    removeProduct(id) {
      this.$store.commit("REMOVE_PRODUCT_FROM_CART_LIST", id);
      //This event signifies that a successfull product was removed from cart
      this.$gtag.event("Remove from Cart", {
        event_category: "Product removed from cart",
        event_label: "Product Removed",
      });
    },
    async getDelivery() {
      await this.$store.dispatch("getDelivery");
    },
    clearSuccess() {
      this.$store.commit("CLEAR_SUCCESS");
    },
    finalizeCheckout() {
      this.$store.dispatch("finalizeCheckout", {
        user: this.user,
        reference: this.reference,
        transaction: this.transaction,
      });
      //This event signifies that a successfull finilize check out
      this.$gtag.event("Finilize Checkout", {
        event_category: "User Finilize Checkout",
        event_label: "Checkout Finilize",
      });
    },
    checkout() {
      this.$store.dispatch("checkout", {
        deliveryId: this.getId,
        loc: this.address,
        payment: this.payment,
        phone: this.phone,
      });
      //This event signifies that a successfull checkout
      this.$gtag.event("Checkout", {
        event_category: "Checkout",
        event_label: "User Checkout Items",
      });
      console.log({
        deliveryId: this.getId,
        loc: this.address,
        payment: this.payment,
      });
      this.vis = false;
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
    inc(id) {
      var foundIndex = this.totalCartList.findIndex((x) => x.productId == id);
      this.$store.commit("INCREMENT_QUANTITY_CART", foundIndex);
      //This event signifies that a successfull checkout
      this.$gtag.event("INCREMENT_QUANTITY_CART", {
        event_category: "INCREMENT_QUANTITY_CART",
        event_label: "User INCREMENT_QUANTITY_CART",
      });
    },
    dec(id) {
      var foundIndex = this.totalCartList.findIndex((x) => x.productId == id);
      this.$store.commit("DECREMENT_QUANTITY_CART", foundIndex);
      //This event signifies that a successfull checkout
      this.$gtag.event("DECREMENT_QUANTITY_CART", {
        event_category: "DECREMENT_QUANTITY_CART",
        event_label: "User DECREMENT_QUANTITY_CART",
      });
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
    deliveryInformation() {
      console.log();
      return this.$store.state.cart.deliveryInformation;
    },
    deliveryItem() {
      const deliveryName = this.$store.state.cart.deliveryItems.map(
        (delivery) => delivery.name
      );
      return deliveryName;
    },
    getId() {
      //function to find one by name and get Id from array
      const id = this.$store.state.cart.deliveryItems.find(
        (x) => x.name == this.delivery
      ).id;
      return id;
    },
    success() {
      return this.$store.state.cart.success;
    },
    text() {
      return this.$store.state.cart.text;
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
