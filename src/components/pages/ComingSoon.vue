<template>
  <div>
    <h1 style="font-size:42px" class="ma-5">We Are Coming Soon!</h1>
    <div style="margin: 10px 50px">
      <p class="text-center" style="font-size:18px">
        Get ready we have something coming that is going to be awesome! Below is
        a sneak peek of what we offer. Check back often for our launch
      </p>
    </div>
    <v-row class="mx-4 mb-5" justify="center" align="center">
      <v-col cols="12" md="6">
        <v-text-field
          solo
          dense
          light
          class="mt-7"
          height="50px"
          placeholder="Please subscribe to get more information"
          v-model="email"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn @click="addSubscriber" block color="black" dark height="50px"
          >Subscribe</v-btn
        >
      </v-col>
    </v-row>
    <v-btn
      v-for="(icon, i) in icons"
      :key="icon"
      class="mx-4 mb-5"
      icon
      :href="lnk[i]"
    >
      <v-icon x-large color="#43DB80" size="28px">
        {{ icon }}
      </v-icon>
    </v-btn>
    <div
      style="border:1px solid grey;padding:25px"
      class="hidden-md-and-down my-4 ml-10 mr-15"
    >
      <v-row class="mx-0 pl-10">
        <v-col>
          <div class="text-center">
            <v-icon style="font-size:65px;color:#43DB80">mdi-cash</v-icon>
            <p class="ma-0 mt-1 pa-0" style="font-size:16px;font-weight:900">
              Sell your products globally
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              Get more than 5 million visitor's per month
            </p>
          </div>
        </v-col>
        <v-col>
          <div class="text-center">
            <v-icon style="font-size:65px;color:#43DB80">mdi-earth</v-icon>
            <p class="ma-0 mt-1 pa-0" style="font-size:16px;font-weight:900">
              Order any product
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              From anywhere in the world
            </p>
          </div>
        </v-col>

        <v-col>
          <div class="text-center">
            <v-icon style="font-size:65px;color:#43DB80"
              >mdi-clipboard-arrow-left</v-icon
            >
            <p class="ma-0 mt-1 pa-0" style="font-size:16px;font-weight:900">
              7 days return guarantee
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              Based on our partners delivery promise
            </p>
          </div>
        </v-col>
        <v-col>
          <div class="text-center">
            <v-icon style="font-size:65px;color:#43DB80">mdi-truck</v-icon>
            <p class="ma-0 mt-1 pa-0" style="font-size:16px;font-weight:900">
              On time delivery
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              With more than seven delivery company options
            </p>
          </div>
        </v-col>

        <v-col>
          <div class="text-center">
            <v-icon style="font-size:65px;color:#43DB80"
              >mdi-credit-card-check</v-icon
            >
            <p class="ma-0 mt-1 pa-0" style="font-size:16px;font-weight:900">
              Secured payment
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              With multiple local and international payment options.
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
    <div
      style="border:1px solid grey;"
      class="hidden-lg-and-up my-1 pa-1 mx-12"
    >
      <v-row class="mx-0 pl-10">
        <v-col class="ma-0 pa-0 mb-2" cols="12">
          <div class="text-start">
            <p class="ma-0 mt-4 pa-0" style="font-size:16px;font-weight:700">
              <v-icon style="font-size:35px;color:#43DB80">mdi-cash</v-icon>
              Sell your products globally
            </p>

            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              Get more than 5 million visitor's per month
            </p>
          </div>
        </v-col>
        <v-col class="ma-0 pa-0 mb-2" cols="12">
          <div class="text-start">
            <p class="ma-0 mt-4 pa-0" style="font-size:16px;font-weight:700">
              <v-icon style="font-size:35px;color:#43DB80">mdi-earth</v-icon>
              Order any product
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              From anywhere in the world
            </p>
          </div>
        </v-col>

        <v-col class="ma-0 pa-0 mb-2" cols="12">
          <div class="text-start">
            <p class="ma-0 mt-4 pa-0" style="font-size:16px;font-weight:700">
              <v-icon style="font-size:35px;color:#43DB80"
                >mdi-clipboard-arrow-left</v-icon
              >
              7 days return guarantee
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              Based on our partners delivery promise
            </p>
          </div>
        </v-col>
        <v-col class="ma-0 pa-0 mb-2" cols="12">
          <div class="text-start">
            <p class="ma-0 mt-4 pa-0" style="font-size:16px;font-weight:700">
              <v-icon style="font-size:35px;color:#43DB80">mdi-truck</v-icon>
              On time delivery
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              With more than seven delivery company options
            </p>
          </div>
        </v-col>

        <v-col class="ma-0 pa-0 mb-2" cols="12">
          <div class="text-start">
            <p class="ma-0 mt-4 pa-0" style="font-size:16px;font-weight:700">
              <v-icon style="font-size:35px;color:#43DB80"
                >mdi-credit-card-check</v-icon
              >
              Secured payment
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              With multiple local and international payment options.
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
    <h3 class="my-3 mx-5">
      If you want to sell your products using our platform call us at
      <a href="”tel:+251976005100″">+251976005100</a>
    </h3>
    <v-dialog v-model="vis" persistent width="500">
      <v-card class="pa-5">
        <div>
          Thanks for subscribing. You will be updated with new information as
          soon as they are released. Stay tuned for any information we are going
          to share with you. Ashewa company news, sale notices, email alerts,
          and new product releases. Don’t worry we hate overflowing inboxes as
          much as you do, directions for unsubscribing are including in every
          email we send. And we’ll never share your email with anyone.
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-youtube", "mdi-telegram", "mdi-instagram"],
      vist: true,
      lnk: [
        "https://facebook.com/ashewabusiness",
        "https://www.youtube.com/channel/UChWSKr4Oo3M1prQuR56H5Og",
        "https://t.me//ashewatechnology",
        "https://instagram.com/ashewagroup",
      ],
      email: "",
    };
  },
  computed: {
    vis() {
      return this.$store.state.product.vis;
    },
    emailS() {
      return this.$store.state.product.email;
    },
  },
  methods: {
    addSubscriber() {
      this.$store.dispatch("addSubscriber", this.email);
    },
  },
};
</script>

<style lang="scss" scoped></style>
