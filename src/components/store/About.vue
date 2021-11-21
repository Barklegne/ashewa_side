<template>
  <div style="width:100%">
    <v-row>
      <v-col cols="12" md="5">
        <h1>Contact Information</h1>
        <br />
        <br />
        <p class="text-start">
          <strong
            >Address:
            {{
              `${vendorInfo.country}/${vendorInfo.region}/${vendorInfo.subCity}/${vendorInfo.woreda}`
            }}</strong
          >
          <br />
          <br />
          <strong>Phone: {{ vendorInfo.phone }}</strong>
          <br />
          <br />
          <strong>Email: {{ vendorInfo.email }}</strong>
          <br />
          <br />
        </p>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="5">
        <h1 class="text-center">
          {{ vendorInfo.storeName.toUpperCase() }}
        </h1>
        <div v-html="vendorInfo.description"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    vendorInfo() {
      return this.$store.state.product.vendorInfo;
    },
  },
};
</script>

<style></style>
