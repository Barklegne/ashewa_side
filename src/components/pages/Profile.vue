<template>
  <div>
    <v-row class="px-0 hidden-lg-and-up" justify="center"
      ><v-slide-group>
        <v-slide-item
          class="ml-2 mt-8"
          @click="item.title != 'Logout' ? (title = item.title) : userLogout()"
          v-for="item in items"
          :key="item.title"
        >
          <v-chip
            label
            style="backgroundColor:#66DC81;color:#ffffff"
            @click="
              item.title != 'Logout' ? (title = item.title) : userLogout()
            "
            ><v-icon color="white" left>
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
              <v-list-item-content>
                <v-list-item-title style="font-weight:bolder">{{
                  userData.userName.toUpperCase()
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
          <div v-if="title == 'Order History'">
            <OrderHistory></OrderHistory>
          </div>
          <div style="width:600px" class="ma-5" v-if="title == 'Affliate'">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      more
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in vendors" :key="item">
                    <td>{{ item.vendorName }}</td>
                    <td>
                      <v-btn @click="ven = true" icon
                        ><v-icon>mdi-dots-vertical</v-icon></v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-dialog v-model="ven">
              <v-card>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Product Name
                        </th>
                        <th class="text-left">
                          Product Id
                        </th>
                        <th class="text-left">
                          link
                        </th>
                        <th class="text-left">
                          status
                        </th>
                        <th class="text-left">
                          action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in vendorData" :key="item">
                        <td>{{ item.product.name }}</td>
                        <td>{{ item.product.id }}</td>
                        <td></td>
                        <td>{{ item.status }}</td>
                        <td>
                          <v-btn @click="ven = true" text>{{ Apply }}</v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-dialog>
          </div>
          <div style="width:100%" v-if="title == 'User Profile'">
            <v-row class="mt-10 mx-10 text-start" justify="space-around">
              <v-col cols="12" lg="6">
                <v-row>
                  <v-col class="my-0 py-0" cols="6">
                    <p class="text-subtitle-1 font-weight-bold mb-1 subTitle">
                      First Name
                    </p>
                    <v-text-field
                      background-color="#ebe9e9"
                      class="mb-0"
                      height="50"
                      solo
                      flat
                      v-model="userData.firstName"
                      :value="userData.firstName"
                    ></v-text-field
                  ></v-col>
                  <v-col class="my-0 py-0" cols="6">
                    <p class="text-subtitle-1 font-weight-bold mb-1 subTitle">
                      Last Name
                    </p>
                    <v-text-field
                      background-color="#ebe9e9"
                      class="mb-0"
                      height="50"
                      solo
                      flat
                      v-model="userData.lastName"
                      :value="userData.lastName"
                    ></v-text-field
                  ></v-col>
                  <v-col class="my-0 py-0" cols="12">
                    <p class="text-subtitle-1 font-weight-bold mb-1 subTitle">
                      Email
                    </p>
                    <v-text-field
                      background-color="#ebe9e9"
                      class="mb-0"
                      height="50"
                      solo
                      flat
                      v-model="userData.email"
                      :value="userData.email"
                    ></v-text-field>
                  </v-col>
                  <v-col class="my-0 py-0" cols="12">
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
                  </v-col>
                </v-row>
                <v-row>
                  <v-col col="6">
                    <v-btn
                      color="white"
                      outlined
                      block
                      class="ma-2 green--text"
                    >
                      Cancel
                    </v-btn>
                  </v-col>
                  <v-col col="6">
                    <v-btn
                      @click="updateUser"
                      color="success"
                      block
                      class="ma-2 white--text"
                    >
                      Save
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <Cart
            title="Recent Viewed Products"
            col="11"
            v-if="title == 'Cart'"
          ></Cart>

          <WishList col="11" v-if="title == 'Wishlist'"></WishList>
        </v-row>
      </v-col>
      <ErrorMessage />
    </v-row>
  </div>
</template>

<script>

const WishList = () => import("../pages/Wishlist.vue");
const Cart = () => import("../pages/Cart.vue");
const OrderHistory = () => import("../pages/OrderHistory.vue");
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
    vendors() {
      return [
        { vendorName: "test", vendorId: "1" },
        { vendorName: "test1", vendorId: "1" },
        { vendorName: "test2", vendorId: "1" },
      ];
    },
    vendorData() {
      return {
        orderStatus: "PEN",
        link: "",
        product: {
          name: "test product",
        },
      };
    },
    userData() {
      return this.user !== null
        ? {
            profilePic: this.user.profilePic ? this.user.profilePic : "",
            userName: this.user.username ? this.user.username : "",
            password: this.user.password ? this.user.password : "",
            firstName: this.user.firstName ? this.user.firstName : "",
            lastName: this.user.lastName ? this.user.lastName : "",
            email: this.user.email ? this.user.email : "",
          }
        : {
            profilePic: "",
            userName: "",
            password: "",
            firstName: "",
            lastName: "",
          };
    },
    firstName() {
      return this.userData.firstName;
    },
    lastName() {
      return this.userData.lastName;
    },
    email() {
      return this.userData.email;
    },
  },
  components: {
    WishList,
    Cart,
    OrderHistory,
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
      ven: false,
      imageUrl:
        "https://cdn1.iconfinder.com/data/icons/facebook-ui/48/additional_icons-03-512.png",
      items: [
        { title: "Order History", icon: "mdi-clock-outline" },
        { title: "User Profile", icon: "mdi-account" },
        { title: "Cart", icon: "mdi-cart-outline" },
        { title: "Wishlist", icon: "mdi-heart-outline" },
        { title: "Logout", icon: "mdi-logout" },
        // { title: "Affliate", icon: "mdi-cash" },
      ],
      title: "Order History",
    };
  },
};
</script>
