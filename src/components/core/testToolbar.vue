<template>
  <div style="background-color:#f2f7f4">
    <div>
      <v-row
        class="ma-0 py-5 px-12"
        justify="center"
        align="center"
        outlined
        style="height:120px;background-color:white"
        app
        dense
        :dark="isDark"
      >
        <v-img
          src="/logo/logo.png"
          style="cursor:pointer"
          @click="
            $router.push({
              path: `/`,
            })
          "
          max-height="90"
          max-width="90"
        ></v-img>
        <v-spacer></v-spacer>
        <div class="pa-0 ma-0">
          <v-row class="pa-0 ma-0" align="center">
            <v-menu
              :close-on-content-click="false"
              open-on-click
              bottom
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="#4DBA87"
                  dark
                  outlined
                  height="50px"
                  width="120px"
                  tile
                  class="rounded-l-xl"
                >
                  <p style="color:black;margin-top:15px;text-transform: none;">
                    Filter <v-icon>mdi-menu-down</v-icon>
                  </p>
                </v-btn>
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
                    :min="100"
                    :max="1000000"
                  ></v-slider>
                  <p style="font-size:15px;font-weight:600" class="mt-5">
                    {{ price }} birr
                  </p>
                </v-row>
                <v-row align="center" justify="center ">
                  <v-chip-group column multiple active-class="primary--text">
                    <v-chip label v-for="tag in tags" :key="tag">
                      {{ tag }}
                    </v-chip>
                  </v-chip-group>
                </v-row>
              </div>
            </v-menu>

            <v-text-field
              solo
              dense
              flat
              style="border:2px solid #4DBA87;border-right: 0px;border-left:0px black solid;border-radius: 0px"
              hide-details=""
              light
              height="46px"
              v-model="searchF"
              placeholder="I'm shopping for..."
            ></v-text-field>
            <v-btn
              style="border:2px solid #4DBA87;border-right: 0px;border-left:0px black solid;border-radius: 0px;background-color:white"
              elevation="0"
              @click="startSpeechToTxt"
              height="50px"
              tile
            >
              <v-icon>{{ recording ? "mdi-record" : "mdi-microphone" }}</v-icon>
            </v-btn>
            <v-btn
              :href="`/search/${price}`"
              color="#4DBA87"
              dark
              height="50px"
              tile
              class="rounded-r-xl"
            >
              <v-icon>mdi-magnify</v-icon>
              <p
                style="font-size:16px;color:white;margin-top:15px;text-transform: none;"
              >
                Search
              </p>
            </v-btn>
          </v-row>
        </div>
        <v-spacer></v-spacer>

        <div style="width:300px">
          <v-row>
            <div @mouseenter="color1 = 'green'" @mouseleave="color1 = 'black'">
              <router-link :to="{ path: '/' }"
                ><v-badge bottom overlap color="black" content="0"
                  ><v-icon size="40" :color="color1"
                    >mdi-chart-box-outline</v-icon
                  ></v-badge
                ></router-link
              >
            </div>

            <v-spacer></v-spacer>
            <div @mouseenter="color2 = 'green'" @mouseleave="color2 = 'black'">
              <router-link :to="{ path: 'wishList' }">
                <v-badge
                  bottom
                  overlap
                  color="black"
                  :content="`${totalWishList.length}`"
                >
                  <v-icon
                    :style="`cursor: pointer; text-decoration:none;`"
                    size="40"
                    :color="color2"
                    >mdi-heart-outline</v-icon
                  ></v-badge
                ></router-link
              >
            </div>

            <v-spacer></v-spacer>
            <div @mouseenter="color3 = 'green'" @mouseleave="color3 = 'black'">
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

            <v-spacer></v-spacer>
            <div v-if="isTokenSet">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-avatar color="black" dark v-bind="attrs" v-on="on">
                    <img
                      :src="profilePic"
                      v-if="userData.profilePic.length > 0"
                    />
                    <span v-else class="white--text text-h5">{{
                      userData.userName[0].toUpperCase()
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
                @mouseenter="color4 = 'green'"
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
                @mouseenter="color5 = 'green'"
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
      </v-row>
      <!-- <v-app-bar outlined class="my-2" app color="white"  dense :dark="isDark">
  </v-app-bar> -->
    </div>
    <div style="margin-top:2px;margin-bottom:2px;">
      <v-row
        class="ma-0  px-12"
        justify="center"
        align="center"
        outlined
        style="height:60px;background-color:white"
        app
        dense
        :dark="isDark"
      >
        <v-col cols="2" style="height:60px;border-top:2px solid black;">
          <v-menu open-on-hover bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div style="font-weight:600" dark v-bind="attrs" v-on="on">
                <div class="pl-2 py-1">
                  {{ $t("toolbar.SHOP BY CATEGORY") }}
                </div>
              </div>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in categories"
                :key="index"
                @click="
                  $router.push({
                    path: `/subcategory/${item.id}`,
                  })
                "
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-spacer></v-spacer>
        <v-col v-for="(n, i) in 4" :key="i" style="">
          <router-link
            style="text-decoration:none;font-weight:500"
            :to="{ path: links[i].path }"
          >
            <div style="color:black;" dark>
              {{ $t(`toolbar.${links[i].name}`) }}
            </div>
          </router-link>
        </v-col>

        <v-spacer></v-spacer>
        <v-col class="hidden-sm-and-down">
          <div
            @click="
              $router.push({
                path: `/sellOnAshewa`,
              })
            "
            style="font-weight:600;cursor:pointer"
          >
            {{ $t("toolbar.SELL ON ASHEWA") }}
          </div>
        </v-col>
        <v-divider light vertical style="color:black;"></v-divider>
        <v-col>
          <LocaleChanger></LocaleChanger>
        </v-col>
        <v-divider light vertical style="color:black;"></v-divider>
        <v-col>
          <v-menu v-model="showMenu" offset-y>
            <template v-slot:activator="{ on }">
              <div
                style="font-weight:600;cursor:pointer;color:black"
                class="btnLocaleActivation text-center"
                v-on="on"
                text
              >
                Currency
              </div>
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
                <country-flag :country="item.flag" size="small" />
                <v-list-item-title class="ml-3">{{
                  item.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LocaleChanger from "@/components/core/LocaleChanger";
import CountryFlag from "vue-country-flag";
export default {
  components: {
    LocaleChanger,
    CountryFlag,
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
          flag: "et",
          name: "ETB",
          class: "btnEN",
        },
        {
          lang: "USD",
          flag: "us",
          name: "USD",
          class: "btnEN",
        },
      ],
      links: [
        { name: "HOME", path: "/" },
        { name: "SERVICES", path: "/services" },
        { name: "RETAILERS", path: "/retailers" },
        { name: "SUPPLIERS", path: "/suppliers" },
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

    switchCurrency(lang) {
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
</style>
