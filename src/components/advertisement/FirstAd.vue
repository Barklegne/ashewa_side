<template>
  <div id="first-ad">
    <v-row class="hidden-md-and-down" no-gutters justify="space-between">
      <v-col cols="12" md="8">
        <v-carousel
          hide-delimiters
          show-arrows-on-hover
          height="420"
          class="py-5"
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="4" class="py-5 pl-5">
        <div class="pb-5">
          <v-img src="/images/ad1.jpg" height="190"></v-img>
        </div>
        <div>
          <v-img src="/images/ad2.jpg" height="190"></v-img>
        </div>
      </v-col>
    </v-row>
    <v-row class="hidden-lg-and-up" no-gutters justify="space-between">
      <v-col cols="12" md="8">
        <v-img src="images/ad4.jpg" aspect-ratio="2.5"></v-img>
      </v-col>
      <v-col cols="6" md="4" class="py-2 pr-1">
        <div class="pb-5">
          <v-img src="/images/ad1.jpg" aspect-ratio="2.5"></v-img>
        </div>
      </v-col>
      <v-col cols="6" md="4" class="py-2 pl-1">
        <div>
          <v-img src="/images/ad2.jpg" aspect-ratio="2.5"></v-img>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: null,
      rating: 4,
      items: [
        {
          src: "images/ad4.jpg",
        },
        {
          src: "images/ad1.jpg",
        },
        {
          src: "images/ad2.jpg",
        },
        {
          src: "images/ad3.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
