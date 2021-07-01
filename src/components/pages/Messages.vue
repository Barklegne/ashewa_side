<template>
  <div>
    <v-app-bar flat> Messages</v-app-bar>
    <div
      v-if="messages.length == 0"
      style="margin:50px auto"
      class="text-center"
    >
      <v-img
        width="50vw"
        style="margin:auto auto"
        src="https://img.alicdn.com/tfs/TB1iqjLvpzqK1RjSZFoXXbfcXXa-360-360.png"
      ></v-img>
      <p class="ma-0 pa-0">No messages now</p>
      <p>Choose a product you like and contact the supplier</p>
    </div>

    <v-list class="text-start" v-for="(message, i) in messages" :key="i">
      <v-list-item
        @click="
          $router.push({
            path: `/messages/1`,
          })
        "
      >
        <v-list-item-avatar>
          <v-list-item-avatar size="50">
            <v-img :src="message.src"></v-img>
          </v-list-item-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ message.title }}</v-list-item-title>
          <v-list-item-subtitle
            ><span class="text--primary">Ali Connors</span> &mdash; I'll be in
            your neighborhood doing errands this weekend. Do you want to hang
            out?</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          title: "Ashewa Store Three",
          description: "Test description",
          src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        },
        {
          title: "Ashewa Store Two",
          description: "Test description",
          src: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        },
        {
          title: "Ashewa Store Four",
          description: "Test description",
          src: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        },
        {
          title: "Ashewa Store Five",
          description: "Test description",
          src: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        },
        {
          title: "Ashewa Store Three",
          description: "Test description",
          src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        },
        {
          title: "Ashewa Store Two",
          description: "Test description",
          src: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        },
        {
          title: "Ashewa Store Four",
          description: "Test description",
          src: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        },
        {
          title: "Ashewa Store Five",
          description: "Test description",
          src: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
