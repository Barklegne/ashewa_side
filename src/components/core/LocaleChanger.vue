<template>
  <v-menu v-model="showMenu" offset-y>
    <template v-slot:activator="{ on }">
      <div
        style="font-weight:600;cursor:pointer;color:black"
        class="btnLocaleActivation text-center"
        color="black"
        v-on="on"
        text
      >
        {{ displayLocale == "en" ? "English" : "አማርኛ" }}
      </div>
    </template>
    <v-list>
      <v-list-item
        active-class="white--text"
        v-for="(item, i) in langs"
        :key="`Lang${i}`"
        :value="item.lang"
        @click="switchLocale(item.lang)"
        :class="[item.class]"
      >
        <country-flag :country="item.flag" size="small" />
        <v-list-item-title class="ml-3">{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import CountryFlag from "vue-country-flag";

export default {
  data() {
    return {
      showMenu: false,
      langs: [
        {
          lang: "en",
          flag: "gb",
          name: "English",
          class: "btnEN",
        },
        {
          lang: "et",
          flag: "et",
          name: "አማርኛ",
          class: "btnEN",
        },
      ],
    };
  },
  components: {
    CountryFlag,
  },
  methods: {
    switchLocale(lang) {
      this.$store.dispatch("setLocale", lang);
    },
  },
  computed: {
    displayLocale() {
      console.log(this);
      return this.$i18n.locale;
    },
  },
};
</script>

<style>
.flag {
  width: 118px !important;
}

.v-list-item {
  min-width: 185px !important;
}
</style>
