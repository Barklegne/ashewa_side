<template>
  <div style="width:100%">
    <v-row>
      <v-col cols="12" md="12">
        <h1>Contact Information</h1>
        <br />
        <br />
      </v-col>
    </v-row>
    <v-simple-table style="border:1px solid black" dense>
      <template v-slot:default>
        <tbody>
          <tr>
            <td style="background-color:#bbc4bdb4">
              Country
            </td>
            <td>{{ vendorInfo.country }}</td>
          </tr>
          <tr>
            <td style="background-color:#bbc4bdb4">
              StoreName
            </td>
            <td>{{ vendorInfo.storeName }}</td>
          </tr>
          <tr>
            <td style="background-color:#bbc4bdb4">
              Phone
            </td>
            <td>{{ vendorInfo.phone }}</td>
          </tr>
          <tr>
            <td style="background-color:#bbc4bdb4">
              Region
            </td>
            <td>{{ vendorInfo.region }}</td>
          </tr>
          <tr>
            <td style="background-color:#bbc4bdb4">
              SubCity
            </td>
            <td>{{ vendorInfo.subCity }}</td>
          </tr>
          <tr>
            <td style="background-color:#bbc4bdb4">
              Woreda
            </td>
            <td>{{ vendorInfo.woreda }}</td>
          </tr>
          <tr>
            <td style="background-color:#bbc4bdb4">
              Trade Licence
            </td>
            <td>{{ vendorInfo.tradeLicence }}</td>
          </tr>
          <tr>
            <td style="background-color:#bbc4bdb4">
              Tin-Number
            </td>
            <td>{{ vendorInfo.tinNumber }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
