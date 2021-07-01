<template>
  <div
    @click="
      $router.push({
        path: `/category/${id}`,
      })
    "
    style="cursor: pointer;"
  >
    <v-card width="250" height="200">
      <v-img
        :src="image[0] == 'h' ? image : `http://api.ashewa.com/media/${image}`"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        width="250"
        height="200"
      >
        <v-card-title
          class="text-md-h6 text-subtitle-2"
          v-text="title"
        ></v-card-title>
      </v-img>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid grey;
  padding: 25px;
}
</style>
