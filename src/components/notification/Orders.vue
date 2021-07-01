<template>
  <v-row class="mt-5" justify="center">
    <v-col cols="10">
      <v-row justify="end">
        <v-col
          ><h1 class="mx-auto text-h4 mb-4">{{ title }}</h1></v-col
        >
        <v-col cols="12" lg="5" md="12">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
        </v-col>
      </v-row>

      <v-data-table :headers="headers" :items="d" :items-per-page="5">
        <template v-slot:[`item.status`]="{ item }">
          <v-chip label :color="getColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table></v-col
    >
  </v-row>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "Orders List",
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Order ID",
          align: "start",
          sortable: false,
          value: "orderId",
        },
        { text: "User", value: "user" },
        { text: "Product", value: "product" },
        { text: "Amount", value: "amount" },
        { text: "Total Price", value: "totalPrice" },
        { text: "Status", value: "status" },
      ],
      d: [],
      desserts: [
        {
          orderId: "123-456-789",
          user: "Jhon Doe",
          product: "Samsung Galaxy S10",
          amount: 1,
          totalPrice: 500,
          status: "Delivered",
        },
        {
          orderId: "123-456-789",
          user: "Jhon Doe",
          product: "Samsung Galaxy S10",
          amount: 3,
          totalPrice: 500,
          status: "On going",
        },
        {
          orderId: "123-456-789",
          user: "Jhon Doe",
          product: "Samsung Galaxy S10",
          amount: 8,
          totalPrice: 500,
          status: "Failed",
        },
        {
          orderId: "123-456-789",
          user: "Jhon Doe",
          product: "Samsung Galaxy S10",
          amount: 1,
          totalPrice: 500,
          status: "Delivered",
        },
        {
          orderId: "123-456-789",
          user: "Jhon Doe",
          product: "Samsung Galaxy S10",
          amount: 3,
          totalPrice: 500,
          status: "On going",
        },
        {
          orderId: "123-456-789",
          user: "Jhon Doe",
          product: "Samsung Galaxy S10",
          amount: 8,
          totalPrice: 500,
          status: "Failed",
        },
        {
          orderId: "123-456-789",
          user: "Jhon Doe",
          product: "Samsung Galaxy S10",
          amount: 1,
          totalPrice: 500,
          status: "Delivered",
        },
        {
          orderId: "123-456-789",
          user: "Jhon Doe",
          product: "Samsung Galaxy S10",
          amount: 3,
          totalPrice: 500,
          status: "On going",
        },
        {
          orderId: "123-456-789",
          user: "Jhon Doe",
          product: "Samsung Galaxy S10",
          amount: 8,
          totalPrice: 500,
          status: "Failed",
        },
      ],
    };
  },
  methods: {
    getColor(status) {
      if (status == "Delivered") return "green";
      else if (status == "On going") return "orange";
      else return "red";
    },
  },
};
</script>
