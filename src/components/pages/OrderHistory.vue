<template>
  <div>
    <v-data-table
      class="ma-5"
      :headers="headers"
      :items="dataO"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip label :color="getColor(item.status)" dark>
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:[`item.more`]="{ item }">
        <v-btn icon @click="more(item)">
          <v-icon> mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.paid`]="{ item }">
        <v-chip label :color="getColor(item.paid)" dark>
          {{ item.paid ? "Paid" : "Unpaid" }}
        </v-chip>
      </template>
    </v-data-table>
    <v-dialog v-model="vis" max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">Order Details</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-data-table
                  :headers="headerD"
                  :items="dataD"
                  :items-per-page="3"
                >
                  <template v-slot:[`item.image`]="{ item }">
                    <v-img
                      height="100"
                      width="100"
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
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row> </template
                    ></v-img>
                  </template>
                  <template v-slot:[`item.quantity`]="{ item }">
                    <v-chip label color="green" dark>{{
                      item.quantity
                    }}</v-chip>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="vis = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    if (!this.isTokenSet) {
      this.$router.push("/login");
    } else {
      this.$store.dispatch("getOrderHistory");
    }
  },
  data() {
    return {
      dataD: [],
      headerD: [
        { text: "Image", value: "image" },
        { text: "Quantity", value: "quantity" },
        { text: "Price", value: "price" },
      ],
      headers: [
        {
          text: "Order ID",
          value: "id",
        },
        // { text: "Product", value: "productId" },
        { text: "Total Price (in Birr)", value: "totalPrice" },
        { text: "Delivery Status", value: "status" },
        //reference
        { text: "Reference", value: "reference" },
        //deliveryName

        //paid
        { text: "Payment Status", value: "paid" },
        { text: "More", value: "more" },
        { text: "Payment Method", value: "paymentMethod" },
      ],
      vis: false,
    };
  },
  computed: {
    ...mapGetters(["isTokenSet", "user"]),
    sampleData() {
      if (this.value == "completed") {
        return this.d;
      }
      if (this.value == "delayed") {
        return this.de;
      }
      if (this.value == "canceled") {
        return this.f;
      }
      return this.p;
    },
    dataO() {
      console.log(this.$store.state.cart.orderHistory);
      const orders = this.$store.state.cart.orderHistory.map((item) => {
        return {
          id: item.id,
          productId: item.orders,
          reference: item.reference,
          totalPrice: item.price,
          status: item.status,
          paid: item.paid,
          paymentMethod: item.paymentMethod,
        };
      });
      return orders;
    },
  },
  methods: {
    getColor(status) {
      if (status == "COMPLETED") return "green";
      else if (status == "PENDING") return "orange";
      else if (status == true) return "green";
      else if (status == false) return "red";
      else return "red";
    },
    more(item) {
      console.log(item);
      this.dataD = item.productId.map((item) => {
        return {
          image: item.product.image,
          quantity: item.quantity,
          price: item.product.sellingPrice,
        };
      });
      console.log(this.dataD);
      this.vis = true;
    },
  },
};
</script>
