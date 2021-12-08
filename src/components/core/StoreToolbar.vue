<template>
  <div>
    <v-row
      class="ma-0 hidden-md-and-down"
      style="height:140px;background-color:#43DB80"
    >
      <v-col cols="2" class="ma-0 pa-0">
        <div>
          <v-img
            :src="
              vendorInfo.storeCover
                ? vendorInfo.storeCover
                : 'https://fundacja2act.org/wp-content/uploads/2020/02/sample-logo-white.png'
            "
            style="margin:auto auto;cursor:pointer"
            width="150"
            @click="
              $router.push({
                path: `/`,
              })
            "
          ></v-img>
        </div>
      </v-col>

      <v-col class="ma-0 pa-0" cols="10">
        <v-row
          class="ma-0"
          style="height:80px;"
          align="center"
          justify="space-around"
        >
          <v-spacer></v-spacer>
          <v-col
            style="background-color:white;height:50px"
            class="pa-0 rounded-pill"
            cols="6"
          >
            <v-row class="ma-0 pa-0">
              <v-menu
                :close-on-content-click="false"
                open-on-click
                bottom
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <div class="dropDown" dark v-bind="attrs" v-on="on">
                    <div class="pl-3">
                      Filter
                    </div>
                    <v-icon color="#b5b5b5">
                      mdi-chevron-down
                    </v-icon>
                  </div>
                </template>
                <div
                  class="pa-5"
                  style="width:400px;background-color:white;height:200px;border"
                >
                  <v-row>
                    <v-slider
                      v-model="price"
                      class="mt-5"
                      label="Maximum Price"
                      color="#43DB80"
                      thumb-color="#43DB80"
                      tick-labels=""
                      :min="0"
                      :max="10000"
                    ></v-slider>
                    <p style="font-size:15px;font-weight:600" class="mt-5">
                      {{ price }} birr
                    </p>
                  </v-row>
                </div>
              </v-menu>
              <v-text-field
                solo
                dense
                light
                height="50px"
                v-model="searchF"
                placeholder="I'm shopping for..."
              ></v-text-field>
              <v-btn
                style="background-color:white"
                elevation="0"
                @click="startSpeechToTxt"
                height="50px"
                tile
              >
                <v-icon>{{
                  recording ? "mdi-record" : "mdi-microphone"
                }}</v-icon>
              </v-btn>
              <v-btn
                :href="
                  `/search/${JSON.stringify({
                    price: price,
                    word: searchF,
                  })}`
                "
                color="#4DBA87"
                dark
                height="50px"
                tile
                class="rounded-r-xl"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
          <v-col sm="3">
            <div class="iconsList">
              <v-row>
                <!-- <div
                  @mouseenter="color1 = 'white'"
                  @mouseleave="color1 = 'black'"
                >
                  <router-link :to="{ path: '/' }"
                    ><v-badge bottom overlap color="black" content="0"
                      ><v-icon size="40" color="#ffffff"
                        >mdi-chart-box-outline</v-icon
                      ></v-badge
                    ></router-link
                  >
                </div> -->
                <!-- <v-spacer></v-spacer>
                <div
                  @mouseenter="color2 = 'white'"
                  @mouseleave="color2 = 'black'"
                >
                  <router-link :to="{ path: '/wishList' }">
                    <v-badge
                      bottom
                      overlap
                      color="black"
                      :content="`${totalWishList.length}`"
                    >
                      <v-icon
                        :style="`cursor: pointer; text-decoration:none;`"
                        size="40"
                        color="#ffffff"
                        >mdi-heart-outline</v-icon
                      ></v-badge
                    ></router-link
                  >
                </div> -->

                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <div
                  @mouseenter="color3 = 'white'"
                  @mouseleave="color3 = 'black'"
                  class="mr-5"
                >
                  <router-link :to="{ path: 'cart' }">
                    <v-badge
                      bottom
                      overlap
                      color="black"
                      :content="`${totalCartList.length}`"
                    >
                      <v-icon
                        :style="`cursor: pointer; text-decoration:none;`"
                        size="40"
                        :color="color3"
                        >mdi-cart-outline</v-icon
                      ></v-badge
                    ></router-link
                  >
                </div>

                <div v-if="isTokenSet">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-avatar color="black" dark v-bind="attrs" v-on="on">
                        <img
                          :src="profilePic"
                          v-if="userData.profilePic.length > 0"
                        />
                        <span v-else class="white--text text-h5">{{
                          userData.userName.length > 0
                            ? userData.userName[0].toUpperCase()
                            : ""
                        }}</span>
                      </v-avatar>
                    </template>
                    <v-list>
                      <v-list-item
                        @click="
                          item.name == 'Logout'
                            ? userLogout()
                            : $router.push({
                                path: `${item.link}`,
                              })
                        "
                        v-for="(item, index) in profileItems"
                        :key="index"
                      >
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
                <div v-if="!isTokenSet" class="innerAuth">
                  <div
                    @mouseenter="color4 = 'white'"
                    @mouseleave="color4 = 'black'"
                  >
                    <router-link
                      :to="{ path: '/login' }"
                      :style="
                        `color:${color4};cursor: pointer; text-decoration:none;`
                      "
                      ><p style="font-weight:600;" class="ma-0 pa-0">
                        Login
                      </p></router-link
                    >
                  </div>
                  <div
                    @mouseenter="color5 = 'white'"
                    @mouseleave="color5 = 'black'"
                  >
                    <router-link
                      :to="{ path: '/signup' }"
                      :style="
                        `color:${color5};cursor: pointer; text-decoration:none;`
                      "
                      ><p style="font-weight:600;" class="ma-0 pa-0">
                        Signup
                      </p></router-link
                    >
                  </div>
                </div>
                <v-spacer></v-spacer>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row
          align="center"
          class="ma-0"
          style="height:60px;border-top: 1px solid #b5b5b5"
        >
          <v-spacer></v-spacer>
          <v-col cols="2" v-for="(n, i) in 4" :key="i">
            <div
              :style="
                tab == links[i].path
                  ? 'color:black;text-decoration:none;font-weight:900;cursor:pointer'
                  : 'color:black;text-decoration:none;font-weight:500;cursor:pointer'
              "
              class="text-center"
              dark
              @click="changeTab(links[i].path)"
            >
              {{ links[i].name }}
            </div>
          </v-col>

          <v-spacer></v-spacer>
          <v-col class="hidden-sm-and-down"> </v-col>
          <v-divider light vertical style="color:black;"></v-divider>
          <v-col>
            <LocaleChanger></LocaleChanger>
          </v-col>
          <v-col>
            <v-menu v-model="showMenu" offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  style=""
                  class="btnLocaleActivation"
                  color="black"
                  v-on="on"
                  text
                >
                  {{ currencyNow }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  active-class="white--text"
                  v-for="(item, i) in currency"
                  :key="`Lang${i}`"
                  :value="item.lang"
                  @click="switchCurrency(item.lang)"
                  :class="[item.class]"
                >
                  <v-list-item-title class="ml-3">{{
                    item.name
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      class=" ma-0 pa-0 hidden-lg-and-up"
      style="height:60px;background-color:#43DB80"
    >
      <v-col cols="1" class="hidden-lg-and-up">
        <span>
          <v-app-bar-nav-icon
            style="color:white"
            @click="sidebar = !sidebar"
          ></v-app-bar-nav-icon>
        </span>
      </v-col>
      <v-col class="" cols="10">
        <div class="dropDownM rounded-pill transparent">
          <v-text-field
            solo
            dense
            light
            height="40px"
            v-model="searchF"
            placeholder="Search...."
            class="rounded-l-xl"
          ></v-text-field>

          <v-btn
            :href="`/search/${searchF}`"
            color="#4DBA87"
            dark
            height="40px"
            tile
            class="rounded-r-xl mr-2"
            style="min-width:30px;"
            ><v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
          <v-icon
            @click="startSpeechToTxt"
            size="34px"
            color="white"
            class="mr-2"
            style="margin-top:-4px"
            flat
          >
            {{ recording ? "mdi-record" : "mdi-microphone" }}
          </v-icon>
        </div>
      </v-col>
      <v-col cols="1" class="ma-0" style="height:60px; ">
        <v-row style="margin-left:-30px; margin-top:-10px">
          <v-col cols="12">
            <span @mouseenter="color3 = 'white'" @mouseleave="color3 = 'black'">
              <router-link :to="{ path: '/cart' }">
                <v-badge
                  bottom
                  overlap
                  color="green"
                  :content="`${totalCartList.length}`"
                >
                  <v-icon
                    :style="
                      `margin-top:1px; cursor: pointer; text-decoration:none;`
                    "
                    size="30"
                    :color="(color3 = '#ffffff')"
                    >mdi-cart</v-icon
                  ></v-badge
                >
              </router-link>
            </span>
          </v-col>

          <!-- <v-col cols="6">
           
            </span>
          </v-col> -->
        </v-row>
      </v-col>
    </v-row>
    <v-navigation-drawer v-model="sidebar" absolute disable-resize-watcher>
      <v-list>
        <v-list-item>
          <v-list-item-content>Ashewa</v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="sidebar = !sidebar">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ path: item.link }"
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{
            $t(`toolbar.${item.title}`)
          }}</v-list-item-content>
        </v-list-item>

        <v-list-item v-if="isTokenSet" @click="userLogout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ $t("toolbar.LOGOUT") }}
          </v-list-item-content>
        </v-list-item>

        <!-- <v-select
          :items="currency"
          label="Currency"
          :outlined="false"
          class="ma-2 pa-3"
          prepend-inner-icon="mdi-cash"
        >
          <template v-slot:lang="lang" @click="switchCurrency(lang)">
            {{ lang.lang }}
          </template>
        </v-select> -->
        <div class="mb-5">
          <v-list-group prepend-icon="mdi-cash">
            <template v-slot:activator>
              <v-list-item-title>Currency</v-list-item-title>
            </template>

            <v-list-item
              active-class="white--text"
              v-for="(item, i) in currency"
              :key="`Lang${i}`"
              :value="item.lang"
              @click="switchCurrency(item.lang)"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>

        <v-row class="mx-2 px-2">
          <v-icon>mdi-translate</v-icon>
          <LocaleChanger class="ma-2 pa-3"></LocaleChanger>
        </v-row>
        <v-list-group v-if="admin" prepend-icon="mdi-lock" no-action>
          <v-list-item slot="activator" class="pl-0">
            <v-list-item-content>
              ADMIN
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="(item, index) in adminItems"
            :key="index"
            :to="{ name: item.link }"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- <v-list-item>
          <v-list-item-action></v-list-item-action>
          <v-icon>mdi-weather-sunny</v-icon>
          <v-list-item-action class="ml-2">
            <v-switch id="themeSwitcher" v-model="isDark" inset></v-switch>
          </v-list-item-action>
          <v-icon>mdi-weather-night</v-icon>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LocaleChanger from "@/components/core/LocaleChanger";
export default {
  components: {
    LocaleChanger,
  },
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      meta: [
        { name: "msapplication-TileColor", content: "#ffc40d" },
        { name: "theme-color", content: "#ffffff" },
        {
          name: "apple-mobile-web-app-title",
          content: this.$store.getters.appTitle,
        },
        { name: "application-name", content: this.$store.getters.appTitle },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", color: "#5bbad5", href: "/safari-pinned-tab.svg" },
        { rel: "favicon", href: "/favicon.ico" },
      ],
    };
  },
  data() {
    return {
      selected: "All",
      price: 0,
      tags: ["manufacturer", "wholeseller", "retailer", "exporter", "importer"],
      runtimeTranscription_: "",
      transcription_: [],
      lang_: "en-EN",
      recording: false,
      searchF: "",
      sidebar: false,
      isDark: false,
      showMenu: false,
      color1: "black",
      color2: "black",
      color3: "black",
      color4: "black",
      color5: "black",
      profileItems: [
        { name: "Profile", link: "/profile" },
        { name: "Logout", link: "/login" },
      ],
      currency: [
        {
          lang: "ETB",
          flag: "gb",
          name: "ETB",
          class: "btnEN",
        },
        {
          lang: "USD",
          flag: "et",
          name: "USD",
          class: "btnEN",
        },
      ],
      links: [
        { name: "Home", path: 4 },
        { name: "All Products", path: 0 },
        { name: "New Arrivals", path: 1 },
        { name: "Company Profile", path: 2 },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "isTokenSet",
      "user",
      "totalWishList",
      "totalCartList",
      "categories",
      "sampleCategories",
    ]),
    vendorInfo() {
      return this.$store.state.product.vendorInfo;
    },
    currencyNow() {
      return this.$store.state.product.currency;
    },
    tab() {
      return this.$store.state.product.tab;
    },
    admin() {
      return this.user !== null ? this.user.role === "admin" : false;
    },
    userData() {
      return this.user !== null
        ? {
            profilePic: this.user.profilePic ? this.user.profilePic : "",
            userName: this.user.username ? this.user.username : "",
          }
        : {
            profilePic: "",
            userName: "",
          };
    },
    menuItems() {
      if (this.isTokenSet) {
        return [
          {
            title: "HOME",
            link: "/",
            icon: "mdi-home",
            class: "btnHome",
          },
          {
            title: "ABOUT",
            link: "/about",
            icon: "mdi-help-circle-outline",
            class: "btnAbout",
          },
          {
            title: "MY PROFILE",
            link: "/profile",
            icon: "mdi-face",
            class: "btnProfile",
          },
          {
            title: "SELL ON ASHEWA",
            link: "/sellOnAshewa",
            icon: "mdi-storefront-outline",
            class: "btnProfile",
          },
          {
            title: "NEWS",
            link: "/services",
            icon: "mdi-newspaper",
            class: "btnNews",
          },

          {
            title: "RETAILERS",
            link: "/retailers",
            icon: "mdi-store",
            class: "btnRetailer",
          },
          {
            title: "SUPPLIERS",
            link: "/suppliers",
            icon: "mdi-basket",
            class: "btnSupplier",
          },
        ];
      }
      return [
        {
          title: "HOME",
          link: "/",
          icon: "mdi-home",
        },
        {
          title: "ABOUT",
          link: "/about",
          icon: "mdi-help-circle-outline",
          class: "btnAbout",
        },
        {
          title: "LOGIN",
          link: "/login",
          icon: "mdi-lock",
          class: "btnLogin",
        },
        {
          title: "SIGNUP",
          link: "/signup",
          icon: "mdi-plus-circle-outline",
          class: "btnLogin",
        },
      ];
    },
  },
  watch: {
    isDark() {
      this.$vuetify.theme.dark = this.isDark;
      localStorage.setItem("dark", this.isDark);
    },
  },
  methods: {
    userLogout() {
      this.$store.dispatch("userLogout");
    },
    changeTab(tab) {
      this.$store.commit("CHANGE_TAB", tab);
    },
    switchCurrency(lang) {
      console.log(lang);
      this.$store.dispatch("setCurrency", lang);
    },

    startSpeechToTxt() {
      // initialisation of voicereco
      this.recording = true;
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new window.SpeechRecognition();

      recognition.interimResults = true;

      // event current voice reco word
      recognition.addEventListener("result", (event) => {
        var text = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        this.runtimeTranscription_ = text;
      });
      // end of transcription
      recognition.addEventListener("end", () => {
        this.transcription_.push(this.runtimeTranscription_);
        this.searchF = this.runtimeTranscription_;
        this.runtimeTranscription_ = "";
        recognition.stop();
        this.recording = false;
      });
      recognition.start();
    },
  },
};
</script>

<style scoped>
.dropDown {
  width: 30%;
  padding: 15px 5px;
  font-size: 14px;
  height: 50px;
  background-color: white;
  color: black;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #b5b5b5;
}
.dropDownM {
  width: 100%;
  font-size: 14px;
  height: 40px;
  background-color: white;
  color: black;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #b5b5b5;
}
.active {
  background-color: green;
}
</style>
