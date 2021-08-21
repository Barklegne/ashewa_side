<template>
  <div v-if="data.length > 0" class="mb-2">
    <v-app-bar color="white" v-if="title != 'Deal of the day'" dense flat>
      <v-toolbar-title class="hidden-md-and-down font-weight-bold"
        >{{ title }}
      </v-toolbar-title>
      <v-toolbar-title
        style="font-size:15px"
        class="hidden-lg-and-up font-weight-bold"
        >{{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-app-bar
      color="white"
      v-if="data.length > 0 && title == 'Deal of the day'"
      dense
      flat
    >
      <v-toolbar-title class="hidden-md-and-down font-weight-bold"
        >Deal of the day</v-toolbar-title
      >
      <v-toolbar-title
        style="font-size:15px"
        class="hidden-lg-and-up font-weight-bold"
        >Deal of the day
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-row class="hidden-sm-and-down">
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item class="mr-5 mb-4" v-for="(n, i) in dataN" :key="i">
          <ProductCard
            :vendor="n.vendor"
            :supplierDomain="n.supplierDomain"
            :productName="n.name"
            :productImages="n.productimageSet"
            :sellingPrice="n.sellingPrice"
            :productId="`${n.id}`"
            :productCategory="n.category"
            :description="n.description"
            :dealerPrice="0"
            :productrateSet="n.productrateSet"
          />
        </v-slide-item>
      </v-slide-group>
    </v-row>
    <v-row style="background-color:#ededed" class="mx-4 py-5 hidden-md-and-up">
      <v-col
        v-for="(n, i) in dataN"
        :key="i"
        cols="6"
        lg="3"
        md="4"
        sm="6"
        class="ma-0 pa-0"
      >
        <ProductMobile
          :vendor="n.vendor"
          :supplierDomain="n.supplierDomain"
          :productName="n.name"
          :productImages="n.productimageSet"
          :sellingPrice="n.sellingPrice"
          :productId="`${n.id}`"
          :productCategory="n.category"
          :description="n.description"
          :dealerPrice="0"
          :productrateSet="n.productrateSet"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductCard from "./ProductCard";
import ProductMobile from "./ProductMobile";
export default {
  components: {
    ProductCard,
    ProductMobile,
  },
  computed: {
    dataF() {
      return this.data.filter((n) => n.productimageSet.length > 0);
    },
    dataN() {
      const d = [];

      this.data.forEach((da) => {
        if (da.productimageSet.length == 0) {
          if (da.image) {
            d.push({ ...da, productimageSet: [{ image: da.image }] });
          }
        } else {
          d.push(da);
        }
      });
      return d;
    },
  },
  props: {
    data: Array,
    title: String,
  },
  data() {
    return {
      model: null,
    };
  },
};
</script>

<style lang="scss" scoped></style>
