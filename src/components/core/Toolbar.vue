<template>
  <div>
    <v-row
      class="ma-0 hidden-md-and-down"
      style="height:140px;background-color:#43DB80"
    >
      <v-col cols="2" class="ma-0 pa-0">
        <div>
          <v-img
            src="/images/logo.png"
            style="margin:auto auto;cursor:pointer"
            width="150"
            height="140"
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
            class="pa-0"
            cols="6"
          >
            <v-row class="ma-0 pa-0">
              <v-menu open-on-click bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <div class="dropDown" dark v-bind="attrs" v-on="on">
                    <div class="pl-3">
                      {{ selected.length > 12 ? "All" : selected }}
                    </div>
                    <v-icon color="#b5b5b5">
                      mdi-chevron-down
                    </v-icon>
                  </div>
                </template>

                <v-list>
                  <v-list-item
                    style="cursor:pointer"
                    @click="selected = item.title"
                    v-for="(item, index) in categories"
                    :key="index"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-text-field
                solo
                dense
                flat
                light
                height="50px"
                placeholder="I'm shopping for..."
              ></v-text-field>
              <v-btn color="black" dark height="50px" tile>search</v-btn>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
          <v-col sm="3">
            <div class="iconsList">
              <v-row>
                <div
                  @mouseenter="color1 = 'white'"
                  @mouseleave="color1 = 'black'"
                >
                  <router-link :to="{ path: '/' }"
                    ><v-badge bottom overlap color="black" content="0"
                      ><v-icon size="40" :color="color1"
                        >mdi-chart-box-outline</v-icon
                      ></v-badge
                    ></router-link
                  >
                </div>

                <v-spacer></v-spacer>
                <div
                  @mouseenter="color2 = 'white'"
                  @mouseleave="color2 = 'black'"
                >
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
                <div
                  @mouseenter="color3 = 'white'"
                  @mouseleave="color3 = 'black'"
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
          <v-col cols="2" style="height:60px;border-top:2px solid black;">
            <v-menu open-on-hover bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <div style="font-weight:600" dark v-bind="attrs" v-on="on">
                  <div class="pl-2 py-1">Shop by Category</div>
                </div>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, index) in categories"
                  :key="index"
                  @click="
                    $router.push({
                      path: `/category/${item.id}`,
                    })
                  "
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>
          <v-col v-for="(n, i) in 1" :key="i" style="">
            <router-link
              style="text-decoration:none;font-weight:500"
              :to="{ path: links[0].path }"
            >
              <div style="color:black;" dark>
                {{ links[0].name }}
              </div>
            </router-link>
          </v-col>
          <v-col v-for="(n, i) in 3" :key="i" style="">
            <a
              style="text-decoration:none;font-weight:500"
              :href="links[i + 1].path"
            >
              <div style="color:black;" dark>
                {{ links[i + 1].name }}
              </div>
            </a>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="hidden-sm-and-down">
            <div
              @click="
                $router.push({
                  path: `/sellOnAshewa`,
                })
              "
              style="width:120px;font-weight:600;cursor:pointer"
            >
              Sell on Ashewa
            </div>
          </v-col>
          <v-divider light vertical style="color:black;"></v-divider>
          <v-col>
            <div>
              English
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      align="center"
      class="ma-0 pa-0 hidden-lg-and-up"
      style="height:60px;background-color:#43DB80"
    >
      <v-col cols="2" class="hidden-md-and-up">
        <span>
          <v-app-bar-nav-icon
            style="color:white"
            @click="sidebar = !sidebar"
          ></v-app-bar-nav-icon>
        </span>
      </v-col>
      <v-col cols="8">
        <div class="dropDownM">
          <v-text-field
            solo
            dense
            flat
            light
            height="40px"
            placeholder="I'm shopping for..."
          ></v-text-field>
          <v-btn color="black" dark height="40px" tile>search</v-btn>
        </div>
      </v-col>
      <v-spacer></v-spacer>
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
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>

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

        <v-list-item v-if="isTokenSet" @click="userLogout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            LOGOUT
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action></v-list-item-action>
          <v-icon>mdi-weather-sunny</v-icon>
          <v-list-item-action class="ml-2">
            <v-switch id="themeSwitcher" v-model="isDark" inset></v-switch>
          </v-list-item-action>
          <v-icon>mdi-weather-night</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selected: "All",
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
      links: [
        { name: "Home", path: "/" },
        { name: "Vendor", path: "http://vendors.ashewa.com/" },
        { name: "Retailer", path: "http://vendors.ashewa.com/signup#" },
        { name: "Supplier", path: "http://vendors.ashewa.com/signup#" },
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
            title: "MY_PROFILE",
            link: "/profile",
            icon: "mdi-face",
            class: "btnProfile",
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
