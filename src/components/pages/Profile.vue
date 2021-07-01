<template>
  <div>
    <v-row class="pr-0 hidden-lg-and-up" justify="center"
      ><v-slide-group>
        <v-slide-item
          class="ml-2 mt-8"
          @click="item.title != 'Logout' ? (title = item.title) : userLogout()"
          v-for="item in items"
          :key="item.title"
        >
          <v-chip
            label
            @click="
              item.title != 'Logout' ? (title = item.title) : userLogout()
            "
            ><v-icon left>
              {{ item.icon }}
            </v-icon>
            {{ item.title }}
          </v-chip>
        </v-slide-item>
      </v-slide-group></v-row
    >
    <v-row>
      <v-col class="pr-0 hidden-md-and-down" cols="3">
        <v-card class="mx-0 mb-10" elevation="5">
          <div>
            <v-list-item two-line>
              <v-list-item-avatar color="black">
                <img :src="profilePic" v-if="userData.profilePic.length > 0" />
                <span v-else class="white--text text-h5">{{
                  userData.userName[0].toUpperCase()
                }}</span>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title style="font-weight:bolder">{{
                  userData.userName
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item
                @click="
                  item.title != 'Logout' ? (title = item.title) : userLogout()
                "
                v-for="item in items"
                :key="item.title"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content class="text-start">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-row class="mb-10">
          <Notifications title="Notifications" v-if="title == 'Notifications'"
            >Notification</Notifications
          >
          <div style="width:100%" v-if="title == 'User Profile'">
            <v-row class="mt-10 mx-10 text-start" justify="space-around">
              <v-col cols="12" lg="6">
                <v-row>
                  <v-col>
                    <p class="text-subtitle-1 font-weight-bold mb-1 subTitle">
                      First Name
                    </p>
                    <v-text-field
                      background-color="#ebe9e9"
                      class="mb-0"
                      height="50"
                      solo
                      flat
                      v-model="firstName"
                      :value="userData.firstName"
                    ></v-text-field
                  ></v-col>
                  <v-col>
                    <p class="text-subtitle-1 font-weight-bold mb-1 subTitle">
                      Last Name
                    </p>
                    <v-text-field
                      background-color="#ebe9e9"
                      class="mb-0"
                      height="50"
                      solo
                      flat
                      v-model="lastName"
                      :value="userData.lastName"
                    ></v-text-field
                  ></v-col>
                </v-row>
                <p class="text-subtitle-1 font-weight-bold mb-1 subTitle">
                  Email
                </p>
                <v-text-field
                  background-color="#ebe9e9"
                  class="mb-0"
                  height="50"
                  solo
                  flat
                  v-model="email"
                  :value="userData.email"
                ></v-text-field>
                <p class="text-subtitle-1 font-weight-bold mb-1 subTitle">
                  New Password
                </p>
                <v-text-field
                  background-color="#ebe9e9"
                  class="mb-0"
                  height="50"
                  solo
                  flat
                  type="password"
                ></v-text-field>
                <v-btn
                  @click="updateUser"
                  color="success"
                  class="ma-2 white--text"
                >
                  Save
                </v-btn>
                <v-btn color="error" class="ma-2 white--text">
                  Cancel
                </v-btn>
              </v-col>
              <v-col align-self="center" cols="12" md="4">
                <p
                  class="text-center text-subtitle-1 font-weight-bold mb-1 subTitle"
                >
                  Change Profile
                </p>
                <v-card class="pa-0" color="#ebe9e9">
                  <v-img
                    class="ma-0"
                    :src="
                      userData.firstName.length > 0
                        ? userData.firstName
                        : imageUrl
                    "
                  ></v-img>
                </v-card>
                <v-row justify="center" class="my-5">
                  <v-btn
                    color="blue-grey"
                    class="ma-2 white--text"
                    @click="onPickFile"
                  >
                    Upload Image
                    <v-icon right dark>
                      mdi-cloud-upload
                    </v-icon>
                  </v-btn>
                  <input
                    type="file"
                    style="display: none"
                    ref="fileInput"
                    multiple
                    accept="image/*"
                    @change="onFilePicked"
                  />
                </v-row>
              </v-col>
            </v-row>
          </div>
          <div v-if="title == 'Address'"></div>
          <Cart
            title="Recent Viewed Products"
            col="11"
            v-if="title == 'Cart'"
          ></Cart>
          <WishList
            title="Recent Viewed Products"
            col="11"
            v-if="title == 'Recent Viewed Products'"
          >
            Recent Viewed Products
          </WishList>
          <WishList col="11" v-if="title == 'Wishlist'"></WishList>
        </v-row>
      </v-col>
      <ErrorMessage />
    </v-row>
  </div>
</template>
<script>
import WishList from "../pages/Wishlist.vue";
import Cart from "../pages/Cart.vue";
import Notifications from "../notification/Orders.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
    userData() {
      return this.user !== null
        ? {
            profilePic: this.user.profilePic ? this.user.profilePic : "",
            userName: this.user.username ? this.user.username : "",
            password: this.user.password ? this.user.password : "",
            firstName: this.user.firstName ? this.user.firstName : "",
            lastName: this.user.lastName ? this.user.lastName : "",
            email: this.user.lastName ? this.user.lastName : "",
          }
        : {
            profilePic: "",
            userName: "",
            password: "",
            firstName: "",
            lastName: "",
          };
    },
  },
  components: {
    WishList,
    Cart,
    Notifications,
  },
  methods: {
    userLogout() {
      this.$store.dispatch("userLogout");
    },
    updateUser() {
      console.log("test");
      console.log({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        id: this.user.id,
      });

      this.$store.dispatch("updateUser", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        id: this.user.id,
      });
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      console.log(filename);
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      console.log(this.image);
    },
  },
  created() {
    if (!this.$store.state.auth.isTokenSet) {
      this.$router.push({ path: "/login" });
    }
  },
  data() {
    return {
      image: null,
      imageUrl:
        "https://cdn1.iconfinder.com/data/icons/facebook-ui/48/additional_icons-03-512.png",
      items: [
        { title: "Notifications", icon: "mdi-bell" },
        { title: "User Profile", icon: "mdi-account" },
        { title: "Address", icon: "mdi-pin" },
        { title: "Recent Viewed Products", icon: "mdi-clock-outline" },
        { title: "Cart", icon: "mdi-cart-outline" },
        { title: "Wishlist", icon: "mdi-heart-outline" },
        { title: "Logout", icon: "mdi-logout" },
      ],
      title: "Notifications",
      firstName: "",
      lastName: "",
      email: "",
    };
  },
};
</script>
