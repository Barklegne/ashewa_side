<template>
  <div>
    <div>
      <!-- mobile footer -->
      <v-footer class="hidden-lg-and-up mb-16">
        <v-row align="center" class="pb-2 my-1 mx-2">
          <v-text-field
            solo
            dense
            flat
            light
            class="mt-7"
            height="50px"
            placeholder="Email Address"
            v-model="email"
          ></v-text-field>
          <v-btn @click="addSubscriber" color="black" dark height="50px" tile
            >Subscribe</v-btn
          >
        </v-row>
        <v-expansion-panels focusable>
          <v-expansion-panel
            v-for="(item, i) in mobileFooter"
            :key="i"
            style="background:#787c82;margin-left:2px;"
          >
            <v-expansion-panel-header
              class="white--text"
              style="font-size:1.2rem;font-weight:bold"
              >{{ item.title }}
              <template v-slot:actions>
                <v-icon color="white">
                  $expand
                </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="white--text">
              <v-list-item-group>
                <v-list-item
                  style="min-height:30px"
                  v-for="(item, i) in item.subTitles"
                  :key="i"
                  :href="
                    item.link == 'https://retailer.ashewa.com/promotions' ||
                    'http://suppliers.ashewa.com/Blogs' ||
                    'https://seller.ashewa.com/register'
                      ? item.link
                      : ''
                  "
                  :to="
                    item.link == 'https://retailer.ashewa.com/promotions' ||
                    'http://suppliers.ashewa.com/Blogs' ||
                    'https://seller.ashewa.com/register'
                      ? ''
                      : item.link
                  "
                >
                  <v-list-item-content class="py-0">
                    <v-list-item-title
                      ><p
                        class="text-start mb-0"
                        style="font-size:1rem;font-weight:700;color:white;padding:10px;"
                      >
                        {{ item.name }}
                      </p>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-footer>
      <v-footer dark padless class="d-block text-center hidden-lg-and-down">
        <v-card
          flat
          color="#787c82"
          tile
          class="white--text text-start hidden-md-and-down"
        >
          <v-card-text>
            <v-row align="center">
              <v-spacer></v-spacer>
              <v-col cols="5">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Newsletter</v-list-item-title>
                    <v-list-item-subtitle
                      >Subscribe to get information about products and
                      coupons</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="4">
                <v-row align="center">
                  <v-text-field
                    solo
                    dense
                    flat
                    light
                    class="mt-7"
                    height="50px"
                    placeholder="Email Address"
                    v-model="email"
                  ></v-text-field>
                  <v-btn
                    @click="addSubscriber"
                    color="black"
                    dark
                    height="50px"
                    tile
                    >Subscribe</v-btn
                  >
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
        <v-card
          flat
          tile
          color="#787c82"
          class="white--text text-center hidden-md-and-down"
        >
          <v-card-text>
            <v-btn
              v-for="(icon, i) in icons"
              :key="icon"
              class="mx-4 white--text"
              icon
              :href="lnk[i]"
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="white--text pt-0">
            <v-row justify="center">
              <v-col class="ma-0 pa-0" cols="6" lg="3">
                <div style="width:100%;text-align:center">
                  <v-img
                    style="margin:auto auto"
                    width="250"
                    src="/logo.png"
                  ></v-img>
                </div>
              </v-col>
              <v-col cols="6" lg="3">
                <v-list
                  class="mx-10"
                  style="background-color:transparent;"
                  dense
                  flat
                >
                  <p
                    style="font-size:18px;font-weight:600"
                    class="text-start pl-3 white--text pl-1 mb-1"
                  >
                    Products
                  </p>
                  <v-list-item-group>
                    <v-list-item
                      style="min-height:30px"
                      v-for="(item, i) in products"
                      :key="i"
                      :to="item.link"
                    >
                      <v-list-item-content class="py-0">
                        <v-list-item-title
                          ><p
                            class="text-start mb-0"
                            style="font-size:13px;font-weight:400"
                          >
                            {{ item.name }}
                          </p>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>

              <v-col cols="6" lg="3">
                <v-list
                  class="mx-10"
                  style="background-color:transparent;"
                  dense
                  flat
                >
                  <p
                    style="font-size:18px;font-weight:600"
                    class="text-start pl-3 white--text  mb-1"
                  >
                    About
                  </p>
                  <v-list-item-group>
                    <v-list-item
                      style="min-height:30px"
                      v-for="(item, i) in about"
                      :key="i"
                      :to="item.link"
                    >
                      <v-list-item-content class="py-0">
                        <v-list-item-title
                          ><p
                            class="text-start mb-0"
                            style="font-size:13px;font-weight:400"
                          >
                            {{ item.name }}
                          </p>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>

              <v-col cols="6" lg="3">
                <v-list
                  class="mx-10"
                  style="background-color:transparent;"
                  dense
                  flat
                >
                  <p
                    style="font-size:18px;font-weight:600"
                    class="text-start pl-3 white--text  mb-1"
                  >
                    Sell on Ashewa
                  </p>
                  <v-list-item-group>
                    <v-list-item
                      style="min-height:30px"
                      v-for="(item, i) in mm"
                      :key="i"
                      :href="i === 2 || i === 3 || i === 4 ? item.link : ''"
                      :to="i !== 2 && i !== 3 && i !== 4 ? item.link : ''"
                    >
                      <v-list-item-content class="py-0">
                        <v-list-item-title
                          ><p
                            class="text-start mb-0"
                            style="font-size:13px;font-weight:400"
                          >
                            {{ item.name }}
                          </p>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>

              <v-spacer></v-spacer>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>Ashewa</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </div>

    <!-- footer home... -->
    <v-footer
      v-if="route.name != 'ProductDetails'"
      style="border:1px none; background-color:white; "
      class="py-2 hidden-lg-and-up"
      height="60"
      fixed
    >
      <div
        @click="
          $router.push({
            path: item.path,
          })
        "
        v-for="item in footerAll"
        :key="item.path"
        style="margin:auto auto;cursor:pointer"
        class="text-center"
      >
        <v-icon
          :color="route.path == item.path ? '#66DC81' : '#787c82'"
          style="font-size:32px"
          x-large
        >
          {{
            item.path == "/allCategories"
              ? item.icon
              : route.path == item.path
              ? item.icon
              : `${item.icon}-outline`
          }}</v-icon
        >
        <p
          :style="
            route.path == item.path
              ? 'font-size:16px;color:#66DC81;'
              : 'font-size:12px;color:#787c82'
          "
          class="text-center"
        >
          {{ item.name }}
        </p>
      </div>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      email: "",
      icons: ["mdi-facebook", "mdi-telegram", "mdi-instagram"],
      lnk: [
        "https://facebook.com/ashewabusiness",

        "https://t.me/ashewatechnologies",
        "https://instagram.com/ashewagroup",
      ],
      products: [
        { name: "New Arrival", link: "NewArrivals" },
        { name: "Promoted Products", link: "BestProducts" },
      ],
      about: [
        {
          name: "About us",
          link: "about",
        },
        {
          name: "General Policy",
          link: "policy",
        },
        {
          name: "Terms of use",
          link: "termsOfUse",
        },
        { name: "Shipping Policy", link: "shipping-policy" },
        { name: "Privacy Policy", link: "privacy-policy" },
      ],
      ec: [
        { name: "Vendor/Supplier", link: "/vendor-supplier" },
        { name: "Ashewa Community", link: "/ashewa-army" },
        { name: "Shipping Policy", link: "/shipping-policy" },
        { name: "Privacy Policy", link: "/privacy-policy" },
      ],
      mm: [
        {
          name: "Sell products on Ashewa",
          link: "/sell-on-products-on-ashewa",
        },
        {
          name: "Vendors",
          link: "/retailers",
        },
        {
          name: "Suplliers",
          link: "/suppliers",
        },
        {
          name: "How to Sell",
          link: "https://seller.ashewa.com/howtosell",
        },
      ],
      grow: ["Ashewa story", "Community", "Blog", "Job Vacancy", "Contact"],
      footerAll: [
        {
          path: "/",
          icon: "mdi-home",
          name: "Home",
        },
        {
          path: "/allCategories",
          icon: "mdi-format-list-bulleted",
          name: "Category",
        },
        {
          path: "/sellOnAshewa",
          icon: "mdi-basket",
          name: "Sell On Ashewa",
        },

        {
          path: "/cart",
          icon: "mdi-cart",
          name: "Cart",
        },

        {
          path: "/messages",
          icon: "mdi-chat-processing",
          name: "Messages",
        },
      ],
      mobileFooter: [
        {
          title: "Products",
          subTitles: [
            { name: "New Arrival", link: "/NewArrivals" },
            { name: "Promoted Products", link: "/BestProducts" },

            { name: "How to Sell", link: "/productFeatures" },
          ],
        },
        {
          title: "About",
          subTitles: [
            {
              name: "About us",
              link: "/about",
            },
            {
              name: "General Policy",
              link: "/policy",
            },
            {
              name: "Terms of use",
              link: "/termsOfUse",
            },
          ],
        },
        {
          title: "Our Ecommerce",
          subTitles: [
            { name: "Vendor/Supplier", link: "/vendor-supplier" },
            { name: "Ashewa Community", link: "/ashewa-army" },
            { name: "Shipping Policy", link: "/shipping-policy" },
            { name: "Privacy Policy", link: "/privacy-policy" },
          ],
        },
        {
          title: "Make money with Us",
          subTitles: [
            {
              name: "Sell products on Ashewa",
              link: "/sell-on-products-on-ashewa",
            },
            {
              name: "Sell on Ashewa Business",
              link: "/sell-on-ashewa-business",
            },
            {
              name: "Blog  on Ashewa",
              link: "http://suppliers.ashewa.com/Blogs",
            },
            { name: "Become an Affiliate", link: "/become-an-affiliate" },
            {
              name: "Become a Seller",
              link: "http://seller.ashewa.com/signup",
            },
          ],
        },
      ],
    };
  },
  methods: {
    addSubscriber() {
      this.$store.dispatch("addSubscriber", this.email);
    },
  },
  computed: {
    appVersion() {
      return "this.$store.getters.appVersion";
    },
    route() {
      return { path: this.$route.path, name: this.$route.name };
    },
    totalWishList() {
      return [];
    },
    totalCartList() {
      return [];
    },
  },
};
</script>
<style scoped></style>
