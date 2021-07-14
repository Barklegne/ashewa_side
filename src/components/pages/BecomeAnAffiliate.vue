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
          Recommend Products. Earn Commissions.
        </h2>
        <div class="mt-4">
          <v-btn
            href="https://www.seller.ashewa.com/signup"
            dark
            large
            tile
            color="#43DB80"
            >Sign up</v-btn
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
            <div>
              <h3>Ashewa Associates - Ashewa’s affiliate marketing program</h3>
            </div>
            <v-card-text
              >Welcome to one of the largest affiliate marketing programs in the
              world. The Ashewa Associates Program helps content creators,
              publishers and bloggers monetize their traffic. With millions of
              products and programs available on Ashewa, associates use easy
              link-building tools to direct their audience to their
              recommendations, and earn from qualifying purchases and
              programs.</v-card-text
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
            <div><h3>Sign up</h3></div>
            <v-card-text
              >Join tens of thousands of creators, publishers and bloggers who
              are earning with the Ashewa Associates Program.</v-card-text
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
            <div><h3>Earn</h3></div>
            <v-card-text
              >Earn up to 10% in associate commissions from qualifying purchases
              and programs. Our competitive conversion rates help maximize
              earnings.</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-img
      src="images/images.jpeg"
      class="white--text align-center"
      height="400"
    >
      <div
        style="height:400px;background-color: rgba(0, 0, 0, 0.336);padding-top:150px"
      >
        <h2>
          “We're able to find all of the products on Ashewa that we want to
          recommend to our audience. We value being able to help our audience
          find and purchase what they need.” Fire Food Chef
        </h2>
      </div>
    </v-img>
    <v-container class="mb-10 mt-2" fluid>
      <v-layout row wrap>
        <v-div style="margin:auto auto;width:80%" class="text-start">
          <h2 class="ml-1 mb-2">Frequently Asked Questions</h2>
          <h2 class="ml-1 mb-2">How does the Associates Program work?</h2>
          <p>
            You can share products and available programs on Ashewa with your
            audience through customized linking tools and earn money on
            qualifying purchases and customer actions like signing up for a free
            trial program.
          </p>
          <h2 class="ml-1 mb-2">How do I qualify for this program?</h2>
          <p>
            Bloggers, publishers and content creators with a qualifying website
            or mobile app can participate in this program. Learn more. If you're
            an influencer with an established social media following, learn
            about the Ashewa Influencer Program.
          </p>
          <h2 class="ml-1 mb-2">How do I earn in this program?</h2>
          <p>
            You earn from qualifying purchases and programs through the traffic
            you drive to Ashewa. Commission income for qualifying purchases and
            programs differ based on product category.
          </p>
          <h2 class="ml-1 mb-2">How do I sign up to the program?</h2>
          <p>
            We will review your application and approve it if you meet the
            qualifying criteria.
          </p>
        </v-div>
      </v-layout>
    </v-container>
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
