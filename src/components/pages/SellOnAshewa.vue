<template>
  <div class="mb-10">
    <v-img
      src="images/images.jpeg"
      class="white--text align-center"
      height="400"
    >
      <div
        style="height:400px;background-color: rgba(0, 0, 0, 0.336);padding-top:150px"
      >
        <h2>
          Millions of Shoppers Can't Wait To See What You Have In Store
        </h2>
        <div class="mt-4">
          <v-btn
            href="http://vendors.ashewa.com/signup#"
            large
            tile
            color="#43DB80"
            >Start Selling</v-btn
          >
        </div>
      </div>
    </v-img>

    <div>
      <v-row>
        <v-col>
          <v-card elevation="0" class="mx-auto pa-5" width="350">
            <v-img
              class="mx-auto mb-6"
              src="/images/vendor1.png"
              width="160"
              height="100"
            ></v-img>
            <div><h3>Low Fees</h3></div>
            <v-card-text
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              eligendi ipsa, aliquid totam facere enim, facilis assumenda alias,
              quisquam dolorum ullam? Illum maxime dolores animi tempora tempore
              nam dicta ratione!</v-card-text
            >
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="0" class="mx-auto pa-5" width="350">
            <v-img
              class="mx-auto mb-6"
              src="/images/vendor3.png"
              width="80"
              height="100"
            ></v-img>
            <div><h3>Powerful Tools</h3></div>
            <v-card-text
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              eligendi ipsa, aliquid totam facere enim, facilis assumenda alias,
              quisquam dolorum ullam? Illum maxime dolores animi tempora tempore
              nam dicta ratione!</v-card-text
            >
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="0" class="mx-auto pa-5" width="350">
            <v-img
              class="mx-auto mb-6"
              src="/images/vendor2.png"
              width="100"
              height="100"
            ></v-img>
            <div><h3>Support 24/7</h3></div>
            <v-card-text
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              eligendi ipsa, aliquid totam facere enim, facilis assumenda alias,
              quisquam dolorum ullam? Illum maxime dolores animi tempora tempore
              nam dicta ratione!</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="my-10">
      <v-timeline style="width:80%;margin:auto auto">
        <v-timeline-item color="#FCB813" v-for="i in 4" :key="i" large>
          <template v-slot:icon>
            <h1 style="color:white">{{ i }}</h1>
          </template>
          <template v-slot:opposite>
            <div class="text-start">
              <div>
                <h3 class="mb-2">
                  Lorem ipsum dolor sit amet, consectetur.
                </h3>
                <p class="text-caption">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                  impedit, soluta pariatur aperiam aspernatur sequi animi
                </p>
              </div>
            </div>
          </template>
          <div>
            <v-img width="300" :src="`/images/milestone-${i}.png`"></v-img>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
