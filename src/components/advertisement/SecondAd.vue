<template>
  <div id="second-ad">
    <v-row class="hidden-md-and-down">
      <v-col cols="12" md="4"
        ><div class="pb-5">
          <a href="https://seller.ashewa.com/promotions">
            <a href="https://seller.ashewa.com/promotions"
              ><v-img
                src="/images/ad1.jpg"
                aspect-ratio="1.7"
                height="190"
              ></v-img
            ></a>
          </a></div
      ></v-col>
      <v-col cols="12" md="4"
        ><div class="pb-5">
          <a href="https://seller.ashewa.com/promotions"
            ><v-img
              src="/images/ad2.jpg"
              aspect-ratio="1.7"
              height="190"
            ></v-img
          ></a></div
      ></v-col>
      <v-col
        @click="
          $router.push({
            path: `https://seller.ashewa.com/promotions`,
          })
        "
        cols="12"
        md="4"
        ><div class="pb-5">
          <a href="https://seller.ashewa.com/promotions"
            ><v-img
              src="/images/ad3.jpg"
              aspect-ratio="1.7"
              height="190"
            ></v-img
          ></a></div
      ></v-col>
    </v-row>
    <v-row class="hidden-lg-and-up">
      <v-col
        @click="
          $router.push({
            path: `https://seller.ashewa.com/promotions`,
          })
        "
        cols="6"
        ><div class="pb-0">
          <a href="https://seller.ashewa.com/promotions"
            ><v-img src="/images/ad1.jpg" aspect-ratio="1.7"></v-img
          ></a></div
      ></v-col>
      <v-col
        @click="
          $router.push({
            path: `https://seller.ashewa.com/promotions`,
          })
        "
        cols="6"
        ><div class="pb-0">
          <a href="https://seller.ashewa.com/promotions"
            ><v-img src="/images/ad2.jpg" aspect-ratio="1.7"></v-img
          ></a></div
      ></v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
