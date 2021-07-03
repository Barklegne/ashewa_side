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
              >It doesn’t take much to list your items and once you make a sale,
              Martfury’s transaction fee is just 2.5%.</v-card-text
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
              >Optimize your every move with in-depth data and customer insights
              Improve performance with dashboards detailing product exposure,
              click volume, spend, average cost, store visits, and
              more.</v-card-text
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
              >Know you’re supported throughout your journey From onboarding
              help to online chats to local support during business hours and
              account optimization tips -- we’re here for you.</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="my-10">
      <v-timeline style="width:80%;margin:auto auto">
        <v-timeline-item
          color="#FCB813"
          v-for="(item, i) in items"
          :key="i"
          large
        >
          <template v-slot:icon>
            <h1 style="color:white">{{ i + 1 }}</h1>
          </template>
          <template v-slot:opposite>
            <div class="text-start">
              <div>
                <h3 class="mb-2">{{ item.title }}</h3>
                <p class="text-caption">
                  {{ item.body }}
                </p>
              </div>
            </div>
          </template>
          <div>
            <v-img width="300" :src="`/images/milestone-${i + 1}.png`"></v-img>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
    <v-btn
      dark
      href="http://vendors.ashewa.com/signup#"
      large
      tile
      color="#43DB80"
    >
      <v-icon left>mdi-storefront-outline</v-icon>
      Create Your Store
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Register and list your products",
          body:
            "Register your business for free and create a product catalogue. Ashewa Advisors will help you at every step and fully assist you in taking your business online",
        },
        {
          title: "Custom storefront",
          body:
            "Set up a store that showcases your brand. Differentiate yourself from the competition with a full store dedicated to your products- no coding or design skills necessary!",
        },
        {
          title: "Deliver with ease",
          body:
            "Know you’re supported throughout your journey From onboarding help to online chats to local support during business hours and account optimization tips -- we’re here for you.",
        },
        {
          title: "Advertising tools",
          body:
            "Increase exposure by up to 120% with a suite of smart advertising tools. Get your products placed in the right spots to be noticed by the exact audience you are targeting.",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
