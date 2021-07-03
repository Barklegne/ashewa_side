<template>
  <v-app class="myFont">
    <Toolbar />
    <v-main class="text-center">
      <loading />
      <v-container class="pa-0  px-lg-10" fluid>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from "@/components/core/Toolbar.vue";
import Loading from "@/components/core/Loading.vue";
import Footer from "@/components/core/Footer.vue";

export default {
  name: "App",
  metaInfo() {
    return {
      title: "Ashewa",
      meta: [
        { name: "msapplication-TileColor", content: "#ffc40d" },
        { name: "theme-color", content: "#ffffff" },
        {
          name: "apple-mobile-web-app-title",
          content: "Ashewa",
        },
        { name: "application-name", content: "Ashewa" },
        {
          httpEquiv: "Content-Security-Policy",
          content: "upgrade-insecure-requests",
        },
      ],
    };
  },
  components: {
    Toolbar,
    Loading,
    Footer,
  },
  computed: {},
  created() {
    this.parentCats();
    this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      if (this.$store.getters.categories.length === 0) {
        await this.$store.dispatch("getAllProducts", { page: 1, pageSize: 5 });
      }
    },
    async parentCats() {
      if (this.$store.getters.products.length === 0) {
        this.$store.dispatch("parentCats");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans");
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.darkB {
  background-color: #121212;
}
.lightB {
  background-color: white;
}
.myFont {
  font-family: "Nunito Sans";
}
</style>
