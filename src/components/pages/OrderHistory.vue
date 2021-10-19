<template>
  <div>
    <v-data-table :headers="headers" :items="dataO" :items-per-page="5">
      <template v-slot:[`item.status`]="{ item }">
        <v-chip label :color="getColor(item.status)" dark>
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:[`item.paid`]="{ item }">
        <v-chip label :color="getColor(item.paid)" dark>
          {{ item.paid ? "Paid" : "Unpaid"}}
        </v-chip>
      </template>
    </v-data-table>
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
      headers: [
        {
          text: "Order ID",
          value: "id",
        },
        { text: "Product", value: "productId" },
        { text: "Total Price (in Birr)", value: "totalPrice" },
        { text: "Status", value: "status" },
        //reference
        { text: "Reference", value: "reference" },
        //deliveryName
        { text: "Delivery Name", value: "deliveryName" },
        //deliveryPhone
        { text: "Delivery Phone", value: "deliveryPhone" },
        //paid
        { text: "Paid", value: "paid" },
      ],
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
      const orders = this.$store.state.cart.orderHistory.map((item) => {
        return {
          id: item.id,
          productId: Object.keys(JSON.parse(item.productIds)),
          reference: item.reference,
          deliveryName: item.deliveryOption.provider.name,
          deliveryPhone: item.deliveryOption.provider.phone,
          totalPrice: item.price,
          status: item.status,
          paid: item.paid,
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
  },
};
</script>
