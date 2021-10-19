<template>
  <div>
    <v-footer
      style="z-index:1000"
      class="hidden-lg-and-up pa-4"
      height="70"
      fixed
    >
      <div
        @click="
          $router.push({
            path: '/messages/{1}',
          })
        "
        style="margin:auto auto"
      >
        <v-icon
          :color="route.path == '/messages/{1}' ? '#43DB80' : '#383737'"
          style="font-size:32px "
          large
          >mdi-chat-outline</v-icon
        >
      </div>
      <div
        @click="
          inquire({
            vendorName: product.vendor.storeName,
            image:
              product.productimageSet[index].image[0] == 'h'
                ? product.productimageSet[index].image
                : `http://api.ashewa.com/media/${product.productimageSet[index].image}`,

            id: product.vendor.id,
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
      <div style="width:80%;height:100%;">
        <v-btn
          class="rounded-l"
          outlined
          style="text-transform: none;color:#0ea54b;font-weight:700"
          color="#e8ffe8"
          elevation="0"
          height="100%"
          width="45%"
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
          >Add to Zembil</v-btn
        >
        <v-btn
          style="text-transform: none;color:white;font-weight:700;margin-left:10px;"
          tile
          class="rounded-l"
          color="#0ea54b"
          elevation="0"
          height="100%"
          width="45%"
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
                  :value="averageRating"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  dense
                  readonly
                  half-increments
                  hover
                  size="18"
                ></v-rating>
                <span class="caption ml-2 mt-1"
                  >({{ product.productrateSet.length }} review)</span
                >
              </v-row>
              <v-divider></v-divider>

              <v-row class="mt-3 ml-2">
                <p
                  v-html="!!product ? product.description : ''"
                  class="text-caption text-start"
                ></p>
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
                    :href="
                      product.vendor.domain
                        ? `${product.vendor.domain}`
                        : `${product.supplierDomain}`
                    "
                    >Visit Store</v-btn
                  >
                </v-col>
              </v-row>
              <v-divider class="my-6"></v-divider>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-card-title>Price per Quantity</v-card-title>
                  <v-card class=" text-start" color="white" flat>
                    <v-simple-table style="border:1px solid black" dense>
                      <template v-slot:default>
                        <tbody>
                          <tr
                            v-for="(item, i) in product.productpriceoptionSet"
                            :key="i"
                          >
                            <td style="background-color:#bbc4bdb4">
                              {{ item.quantity }}
                            </td>
                            <td>{{ item.discount }}</td>
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
                          <tr
                            v-for="item in product.productSpecification"
                            :key="item.name"
                          >
                            <td style="background-color:#bbc4bdb4">
                              {{ item.specificationTitle }}
                            </td>
                            <td>{{ item.specificationDetail }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card></v-col
                >
              </v-row>
              <v-row class="ma-3">
                <p class="ma-0 mb-1" style="font-size:18px;font-weight:600">
                  {{ colors.length }} Colors,
                  {{ colors.length > 0 ? colors[0].productsizeSet.length : 0 }}
                  Size Available
                </p>
              </v-row>
              <v-row class="ma-3">
                <v-slide-group v-model="i" active-class="success">
                  <v-slide-item class="mr-2" v-for="(n, i) in colors" :key="i">
                    <v-card
                      style="border:1px solid grey;padding:2px"
                      width="60"
                      height="60"
                      rounded=""
                      @click="vis = true"
                      ><v-img aspect-ratio="1" :src="n.image"></v-img>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-row>
              <v-dialog
                v-model="vis"
                style="background-color:red"
                :overlay-opacity="0.8"
                width="500"
                transition="dialog-bottom-transition"
              >
                <v-sheet
                  style="overflow-y:scroll;padding-bottom:70px"
                  class="text-start"
                >
                  <v-img
                    class="white--text align-end text-end pb-2"
                    style="margin:auto auto"
                    width="70vw"
                    height="245"
                    :src="colors.length > 0 ? colors[colorI].image : ''"
                  >
                    <div
                      class="mr-2 pa-1"
                      style="display:inline;background-color:grey;border-radius:5px;font-size:12px"
                    >
                      {{ colorI + 1 }}/{{ colors.length }}
                    </div>
                  </v-img>

                  <p
                    class="my-2 text-center"
                    style="font-size:18px;font-weight:700"
                  >
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
                          colorI == i
                            ? 'border:3px solid green;padding:2px'
                            : 'border:1px solid grey;padding:2px'
                        "
                        @click="colorI = i"
                        width="60"
                        height="60"
                        rounded=""
                        ><v-img
                          width="50"
                          height="50"
                          aspect-ratio="1"
                          :src="n.image"
                        ></v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                  <p class="mx-5 mt-5 mb-2">Size</p>
                  <div class="mx-5 mb-2" v-if="colors.length > 0">
                    <v-chip
                      class="mr-2 pa-5"
                      label
                      :style="
                        sizeI == i
                          ? 'border:2px solid green;font-size:18px;font-weight:300'
                          : 'font-size:14px;font-weight:300'
                      "
                      @click="sizeI = i"
                      v-for="(n, i) in colors[0].productsizeSet"
                      :key="i"
                      >{{ n.name }}</v-chip
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
              </v-dialog>
              <v-divider class="my-6"></v-divider>
              <v-row class="ma-0">
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  elevation="0"
                  color="btn"
                  style="background-color:white;color:#09b750;border:1px solid #09b750;"
                  class="btn mr-3"
                  @click="
                    inquire({
                      vendorName: product.vendor.storeName,
                      image:
                        product.productimageSet[index].image[0] == 'h'
                          ? product.productimageSet[index].image
                          : `http://api.ashewa.com/media/${product.productimageSet[index].image}`,
                      id: product.vendor.id,
                    })
                  "
                  >Make Offer</v-btn
                >
                <v-btn elevation="0"
                  color="btn"
                  class="mr-2"
                  style="background-color:white;color:#09b750;border:1px solid #09b750;" :href="product.vendor.phone ?`tel:${product.vendor.phone}` : 'tel:093 252 5252'">Call Now</v-btn>
                <!-- <a href="tel:8665562570">Call Now</a> -->
                <v-btn
                  elevation="0"
                  color="btn"
                  style="background-color:white;color:#09b750;border:1px solid #09b750;"
                  @click="
                    chat({
                      vendorName: product.vendor.storeName,
                      image:
                        product.productimageSet[index].image[0] == 'h'
                          ? product.productimageSet[index].image
                          : `http://api.ashewa.com/media/${product.productimageSet[index].image}`,
                    })
                  "
                  >Chat Now
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
              <v-divider class="my-2"></v-divider>
              <v-row class="ma-0">
                <h3 class="mt-3">
                  Reviews ({{ product.productrateSet.length }} total reviews)
                </h3>
                <div
                  v-for="(rev1, i) in product.productrateSet"
                  :key="i"
                  class="text-start my-5"
                  style="width:600px"
                >
                  <v-avatar class="profile mr-2" color="grey" size="40">
                    <v-img
                      src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                    ></v-img>
                  </v-avatar>
                  {{ rev1.user.username }}
                  <v-row class="ma-0">
                    <v-rating
                      color="green"
                      size="x-small"
                      :value="rev1.rate"
                    ></v-rating>
                    {{ rev1.comment }}
                  </v-row>
                </div>
                <div style="width:100%" class="text-start">
                  <v-rating v-model="rev" size="small"></v-rating>
                  <v-textarea
                    outlined
                    v-model="com"
                    class="ma-0"
                    name="input-7-4"
                    label="Write a Review"
                  ></v-textarea>
                  <v-btn
                    :disabled="com == ''"
                    @click="addCom"
                    class="ma-0 btn"
                    color="#09b750"
                    >Submit</v-btn
                  >
                </div>
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

          <v-col cols="8" style="background-color:white;border-radius:5px">
            <v-row justify="center">
              <v-col cols="8" lg="4" style="" class="text-start">
                <div><h4>Store Categories</h4></div>
                <div><h5>100% Positive Feedback</h5></div>
                <div>
                  <h5>{{ product.vendor.followerSet.length }}</h5>
                </div>
                <div class="mt-5">
                  <v-btn
                    class="mx-1 btn"
                    color="#09b750"
                    rounded
                    elevation="0"
                    :outlined="!following"
                    @click="addFollower"
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
                    :href="
                      product.vendor.domain
                        ? `${product.vendor.domain}`
                        : `${product.supplierDomain}`
                    "
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
              colorI == i
                ? 'border:3px solid green;padding:2px'
                : 'border:1px solid grey;padding:2px'
            "
            @click="colorI = i"
            width="60"
            height="60"
            rounded=""
            ><v-img
              width="50"
              height="50"
              aspect-ratio="1"
              :src="n.image"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
      <p class="mx-5 mt-5 mb-2">Size</p>
      <div class="mx-5 mb-2" v-if="colors.length > 0">
        <v-chip
          class="mr-2 pa-5"
          label
          :style="
            sizeI == i
              ? 'border:2px solid green;font-size:18px;font-weight:300'
              : 'font-size:14px;font-weight:300'
          "
          @click="sizeI = i"
          v-for="(n, i) in colors[0].productsizeSet"
          :key="i"
          >{{ n.name }}</v-chip
        >
      </div>
      <p class="mx-5 mt-5 mb-2">Quantity</p>

      <v-row class="mt-1 mx-1">
        <v-btn :disabled="quantity == 1" icon depressed @click="decrement">
          <v-icon> mdi-minus-circle-outline</v-icon>
        </v-btn>

        <span class="mt-2 mx-1">{{ quantity }}</span>

        <v-btn icon depressed @click="increment">
          <v-icon> mdi-plus-circle-outline </v-icon>
        </v-btn>
      </v-row>
    </v-container>

    <div
      style="padding-bottom:60px"
      v-if="!!product.name"
      class="mb-10 hidden-lg-and-up"
    >
      <v-carousel
        class="align-center text-center"
        height="350px"
        hide-delimiters
        :show-arrows="false"
      >
        <v-carousel-item v-for="(n, i) in product.productimageSet" :key="i">
          <v-img
            class="white--text align-start text-end ma-4 pa-2 rounded-xl"
            width="90vw"
            height="330"
            :src="
              n.image[0] == 'h'
                ? n.image
                : `http://api.ashewa.com/media/${n.image}`
            "
          >
            <v-chip x-small class="ma-1 pa-2" color="white">
              <v-rating
                v-model="averageRating"
                readonly
                background-color="green lighten-3"
                color="#09B750"
                size="17"
              ></v-rating>
            </v-chip>
          </v-img>
        </v-carousel-item>
      </v-carousel>
      <div class="mx-5 text-start">
        <v-row>
          <v-col class="pb-0">
            <v-slide-group v-model="model" class="pt-4">
              <v-slide-item class="mr-5">
                <div>
                  <p
                    class="ma-0"
                    style="font-size:22px;font-weight:900; color: #43DB80"
                  >
                    ETB {{ !!product ? product.sellingPrice : "" }}
                    <sub>.00</sub>
                  </p>
                </div>
              </v-slide-item>
            </v-slide-group>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pr-1 pb-0">
            <v-slide-group v-model="model" class="pt-2">
              <v-slide-item class="mr-5">
                <div>
                  <v-btn class="ma-2" outlined color="#43DB08"
                    ><v-icon>mdi-store-outline</v-icon>
                    visit store
                  </v-btn>
                </div>
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 ">
            <v-slide-group v-model="model">
              <v-slide-item class="mr-5">
                <div>
                  <p
                    class=""
                    style="font-size:30px;font-weight:900; color: #000000"
                  >
                    {{ !!product ? product.name : "" }}
                  </p>
                </div>
              </v-slide-item>
            </v-slide-group>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class=" pl-1 py-0">
            <v-slide-group v-model="model">
              <v-slide-item class="mr-5">
                <div>
                  <div class="text-center">
                    <v-btn rounded color="#43DB80" dark>
                      <v-icon>mdi-account-check-outline</v-icon>
                      Follow
                    </v-btn>
                  </div>
                </div>
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
      </div>
      <!-- <v-divider></v-divider> -->
      <div class="mx-5 my-2">
        <p
          v-html="!!product ? product.description : ''"
          style="font-size:14px;"
          class="text-start"
        ></p>
        <v-row class="mx-1 mt-1">
          <v-rating
            v-model="averageRating"
            color="green darken-3"
            class="text-start"
            background-color="grey darken-1"
            dense
            readonly
            half-increments
            hover
            size="18"
          ></v-rating>
          <p style="font-size:25px;color:grey;" class="ml-1">
            {{ averageRating }}
          </p>
          <p style="font-size:25px;color:grey;" class="ml-1">
            {{ "  | 320 orders" }}
          </p>
        </v-row>
      </div>

      <p class="ma-0 mb-1" style="font-size:14px;font-weight:500">
        {{ colors.length }} Colors,
        {{ colors.length > 0 ? colors[0].productsizeSet.length : 0 }} Size
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
      <div class="mx-5 my-2 text-start">
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

            <v-img
              class="white--text align-end text-end pb-2"
              style="margin:auto auto"
              width="70vw"
              height="245"
              :src="colors.length > 0 ? colors[colorI].image : ''"
            >
              <div
                class="mr-2 pa-1"
                style="display:inline;background-color:grey;border-radius:5px;font-size:12px"
              >
                {{ colorI + 1 }}/{{ colors.length }}
              </div>
            </v-img>

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
                    colorI == i
                      ? 'border:3px solid green;padding:2px'
                      : 'border:1px solid grey;padding:2px'
                  "
                  @click="colorI = i"
                  width="60"
                  height="60"
                  rounded=""
                  ><v-img
                    width="50"
                    height="50"
                    aspect-ratio="1"
                    :src="n.image"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
            <p class="mx-5 mt-5 mb-2">Size</p>
            <div class="mx-5 mb-2" v-if="colors.length > 0">
              <v-chip
                class="mr-2 pa-5"
                label
                :style="
                  sizeI == i
                    ? 'border:2px solid green;font-size:18px;font-weight:300'
                    : 'font-size:14px;font-weight:300'
                "
                @click="sizeI = i"
                v-for="(n, i) in colors[0].productsizeSet"
                :key="i"
                >{{ n.name }}</v-chip
              >
            </div>
            <p class="mx-5 mt-5 mb-2">Quantity</p>

            <v-row class="mt-1 mx-1 mb-5">
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
                <tr
                  v-for="item in product.productSpecification"
                  :key="item.name"
                >
                  <td style="background-color:#bbc4bdb4">
                    {{ item.specificationTitle }}
                  </td>
                  <td>{{ item.specificationDetail }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </div>
      <v-divider></v-divider>
      <div class="mx-5 my-2 text-start">
        <p class="mb-2 ">Item Description</p>
        <v-img width="100%" src=""></v-img>
      </div>
      <v-divider></v-divider>
      <div class="mx-5 my-2 text-start">
        <h3 class="mt-3 mx-2">
          Reviews ({{ product.productrateSet.length }} total reviews)
        </h3>
        <div
          v-for="(rev, i) in product.productrateSet"
          :key="i"
          class="text-start my-5"
          style="max-width:600px"
        >
          <v-avatar class="profile mr-2" color="grey" size="40">
            <v-img
              src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
            ></v-img>
          </v-avatar>
          {{ rev.user.username }}
          <v-row class="ma-0">
            <v-rating color="green" size="20" :value="rev.rate"></v-rating>
            {{ rev.comment }}
          </v-row>
        </div>
        <h3>Review</h3>
        <v-rating v-model="rev" size="30"></v-rating>
        <v-textarea
          outlined
          v-model="com"
          class="ma-0"
          name="input-7-4"
          label="Write a Review"
        ></v-textarea>
        <v-btn
          :disabled="com == ''"
          @click="addCom"
          class="ma-0 btn"
          color="#09b750"
          >Submit</v-btn
        >
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
              {{ followers }}
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
              class="btn mx-1"
              rounded
              elevation="0"
              color="success"
              :href="`/messages`"
              >Chat Now</v-btn
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
      rev: 0,
      vis: false,
      com: "",
      sizeI: 0,
      colorI: 0,
      model: 0,
      sheetB: false,
      items: ["Overview", "Customer Reviews", "Specification"],

      prices: [],
      desserts: [],
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
    following() {
      if (this.isTokenSet) {
        if (!this.product) {
          return false;
        }
        if (this.product.vendor.followerSet.length === 0) {
          return false;
        }
        return !!this.product.vendor.followerSet.find(
          (x) => x.user.id === this.$store.state.auth.user.id
        );
      }
      return false;
    },
    followers() {
      if (this.following) {
        return 1;
      }
      return 0;
    },
    colors() {
      if (this.product.productcolorSet.length > 0) {
        return this.product.productcolorSet;
      }
      return [];
    },
    product() {
      return this.$store.getters.productFound;
    },
    averageRating() {
      if (this.product.productrateSet.length === 1) {
        return this.product.productrateSet[0].rate;
      }
      if (this.product.productrateSet.length > 0) {
        let average = (arr) =>
          arr.reduce((a, b) => a.rate + b.rate) / arr.length;
        return average([...this.product.productrateSet]);
      }

      return 0;
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
    },
    addCom() {
      console.log({ rate: this.rev, comment: this.com });
      this.$store.dispatch("addReview", {
        rate: this.rev,
        comment: this.com,
        productId: this.product.id,
      });
    },
    addFollower() {
      if (!this.following) {
        this.$store.dispatch("addFollower", {
          id: this.product.vendor.id,
        });
      }
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
              type: "image",
              src: data.image,
            },
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
        this.$store.commit("PUSH_A_MESSAGE", {
          title: data.vendorName,
          last: "I would like to inquire about the above product",
          src: data.image,
          id: data.id,
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
              type: "image",
              src: data.image,
            },
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
          this.$store.dispatch("addToCart", product);
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
          this.$store.dispatch("addToCart", product);
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
