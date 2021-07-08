<template>
  <div>
    <v-footer
      style="z-index:1000"
      class="pa-0 hidden-lg-and-up"
      height="55"
      fixed
    >
      <div
        @click="
          $router.push({
            path: '/store',
          })
        "
        style="margin:auto auto"
      >
        <v-icon
          :color="route.path == '/store' ? '#43DB80' : '#383737'"
          style="font-size:32px"
          large
          >mdi-storefront-outline</v-icon
        >
      </div>
      <div
        @click="
          $router.push({
            path: '/store',
          })
        "
        style="margin:auto auto"
      >
        <v-icon
          :color="route.path == '/store' ? '#43DB80' : '#383737'"
          style="font-size:32px"
          large
          >mdi-telegram</v-icon
        >
      </div>
      <div style="width:80%;background-color:red;height:100%">
        <v-btn
          style="text-transform: none;color:#0ea54b;font-weight:700"
          tile
          color="#e8ffe8"
          elevation="0"
          height="100%"
          width="50%"
          @click="
            addToBag({
              image: product.productimageSet[0].image,
              price: product.sellingPrice,
              title: product.name,
              id: product.id,
              category: product.category.name,
              quantity: quantity,
            })
          "
          >Add to Bag</v-btn
        >
        <v-btn
          style="text-transform: none;color:white;font-weight:700;"
          tile
          color="#0ea54b"
          elevation="0"
          height="100%"
          width="50%"
          @click="
            sheetB
              ? addToCart({
                  image: product.productimageSet[0].image,
                  price: product.sellingPrice,
                  title: product.name,
                  id: product.id,
                  category: product.category.name,
                  quantity: quantity,
                })
              : (sheetB = true)
          "
          >Buy now</v-btn
        >
      </div>
    </v-footer>
    <v-container class="hidden-md-and-down" v-if="!!product.name">
      <!-- :src="`http://188.166.153.99/media/${image.image}`" -->
      <!-- v-html="product.description" -->

      <v-row v-if="!!product">
        <v-col cols="12" md="5" class="my-4">
          <zoom-on-hover
            :img-normal="
              this.product.productimageSet[index].image[0] == 'h'
                ? this.product.productimageSet[index].image
                : `http://api.ashewa.com/media/${this.product.productimageSet[index].image}`
            "
            :img-zoom="
              this.product.productimageSet[index].image[0] == 'h'
                ? this.product.productimageSet[index].image
                : `http://api.ashewa.com/media/${this.product.productimageSet[index].image}`
            "
            style="max-width:400px"
            :scale="1.3"
          ></zoom-on-hover>

          <v-slide-group v-if="!!product.name" multiple show-arrows>
            <v-slide-item v-for="(n, i) in product.productimageSet" :key="n.id">
              <div
                :style="index == i ? 'border:3px solid green' : ''"
                class="ma-1"
                @click="toggle(i)"
              >
                <v-img
                  height="50px"
                  width="50px"
                  :src="`http://api.ashewa.com/media/${n.image}`"
                ></v-img>
              </div>
            </v-slide-item>
          </v-slide-group>
        </v-col>
        <v-col>
          <v-col>
            <v-container>
              <v-row justify="start">
                <v-col>
                  <p class="text-h4">Overview</p>
                </v-col>
              </v-row>
              <v-row justify="start" class="ml-4 text-left">
                <div class="headline">
                  {{ product ? product.name : "" }}
                  <!--Apple MacBook Pro 13 | MacOS Big Sur 2020 | 16GB RAM | 1TB SSD
                  | WARRANTY |-->
                </div>
              </v-row>
              <v-row justify="start" class="ma-4">
                <span>
                  Brand:
                  {{
                    !!product
                      ? product.vendor.storeName.charAt(0).toUpperCase() +
                        product.vendor.storeName.slice(1)
                      : ""
                  }}</span
                >

                <v-rating
                  v-model="rating"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  dense
                  readonly
                  half-increments
                  hover
                  size="18"
                ></v-rating>
                <span class="caption ml-2 mt-1">({{ 3 }} review)</span>
              </v-row>
              <v-divider></v-divider>

              <v-row class="mt-3 ml-2">
                <p class="text-caption text-start">
                  {{ !!product ? product.description : "" }}
                </p>
              </v-row>
              <v-row align="center" justify="center">
                <v-col cols="6" md="2">Unit Price:</v-col>
                <v-col cols="6" md="3">
                  <v-row
                    ><h2 class="text-weight-bolder">
                      ETB {{ !!product ? product.sellingPrice : "" }}
                    </h2>
                  </v-row>
                  <v-row>
                    <h5 class="text-decoration-line-through text-weight-normal">
                      ETB {{ !!product ? product.dealerPrice : "" }}
                    </h5>
                  </v-row>
                </v-col>

                <v-col cols="5" lg="2">
                  <v-card class="ma-0 text-center" elevation="0">
                    <v-card-title class="ma-0 pa-0" style="font-size:16px"
                      >Quantity</v-card-title
                    >
                    <v-row class="mt-1">
                      <v-btn icon depressed @click="decrement">
                        <v-icon> mdi-arrow-down </v-icon>
                      </v-btn>

                      <span class="mt-2">{{ quantity }}</span>

                      <v-btn icon depressed @click="increment">
                        <v-icon> mdi-arrow-up </v-icon>
                      </v-btn>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col
                  ><v-btn
                    dark
                    class="btn mt-2 mr-2"
                    tile
                    elevation="0"
                    color="btn"
                    @click="
                      addToCart({
                        image: product.productimageSet[0].image,
                        price: product.sellingPrice,
                        title: product.name,
                        id: product.id,
                        category: product.category.name,
                        quantity: quantity,
                      })
                    "
                    style="background-color:white;color:#09b750;border:1px solid #09b750;"
                    >Buy it Now</v-btn
                  >
                  <v-btn
                    class="btn mt-2 mr-2"
                    tile
                    dark
                    elevation="0"
                    color="success"
                    >Visit Store</v-btn
                  ></v-col
                >
              </v-row>
              <v-divider class="my-6"></v-divider>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-card-title>Price per Quantity</v-card-title>
                  <v-card class=" text-start" color="white" flat>
                    <v-simple-table style="border:1px solid black" dense>
                      <template v-slot:default>
                        <tbody>
                          <tr v-for="(item, i) in prices" :key="i">
                            <td style="background-color:#bbc4bdb4">
                              {{ item.name }}
                            </td>
                            <td>{{ item.calories }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-card-title class="mx-13 text-start"
                    >Specification</v-card-title
                  >
                  <v-card class="text-start" color="white" flat>
                    <v-simple-table style="border:1px solid black" dense>
                      <template v-slot:default>
                        <tbody>
                          <tr v-for="(item, i) in desserts" :key="i">
                            <td style="background-color:#bbc4bdb4">
                              {{ item.name }}
                            </td>
                            <td>{{ item.calories }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card></v-col
                >
              </v-row>

              <v-divider class="my-6"></v-divider>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  elevation="0"
                  color="btn"
                  style="background-color:white;color:#09b750;border:1px solid #09b750;"
                  class="btn mr-3"
                  >Make Offer</v-btn
                >

                <v-btn
                  elevation="0"
                  color="btn"
                  style="background-color:white;color:#09b750;border:1px solid #09b750;"
                  >Chat Now
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-container>
          </v-col>
        </v-col>
      </v-row>
      <div class="mb-10 py-10" style="background-color:#F2F2F2">
        <v-row class="mb-4">
          <v-spacer></v-spacer>
          <v-col cols="11">
            <div
              style="width:100%; background-color:white;height:50px;border-radius:5px"
              class="text-center"
            >
              <h1>
                {{
                  !!product
                    ? product.vendor.storeName.charAt(0).toUpperCase() +
                      product.vendor.storeName.slice(1)
                    : ""
                }}
              </h1>
            </div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row class="mb-10" align="start">
          <v-spacer></v-spacer>
          <v-col
            cols="2"
            style="background-color:white;border-radius:5px"
            class="text-start hidden-md-and-down"
            ><div><h4>Store Categories</h4></div>
            <div v-for="(cat, i) in categories" :key="i">
              <h5>{{ cat.name }}</h5>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="8" style="background-color:white;border-radius:5px">
            <v-row justify="center">
              <v-col cols="8" lg="4" style="" class="text-start">
                <div><h4>Store Categories</h4></div>
                <div><h5>97.6% Positive Feedback</h5></div>
                <div><h5>169 Followers</h5></div>
                <div class="mt-5">
                  <v-btn
                    class="mx-1 btn"
                    color="#09b750"
                    rounded
                    elevation="0"
                    :outlined="!following"
                    @click="following = !following"
                    :dark="following"
                    small
                    >{{ following ? "Following" : "+ Follow" }}</v-btn
                  >
                  <v-btn
                    class="mx-1 btn"
                    dark
                    color="#09b750"
                    elevation="0"
                    rounded
                    small
                    >Visit Store</v-btn
                  >
                </div>
              </v-col>

              <v-col
                class="mx-auto"
                v-for="(prod, i) in relatedProducts"
                :key="i"
                cols="6"
                lg="2"
              >
                <div v-if="prod.productimageSet.length > 0">
                  <v-card
                    :href="`/ProductDetails/${prod.id}`"
                    v-if="i < 4"
                    class="mx-auto"
                    width="100"
                  >
                    <v-img
                      :src="
                        prod.productimageSet[0].image[0] == 'h'
                          ? prod.productimageSet[0].image
                          : `http://api.ashewa.com/media/${prod.productimageSet[0].image}`
                      "
                      height="100px"
                    ></v-img>
                  </v-card>
                </div>
                <div v-if="i < 4">
                  <h4>{{ prod.sellingPrice }}</h4>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </div>
    </v-container>
    <div
      style="padding-bottom:30px"
      v-if="!!product.name"
      class="mb-10 hidden-lg-and-up"
    >
      <v-carousel height="350" hide-delimiters :show-arrows="false">
        <v-carousel-item v-for="(n, i) in product.productimageSet" :key="i">
          <v-img
            class="white--text align-end text-end pb-2"
            width="100vw"
            height="345"
            :src="`http://api.ashewa.com/media/${n.image}`"
          >
            <div
              class="mr-2 pa-1"
              style="display:inline;background-color:grey;border-radius:5px;font-size:12px"
            >
              {{ i + 1 }}/{{ product.productimageSet.length }}
            </div>
          </v-img>
        </v-carousel-item>
      </v-carousel>
      <div class="mx-5 text-start">
        <v-slide-group v-model="model" class="pa-0" active-class="success">
          <v-slide-item class="mr-6">
            <div>
              <p class="ma-0" style="font-size:18px;font-weight:700">
                ETB {{ !!product ? product.sellingPrice : "" }}
              </p>
              <p class="mb-1" style="font-size:11px;color:grey;">
                Min. Order:3 Pieces
              </p>
            </div>
          </v-slide-item>
          <v-slide-item class="mr-5">
            <div>
              <p class="ma-0" style="font-size:18px;font-weight:700">
                ETB {{ !!product ? product.sellingPrice - 500 : "" }}
              </p>
              <p class="mb-1" style="font-size:11px;color:grey;">
                500-1999 Pieces
              </p>
            </div>
          </v-slide-item>
          <v-slide-item class="mr-5">
            <div>
              <p class="ma-0" style="font-size:18px;font-weight:700">
                ETB {{ !!product ? product.sellingPrice - 700 : "" }}
              </p>
              <p class="mb-1" style="font-size:11px;color:grey;">
                2000-4999 Pieces
              </p>
            </div>
          </v-slide-item>
          <v-slide-item class="mr-5">
            <div>
              <p class="ma-0" style="font-size:18px;font-weight:700">
                ETB {{ !!product ? product.sellingPrice - 900 : "" }}
              </p>
              <p class="mb-1" style="font-size:11px;color:grey;">
                >5000 Pieces
              </p>
            </div>
          </v-slide-item>
        </v-slide-group>
      </div>
      <v-divider></v-divider>
      <div class="mx-5 my-2">
        <p style="font-size:14px;" class="text-start">
          {{ !!product ? product.description : "" }}
        </p>
        <v-row class="mx-1 mt-1">
          <v-rating
            v-model="rating"
            color="green darken-3"
            class="text-start"
            background-color="grey darken-1"
            dense
            readonly
            half-increments
            hover
            size="12"
          ></v-rating>
          <p style="font-size:13px;color:grey;" class="ml-1 mt-1">
            {{ "4.7" }}
          </p>
          <p style="font-size:13px;color:grey;" class="ml-1 mt-1">
            {{ "| 320 orders" }}
          </p>
        </v-row>
      </div>
      <v-divider></v-divider>
      <div class="mx-5 my-1 mb-2">
        <v-btn
          style="text-transform: none;color:white;"
          color="#0ea54b"
          rounded
          class="my-1"
          width="100%"
          @click="
            chat({
              vendorName: product.vendor.storeName,
            })
          "
          >Chat Now</v-btn
        >
        <v-btn
          style="text-transform: none;color:#0ea54b;"
          color="#e8ffe8"
          rounded
          class="my-1"
          width="100%"
          @click="inquire({ vendorName: product.vendor.storeName })"
          >Send Inquiry</v-btn
        >
      </div>
      <v-divider></v-divider>
      <div class="mx-5 my-2 text-start">
        <p class="ma-0 mb-1" style="font-size:14px;font-weight:500">
          {{ colors.length }} Colors, {{ colors[0].sizes.length }} Size
        </p>
        <v-slide-group v-model="i" active-class="success">
          <v-slide-item class="mr-2" v-for="(n, i) in colors" :key="i">
            <v-card
              style="border:1px solid grey;padding:2px"
              width="60"
              height="60"
              rounded=""
              @click="sheetB = true"
              ><v-img aspect-ratio="1" :src="n.image"></v-img>
            </v-card>
          </v-slide-item>
        </v-slide-group>
        <v-bottom-sheet scrollable v-model="sheetB">
          <v-sheet
            style="overflow-y:scroll;padding-bottom:70px"
            class="text-start"
          >
            <v-app-bar
              style="position: absolute;z-index:1000"
              elevate-on-scroll
              flat
              color="white"
              ><v-btn icon @click="sheetB = !sheetB"
                ><v-icon>mdi-close</v-icon>
              </v-btn>
              <p style="margin:auto auto;font-size:17px;font-weight:600">
                Product Option
              </p></v-app-bar
            >
            <v-carousel
              class="mt-10"
              height="250"
              hide-delimiters
              :show-arrows="true"
            >
              <v-carousel-item v-for="(n, i) in colors" :key="i">
                <v-img
                  class="white--text align-end text-end pb-2"
                  style="margin:auto auto"
                  width="70vw"
                  height="245"
                  :src="n.image"
                >
                  <div
                    class="mr-2 pa-1"
                    style="display:inline;background-color:grey;border-radius:5px;font-size:12px"
                  >
                    {{ i + 1 }}/{{ colors.length }}
                  </div>
                </v-img>
              </v-carousel-item>
            </v-carousel>
            <p class="my-2 text-center" style="font-size:18px;font-weight:700">
              ETB {{ !!product ? product.sellingPrice + 500.55 : "" }}
            </p>
            <p class="mx-5">Color</p>
            <v-row justify="start" class="mx-5">
              <v-col
                class="pa-0 pt-2"
                cols="1"
                style="margin-right:2px"
                v-for="(n, i) in colors"
                :key="i"
              >
                <v-card
                  :style="
                    i == 1
                      ? 'border:3px solid green;padding:2px'
                      : 'border:1px solid grey;padding:2px'
                  "
                  width="60"
                  height="60"
                  rounded=""
                  ><v-img aspect-ratio="1" :src="n.image"></v-img>
                </v-card>
              </v-col>
            </v-row>
            <p class="mx-5 mt-5 mb-2">Size</p>
            <div class="mx-5 mb-2">
              <v-chip
                class="mr-2 pa-5"
                label
                style="border:2px solid green;font-size:20px;font-weight:300"
                >S</v-chip
              >
              <v-chip
                class="mr-2 pa-5"
                label
                style="font-size:20px;font-weight:300"
                >M</v-chip
              >
              <v-chip
                class="mr-2 pa-5"
                label
                style="font-size:20px;font-weight:300"
                >L</v-chip
              >
              <v-chip
                class="mr-2 pa-5"
                label
                style="font-size:20px;font-weight:300"
                >XL</v-chip
              >
            </div>
            <p class="mx-5 mt-5 mb-2">Quantity</p>

            <v-row class="mt-1 mx-1">
              <v-btn
                :disabled="quantity == 1"
                icon
                depressed
                @click="decrement"
              >
                <v-icon> mdi-minus-circle-outline</v-icon>
              </v-btn>

              <span class="mt-2 mx-1">{{ quantity }}</span>

              <v-btn icon depressed @click="increment">
                <v-icon> mdi-plus-circle-outline </v-icon>
              </v-btn>
            </v-row>
          </v-sheet>
        </v-bottom-sheet>
      </div>
      <v-divider></v-divider>
      <div class="mx-5 my-2 text-start">
        <p class="mb-2 ">Specification</p>
        <v-card class="text-start" color="white" flat>
          <v-simple-table style="border:1px solid black" dense>
            <template v-slot:default>
              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td style="background-color:#bbc4bdb4">
                    {{ item.name }}
                  </td>
                  <td>{{ item.calories }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </div>
      <v-divider></v-divider>
      <div class="mx-5 my-2 text-start">
        <p class="mb-2 ">Item Description</p>
        <v-img width="100%" src="/product-img.jpg"></v-img>
      </div>
      <v-divider></v-divider>
      <div class="mx-5 my-2 text-start">
        <v-row align="center" justify="center">
          <v-col cols="4">
            <p class="ma-0 pa-0" style="font-size:16px;font-weight:600">
              {{
                product.vendor.storeName.charAt(0).toUpperCase() +
                  product.vendor.storeName.slice(1)
              }}
            </p>

            <p class="ma-0 pa-0" style="font-size:13px;font-weight:300">
              169 Followers
            </p>
          </v-col>
          <v-col>
            <v-btn
              class="mx-1 btn"
              color="#09b750"
              rounded
              elevation="0"
              :outlined="!following"
              :dark="following"
              @click="following = !following"
              small
              >{{ following ? "Following" : "+ Follow" }}</v-btn
            >
            <v-btn
              class="mx-1 btn"
              dark
              color="#09b750"
              elevation="0"
              rounded
              small
              >Visit Store</v-btn
            >
          </v-col>
        </v-row>
      </div>
      <v-divider></v-divider>
      <div class="mx-5 my-2 text-start">
        <p>Recommended Items</p>
        <v-row class="mx-0">
          <v-col
            cols="6"
            class="pa-0 ma-0"
            v-for="(prod, i) in relatedProducts"
            :key="i"
          >
            <div v-if="prod.productimageSet.length > 0">
              <v-card :href="`/ProductDetails/${prod.id}`" class="mr-1">
                <v-img
                  :src="
                    prod.productimageSet[0].image[0] == 'h'
                      ? prod.productimageSet[0].image
                      : `http://api.ashewa.com/media/${prod.productimageSet[0].image}`
                  "
                  aspect-ratio="1"
                ></v-img>
              </v-card>
            </div>
            <div v-else>
              <v-card :href="`/ProductDetails/${prod.id}`" class="mr-1">
                <v-img :src="prod.image" aspect-ratio="1"></v-img>
              </v-card>
            </div>
            <div class="my-3 text-center">
              <h4>ETB {{ prod.sellingPrice }}</h4>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-divider class="my-3"> </v-divider>
      <div class="mx-5 my-2 text-start">
        <p class="mb-5">More Items</p>
        <v-row class="mx-0">
          <v-col
            cols="6"
            class="pa-0 ma-0 mb-3"
            v-for="(prod, i) in products"
            :key="i"
          >
            <div v-if="prod.productimageSet.length > 0">
              <v-card :href="`/ProductDetails/${prod.id}`" class="mr-1">
                <v-img
                  :src="
                    prod.productimageSet[0].image[0] == 'h'
                      ? prod.productimageSet[0].image
                      : `http://api.ashewa.com/media/${prod.productimageSet[0].image}`
                  "
                  aspect-ratio="1"
                ></v-img>
              </v-card>
            </div>
            <div v-else>
              <v-card class="mr-1">
                <v-img
                  :src="
                    prod.image[0] == 'h'
                      ? prod.image
                      : `http://api.ashewa.com/media/${prod.image}`
                  "
                  aspect-ratio="1"
                ></v-img>
              </v-card>
            </div>
            <div class="my-1 text-center">
              <h4>ETB {{ prod.sellingPrice }}</h4>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      index: 0,
      i: 0,
      following: false,
      model: 0,
      sheetB: false,
      items: ["Overview", "Customer Reviews", "Specification"],
      colors: [
        {
          name: "red",
          image:
            "https://media.istockphoto.com/photos/fashion-portrait-of-beautiful-woman-in-waving-red-dress-light-fabric-picture-id1154030121?k=6&m=1154030121&s=612x612&w=0&h=TTAt16gG8IsbHvxM5OyWxQn2ZxcArckKvNV2ys4_Jl8=",
          sizes: [
            {
              name: "Sm",
              quantity: "1",
            },
            {
              name: "Md",
              quantity: "1",
            },
            {
              name: "Lg",
              quantity: "1",
            },
            {
              name: "Xl",
              quantity: "1",
            },
          ],
        },
        {
          name: "Black",
          image:
            "https://stylesatlife.com/wp-content/uploads/2018/03/Scalloped-neck-dress.jpg.webp",
          sizes: [
            {
              name: "Sm",
              quantity: "1",
            },
            {
              name: "Md",
              quantity: "1",
            },
            {
              name: "Lg",
              quantity: "1",
            },
            {
              name: "Xl",
              quantity: "1",
            },
          ],
        },
      ],
      prices: [
        {
          name: "> 5",
          calories: "10%",
        },
        {
          name: "> 10",
          calories: "15%",
        },
        {
          name: "> 20",
          calories: "20%",
        },
      ],
      desserts: [
        {
          name: "Brand Name",
          calories: "KevinSmithGender",
        },
        {
          name: "MENOrigin",
          calories: "CN(Origin)",
        },
        {
          name: "Athletic Shoe Typ",
          calories: "Basketball",
        },
        {
          name: "ShoesShoe Widt",
          calories: "Medium(B, M)",
        },
      ],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tab: null,
      sheet: false,
      rating: 4.5,
      quantity: 1,
      zoomerOptions: {
        zoomFactor: 3,
        pane: "pane",
        hoverDelay: 300,
        namespace: "zoomer-bottom",
        move_by_click: false,
        scroll_items: 4,
        choosed_thumb_border_color: "#dd2c00",
        scroller_position: "bottom",
        zoomer_pane_position: "right",
      },
    };
  },
  created() {
    this.getProduct();
    this.getRelatedProduct();
  },
  computed: {
    ...mapGetters(["isTokenSet"]),
    product() {
      return this.$store.getters.productFound;
    },
    relatedProducts() {
      return this.$store.state.product.relatedProducts;
    },
    route() {
      return { path: this.$route.path, name: this.$route.name };
    },
    products() {
      return this.$store.getters.products;
    },
    categories() {
      return this.$store.getters.categories;
    },
    totalCartList() {
      switch (this.$store.getters.totalCartList.length) {
        case 0:
          return [];
        default:
          return this.$store.getters.totalCartList;
      }
    },
    active: {
      // getter

      get: function() {
        if (this.product) {
          return {
            id: 0,
            url_normal: `http://188.166.153.99/media/${this.product.productimageSet[0].image}`,
            url_zoom: `http://188.166.153.99/media/${this.product.productimageSet[0].image}`,
          };
        } else {
          return {};
        }
      },
      // setter
    },
  },
  components: {},
  methods: {
    increment() {
      this.quantity = parseInt(this.quantity, 10) + 1;
      console.log(this.$vuetify.breakpoint.name);
    },
    chat(data) {
      if (!this.$store.state.auth.isTokenSet) {
        this.$router.push({ path: "/login" });
      } else {
        this.$store.commit("CREATE_A_MESSAGE", {
          participants: [
            {
              name: data.vendorName,
              id: 1,
              profilePicture: "",
            },
          ],
          myself: {
            name: this.$store.state.auth.user.userName,
            id: this.$store.state.auth.user.id,
            profilePicture: "",
          },
        });

        this.$router.push({ path: `/messages/${1}` });
      }
    },
    inquire(data) {
      if (!this.$store.state.auth.isTokenSet) {
        this.$router.push({ path: "/login" });
      } else {
        this.$store.commit("INQUIRE_A_MESSAGE", {
          participants: [
            {
              name: data.vendorName,
              id: 1,
              profilePicture: "",
            },
          ],
          myself: {
            name: this.$store.state.auth.user.userName,
            id: this.$store.state.auth.user.id,
            profilePicture: "",
          },
          messageContent: [
            {
              content: "I would like to inquire about the above product",
              myself: true,
              timestamp: {
                year: 2021,
                month: 3,
                day: 5,
                hour: 10,
                minute: 10,
                second: 3,
                millisecond: 123,
              },
              uploaded: true,
              viewed: true,
              type: "text",
            },
          ],
        });
        this.$router.push({ path: `/messages/${1}` });
      }
    },
    async getProduct() {
      this.$store.dispatch("getAProduct", { id: this.$route.params.id });
    },
    async getRelatedProduct() {
      this.$store.dispatch("getRelatedProduct", { id: this.$route.params.id });
    },
    addToCart(product) {
      if (!this.$store.state.auth.isTokenSet) {
        this.$router.push({ path: "/login" });
      } else {
        console.log(this.totalCartList);
        if (this.totalCartList.find((p) => p.productId == product.id)) {
          console.log("here");
          var foundIndex = this.totalCartList.findIndex(
            (x) => x.productId == product.id
          );
          this.$store.commit("INCREMENT_QUANTITY_CART", foundIndex);
        } else {
          this.$store.commit("ADD_PRODUCT_TO_CART_LIST", product);
        }
      }
      this.$router.push({ path: "/cart" });
    },
    addToBag(product) {
      if (!this.$store.state.auth.isTokenSet) {
        this.$router.push({ path: "/login" });
      } else {
        console.log(this.totalCartList);
        if (this.totalCartList.find((p) => p.productId == product.id)) {
          console.log("here");
          var foundIndex = this.totalCartList.findIndex(
            (x) => x.productId == product.id
          );
          this.$store.commit("INCREMENT_QUANTITY_CART", foundIndex);
        } else {
          this.$store.commit("ADD_PRODUCT_TO_CART_LIST", product);
        }
      }
      this.$router.push({ path: "/cart" });
    },
    decrement() {
      this.quantity =
        this.quantity > 1 ? parseInt(this.quantity, 10) - 1 : this.quantity;
    },
    toggle(n) {
      this.index = n;
      console.log(this.index);
    },
  },
};
</script>

<style scoped>
.call {
  text-transform: none;
  position: absolute;
  left: 0;
  bottom: 150px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
.v-bottom-navigation {
  justify-content: start;
  overflow-x: scroll;
}

.toolbar {
  scrollbar-width: none;
}

.btn {
  text-transform: none;
}

.case {
  text-transform: none;
}

.favorite {
  cursor: pointer;
}

/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #bbc4bdb4 !important;
}

a {
  height: 100%;
  text-decoration: none;
}
</style>
