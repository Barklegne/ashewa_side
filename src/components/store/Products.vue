<template>
  <div style="width:100%">
    <v-container>
      <div class="row">
        <div v-if="filter" class="col-md-3 col-sm-3 col-xs-12">
          <v-card outlined>
            <v-card-title>Filters</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview
                :items="items"
                :open="[1]"
                :active="[5]"
                :selected-color="'#fff'"
                activatable
                open-on-click
                dense
              ></v-treeview>
            </template>
            <v-divider></v-divider>
            <v-card-title>Price</v-card-title>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  label="Min"
                  outlined
                  dense
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">TO</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  label="Max"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-title class="pb-0">Customer Rating</v-card-title>
            <v-container class="pt-0" fluid>
              <v-checkbox
                append-icon="mdi-star"
                label="4 & above"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                append-icon="mdi-star"
                label="3 & above"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                append-icon="mdi-star"
                label="2 & above"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                append-icon="mdi-star"
                label="1 & above"
                hide-details
                dense
              ></v-checkbox>
            </v-container>
            <v-divider></v-divider>
            <v-card-title class="pb-0">Size</v-card-title>
            <v-container class="pt-0" fluid>
              <v-checkbox label="XS" hide-details dense></v-checkbox>
              <v-checkbox label="S" hide-details dense></v-checkbox>
              <v-checkbox label="M" hide-details dense></v-checkbox>
              <v-checkbox label="L" hide-details dense></v-checkbox>
              <v-checkbox label="XL" hide-details dense></v-checkbox>
              <v-checkbox label="XXL" hide-details dense></v-checkbox>
              <v-checkbox label="XXXL" hide-details dense></v-checkbox>
            </v-container>
          </v-card>
        </div>
        <div
          :class="
            !filter
              ? 'col-md-12 col-sm-12 col-xs-12'
              : 'col-md-9 col-sm-9 col-xs-12'
          "
        >
          <v-row dense>
            <!-- <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Showing 1-12 of 200 products</small>
            </v-col> -->
            <v-col cols="12" sm="4">
              <v-select
                class="pa-0"
                v-model="select"
                :items="options"
                style="margin-bottom: -20px;"
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>

          <v-divider class="my-2"></v-divider>

          <div class="row text-center">
            <div
              class="col-md-3 col-sm-6 col-xs-12"
              :key="pro.id"
              v-for="pro in vendorProducts"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16 / 9"
                    height="200px"
                    :src="
                      pro.image[0] == 'h'
                        ? pro.image
                        : `http://api.ashewa.com/media/${pro.image}`
                    "
                  >
                    <v-card-title>{{ pro.type }} </v-card-title>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <v-btn
                          @click="
                            $router.push({
                              path: `/ProductDetails/${pro.id}`,
                            })
                          "
                          v-if="hover"
                          class=""
                          outlined
                          >VIEW</v-btn
                        >
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div>
                      <a href="/product" style="text-decoration: none">{{
                        pro.name.substring(0, 10)
                      }}</a>
                    </div>
                    <div>ETB {{ pro.sellingPrice }}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <!-- <div class="text-center mt-12">
            <v-pagination v-model="page" :length="6"></v-pagination>
          </div> -->
        </div>
      </div>
    </v-container>
  </div>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
<script>
export default {
  computed: {
    vendorProducts() {
      return this.$store.state.product.vendorProducts;
    },
  },
  data: () => ({
    range: [0, 10000],
    filter: false,
    select: "Popularity",
    options: [
      "Default",
      "Popularity",
      "Price: Low to High",
      "Price: High to Low",
    ],
    page: 1,
    min: 0,
    max: 10000,
    items: [
      {
        id: 2,
        name: "Shoes",
        children: [
          { id: 2, name: "Casuals" },
          { id: 3, name: "Formals" },
          { id: 4, name: "Sneakers" },
        ],
      },
      {
        id: 1,
        name: "Clothing",
        children: [
          { id: 5, name: "Shirts" },
          { id: 6, name: "Tops" },
          { id: 7, name: "Tunics" },
          { id: 8, name: "Bodysuit" },
        ],
      },
    ],
  }),
};
</script>
