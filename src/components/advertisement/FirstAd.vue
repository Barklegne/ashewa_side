<template>
  <div id="first-ad">
    <v-row class="hidden-md-and-down" no-gutters>
      <v-col cols="12" md="8">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-carousel
              hide-delimiters
              show-arrows-on-hover
              continuous
              height="420"
              class="py-5"
            >
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
              >
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute color="#036358">
                    <v-btn href="https://seller.ashewa.com"
                      >See more info</v-btn
                    >
                  </v-overlay>
                </v-fade-transition>
              </v-carousel-item>
            </v-carousel>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="12" md="4" class="py-5 pl-5">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div style="cursor:pointer" class="pb-5">
              <a>
                <v-img src="/images/ad1.jpg" height="190">
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <v-btn href="https://seller.ashewa.com"
                        >See more info</v-btn
                      >
                    </v-overlay>
                  </v-fade-transition>
                </v-img></a
              >
            </div>
          </template>
        </v-hover>
        <div style="cursor:pointer">
          <v-hover>
            <template v-slot:default="{ hover }">
              <a>
                <v-img src="/images/ad2.jpg" height="190">
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <v-btn href="https://seller.ashewa.com"
                        >See more info</v-btn
                      >
                    </v-overlay>
                  </v-fade-transition></v-img
                ></a
              >
            </template>
          </v-hover>
        </div>
      </v-col>
    </v-row>
    <v-row class="hidden-lg-and-up" no-gutters style="max-height:420px;">
      <v-carousel hide-delimiters :show-arrows="false" :cycle="true">
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          style="max-width=100%"
        >
          <v-img
            :src="item.src"
            max-height="300px"
            max-width="120%"
            aspect-ratio="1.4"
            cover
          ></v-img>
        </v-carousel-item>
      </v-carousel>
      <!-- <v-col style="cursor:pointer" cols="12" md="8">
        
      </v-col> -->
      <v-col style="margin-top:-190px; " cols="6" md="4" class=" pr-1">
        <div>
          <a href="https://seller.ashewa.com">
            <v-img src="/images/ad1.jpg" aspect-ratio="2.5"></v-img
          ></a>
        </div>
      </v-col>
      <v-col style="margin-top:-190px" cols="6" md="4" class="pl-1">
        <div>
          <a href="https://seller.ashewa.com">
            <v-img src="/images/ad2.jpg" aspect-ratio="2.5"></v-img>
          </a>
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

<style scoped>
.imH {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.mH {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
</style>
