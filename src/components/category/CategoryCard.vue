<template>
  <div
    @click="
      vendor
        ? $router.push({
            path: `/vendors/${id}`,
          })
        : supplier
        ? $router.push({
            path: `/suppliers/${id}`,
          })
        : $router.push({
            path: `/subcategory/${id}`,
          })
    "
    style="cursor: pointer;"
  >
    <v-card
      class="hidden-md-and-down"
      :width="width ? width : ''"
      :height="width ? width - 50 : ''"
    >
      <v-img
        :src="image[0] == 'h' ? image : `http://api.ashewa.com/media/${image}`"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        :width="width ? width : ''"
        :height="width ? width - 50 : ''"
      >
        <v-card-title
          class="text-md-h6 text-subtitle-2"
          v-text="title"
        ></v-card-title>
      </v-img>
    </v-card>
    <v-card
      class="hidden-md-and-down"
      :width="width ? width : ''"
      :height="width ? width - 50 : ''"
    >
      <v-img
        :src="image[0] == 'h' ? image : `http://api.ashewa.com/media/${image}`"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        :width="width ? width : ''"
        :height="width ? width - 50 : ''"
      >
        <v-card-title
          class="text-md-h6 text-subtitle-2"
          v-text="title"
        ></v-card-title>
      </v-img>
    </v-card>
    <v-card class="hidden-lg-and-up my-7 mr-3" width="100%" height="160">
      <v-img
        :src="image[0] == 'h' ? image : `http://api.ashewa.com/media/${image}`"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
        height="200px"
      >
        <v-card-title
          class="text-md-h6 mb-0 text-subtitle-3  align-content-lg-start"
          v-text="title"
        >
        </v-card-title>
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
    width: {
      type: Number,
    },
    vendor: {
      default: false,
    },
    supplier: {
      default: false,
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
