<template>
  <v-container class="mt-2" style="min-height:75vh">
    <v-row class="mt-5" justify="center">
      <v-col cols="12" md="8">
        <v-row justify="end">
          <v-col
            ><h1 class="mx-auto text-h4 mb-4" style="color:#43DB80">
              Shopping Cart
            </h1></v-col
          >
        </v-row>

        <v-data-table :headers="headers" :items="cartItems" :items-per-page="3">
          <template v-slot:[`item.image`]="{ item }">
            <v-img
              height="100"
              width="100"
              :lazy-src="
                item.image[0] == 'h'
                  ? item.image
                  : `http://api.ashewa.com/media/${item.image}`
              "
              :src="
                item.image[0] == 'h'
                  ? item.image
                  : `http://api.ashewa.com/media/${item.image}`
              "
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row> </template
            ></v-img>
          </template>
          <template v-slot:[`item.quantity`]="{ item }">
            <v-card
              style="background:transparent"
              tile
              class="py-3 text-center"
              elevation="0"
            >
              <!-- <v-btn @click="inc(item.productId)" x-small text
                ><v-icon>mdi-arrow-up</v-icon></v-btn
              > -->
              <v-text-field
                v-model="item.quantity"
                label="Quantity"
                type="number"
                @change="updateCart({ id: item.id, quantity: item.quantity })"
                class="mx-auto"
                style="width:50px"
              ></v-text-field>
              <!-- <v-chip label color="green" dark>{{ item.quantity }}</v-chip> -->

              <!-- <v-btn @click="dec(item.productId)" x-small text
                ><v-icon>mdi-arrow-down</v-icon></v-btn
              > -->
            </v-card>
          </template>
          <template v-slot:[`item.price`]="{ item }">
            <p>
              {{ `${item.quantity * item.price} ETB` }}
            </p>
          </template>
          <template v-slot:[`item.usdPrice`]="{ item }">
            <p>
              {{ `$ ${item.quantity * item.usdPrice.toFixed(1)}` }}
            </p>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-btn @click="removeProduct(item.id)" small color="error">
              <v-icon left dark>
                mdi-trash-can-outline
              </v-icon>
              {{ item.action }}Remove
            </v-btn>
          </template>
        </v-data-table>
      </v-col>

      <!-- <v-col cols="12" md="4">
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-row justify="center" class="my-2">
            <v-col cols="10" class="grey lighten-2">
              <v-row justify="space-between" class="ma-4">
                <span>Total items</span>
                <span>{{ totalCartList.length }}</span>
              </v-row>
              <v-divider></v-divider>
              <v-row justify="space-between" class="ma-4">
                <span>tax</span>
                <span>{{ (total * 0.15).toFixed(2) }}</span>
              </v-row>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-row justify="space-between" class="ma-4">
                <h3>Total</h3>
                <h3 class="red--text">
                  {{ (total + total * 0.15).toFixed(2) }} ETB
                </h3>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mb-14" justify="center">
            <v-col cols="10" class="px-0">
              <v-btn
                width="100%"
                height="50"
                class="btn"
                depressed
                color="#09b750"
                dark
                @click="vis = true"
              >
                Proceed to checkout
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-col> -->
    </v-row>
    <v-row class="mt-10" justify="center">
      <v-col cols="2" class="px-0 mr-2">
        <v-btn
          width="100%"
          height="50"
          class="btn"
          depressed
          outlined
          color="#09b750"
          dark
          @click="
            $router.push({
              path: `/`,
            })
          "
        >
          <v-icon large left>mdi-store</v-icon>
          Back to Shop
        </v-btn>
      </v-col>

      <v-col cols="3" class="px-0">
        <v-btn
          width="100%"
          height="50"
          class="btn"
          depressed
          color="#09b750"
          dark
          @click="vis = true"
        >
          <v-icon large left>mdi-shopping</v-icon>
          Proceed to checkout
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="vis">
      <div style="background-color:white">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <v-row class="ma-0 pa-2">
              <v-col cols="12" md="4">
                <h2 class="text-start">Billing Details</h2>
                <v-divider class="mb-5"></v-divider>
                <v-row>
                  <v-col>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <v-text-field
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        v-model="firstName"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                        autocomplete="off"
                        outlined
                        dense
                        color="#4DBA87"
                        prepend-inner-icon="mdi-account-circle-outline"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <v-text-field
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        v-model="lastName"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                        autocomplete="off"
                        outlined
                        dense
                        color="#4DBA87"
                        prepend-inner-icon="mdi-account-circle-outline"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <v-text-field
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    v-model="email"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    color="#4DBA87"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </ValidationProvider>

                <VuePhoneNumberInput
                  default-country-code="ET"
                  v-model="yourValue"
                  :error="error"
                  class="mb-6"
                />
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-autocomplete
                    id="country"
                    name="country"
                    label="Country"
                    :items="countryList"
                    v-model="country"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                    outlined
                    dense
                    color="#4DBA87"
                    prepend-inner-icon="mdi-earth"
                  ></v-autocomplete>
                </ValidationProvider>
                <v-row>
                  <v-col>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <v-text-field
                        id="region"
                        name="region"
                        label="Region"
                        v-model="region"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                        autocomplete="off"
                        outlined
                        dense
                        color="#4DBA87"
                        prepend-inner-icon="mdi-home-city-outline"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <v-text-field
                        id="wereda"
                        name="wereda"
                        label="Wereda"
                        v-model="wereda"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                        autocomplete="off"
                        outlined
                        dense
                        color="#4DBA87"
                        prepend-inner-icon="mdi-home-circle-outline"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <h2 class="text-start">Order Review</h2>
                <v-divider class="mb-5"></v-divider>

                <div class="text-start">Products</div>
                <v-divider class="mb-2"></v-divider>

                <v-row
                  class="ma-0  pa-0"
                  style="width:100%"
                  v-for="item in totalCartList"
                  :key="item.id"
                >
                  <v-col class="text-start ma-0 pa-0" cols="12" sm="6">
                    <div>
                      <span>{{ item.product.name }} </span>
                      <span>x</span>
                      <span> {{ item.quantity }}</span>
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="text-end ma-0 pa-0" cols="12" sm="6">
                    <div>
                      <span v-if="currency === 'ETB'" class="subheading"
                        >{{ item.quantity * item.product.sellingPrice }}
                      </span>
                      <span v-else class="subheading"
                        >{{ item.quantity * item.product.usdPrice.toFixed(1) }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
                <v-divider class="mt-8"></v-divider>
                <p
                  v-if="!validated"
                  class="text-start"
                  style="color:red;font-size:12px"
                >
                  *Please feel all the required fields and pick a delivery
                  method in billing details to see your order review
                </p>
                <v-row style="width:100%" class="ma-0 my-2 pa-0">
                  <v-col class="text-start ma-0 pa-0" cols="12" sm="6">
                    <div>
                      Delivery
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class=" text-end ma-0 pa-0" cols="12" sm="6">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <v-select
                        @change="handleDeliveryMethod($event)"
                        id="delivery"
                        name="delivery"
                        label="Delivery Method"
                        item-value="value"
                        item-text="text"
                        :items="deliveryTypes"
                        v-model="delivery"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                        autocomplete="off"
                        outlined
                        dense
                        color="#4DBA87"
                        prepend-inner-icon="mdi-moped"
                      ></v-select>
                    </ValidationProvider>
                    <div>
                      <span v-if="currency === 'ETB'" class="subheading"
                        >Delivery fee: {{ calCart ? calCart.deliveryFee : "" }}
                      </span>
                      <span v-else class="subheading"
                        >Delivery fee:
                        {{ calCart ? calCart.deliveryFeeUsd.toFixed(1) : "" }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row style="width:100%" class="ma-0  pa-0">
                  <v-col class="text-start ma-0 pa-0" cols="12" sm="6">
                    <div>
                      Sub-total
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class=" text-end ma-0 pa-0" cols="12" sm="6">
                    <div>
                      <span v-if="currency === 'ETB'" class="subheading"
                        >{{ calCart ? calCart.subTotal : "" }}
                      </span>
                      <span v-else class="subheading"
                        >{{ calCart ? calCart.subTotalUsd.toFixed(1) : "" }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
                <v-row style="width:100%" class="ma-0  pa-0">
                  <v-col class="text-start ma-0 pa-0" cols="12" sm="6">
                    <div>
                      Tax
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class=" text-end ma-0 pa-0" cols="12" sm="6">
                    <div>
                      <span v-if="currency === 'ETB'" class="subheading"
                        >{{ calCart ? calCart.tax : "" }}
                      </span>
                      <span v-else class="subheading"
                        >{{ calCart ? calCart.taxUsd : "" }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row style="width:100%" class="ma-0  pa-0">
                  <v-col class="text-start ma-0 pa-0" cols="12" sm="6">
                    <div class="text-start"><strong>Total</strong></div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class=" text-end ma-0 pa-0" cols="12" sm="6">
                    <div>
                      <div v-if="currency === 'ETB'" class="text-end">
                        <strong>{{ calCart ? calCart.totalPrice : "" }}</strong>
                      </div>
                      <div v-else class="text-end">
                        <strong>{{
                          calCart ? calCart.totalPriceUsd : ""
                        }}</strong>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <h2 class="text-start">Payment Methods</h2>
                <v-divider class="mb-5"></v-divider>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-radio-group
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    v-model="payment"
                  >
                    <template v-slot:label>
                      <div>Please select a <strong>payment method</strong></div>
                    </template>
                    <!-- <v-radio value="PayPal">
                      <template v-slot:label>
                        <v-row align="center">
                          <v-col md="2">
                            <div>PayPal</div>
                          </v-col>
                          <v-col>
                            <v-img
                              src="https://1000logos.net/wp-content/uploads/2021/04/Paypal-logo.png"
                              height="30"
                              width="100"
                            ></v-img>
                          </v-col>
                        </v-row>
                      </template>
                    </v-radio> -->

                    <v-radio value="Visa">
                      <template v-slot:label>
                        <v-row align="center">
                          <v-col md="1">
                            <div>Visa</div>
                          </v-col>
                          <v-col>
                            <v-img
                              src="https://www.pikpng.com/pngl/m/80-809937_visa-png-transparent-background-visa-logo-clipart.png"
                              height="30"
                              width="100"
                            ></v-img>
                          </v-col>
                        </v-row>
                      </template>
                    </v-radio>
                    <v-radio value="MasterCard">
                      <template v-slot:label>
                        <v-row align="center">
                          <v-col md="3">
                            <div>MasterCard</div>
                          </v-col>
                          <v-col>
                            <v-img
                              src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_hrz_pos_300px_2x.png"
                              height="40"
                              width="140"
                            ></v-img>
                          </v-col>
                        </v-row>
                      </template>
                    </v-radio>
                    <v-radio value="Telebirr">
                      <template v-slot:label>
                        <v-row align="center">
                          <v-col md="2">
                            <div>telebirr</div>
                          </v-col>
                          <v-col>
                            <v-img
                              src="telebirr.png"
                              height="30"
                              width="100"
                            ></v-img>
                          </v-col>
                        </v-row>
                      </template>
                    </v-radio>
                    <v-radio value="Hello Cash">
                      <template v-slot:label>
                        <v-row align="center">
                          <v-col md="4">
                            <div>Hello Cash</div>
                          </v-col>
                          <v-col>
                            <v-img
                              src="hellocash.png"
                              height="30"
                              width="100"
                            ></v-img>
                          </v-col>
                        </v-row>
                      </template>
                    </v-radio>
                    <!-- <v-radio value="Mbirr">
                      <template v-slot:label>
                        <v-row align="center">
                          <v-col md="2">
                            <div>Mbirr</div>
                          </v-col>
                          <v-col>
                            <v-img
                              src="mbirr.png"
                              height="30"
                              width="100"
                            ></v-img>
                          </v-col>
                        </v-row>
                      </template>
                    </v-radio> -->
                    <v-radio value="Bank Payment">
                      <template v-slot:label>
                        <div>Bank Payment</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row justify="center" class="ma-0 mb-5" style="width:100%">
              <v-col cols="auto">
                <SubmitButton
                  buttonText="Continue"
                  color="#4DBA87"
                  class="white--text"
                  :disabled="error"
                />
              </v-col>
            </v-row>
          </form>
        </ValidationObserver>
      </div>
    </v-dialog>
    <v-dialog
      persistent
      v-model="success"
      style="background-color:red"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-5">
        <h3>Delivery Information</h3>
        <!-- <p>Name:{{ deliveryData }}</p> -->
        <!-- <p>Total Distance:{{ deliveryInformation.totalDistance }}</p>
        <p>Estimated Time:{{ deliveryInformation.esT }}</p>
        <p>Delivery Price:{{ deliveryInformation.deliveryPrice }}</p> -->
        {{
          payment === "BOA"
            ? ""
            : payment === "Hello Cash"
            ? "Dear customer, in order to proceed with your payment, please dial *912*4# and follow the instruction on your mobile phone to pay the invoice."
            : payment === "Mbirr"
            ? `Dear customer, in order to proceed with your payment, dial *818# then select 7(other) from the menu and then select 5(pay bill) and then enter ashewa's account number after that the enter this reference number ${text.m} and confirm your transaction, payment amount, your pin respectively.`
            : payment === "Bank Payment"
            ? "Thank you for your Payment, we will be cheaking your payment soon!"
            : ""
        }}
        <h2>
          {{
            payment === "Hello Cash"
              ? `Delivery Reference Number : ${text}`
              : `Delivery Reference Number : ${text.a}`
          }}
        </h2>
        <h3 v-if="payment === 'BOA'">
          Dear customer, in order to proceed with your payment, press continue
          and you will be redirected to official BOA billing page
        </h3>
        <h3 v-if="payment === 'Telebirr'">
          Dear customer, in order to proceed with your payment, press continue
          and you will be redirected to official Telebirr billing page
        </h3>
        <h3 v-if="payment === 'PayPal'">
          Dear customer, in order to proceed with your payment, press continue
          and you will be redirected to official PayPal billing page
        </h3>
        <form
          v-if="payment === 'BOA'"
          action="https://secureacceptance.cybersource.com/pay"
          method="post"
        >
          <input
            type="hidden"
            name="access_key"
            v-model="JSON.parse(text.m).access_key"
          />
          <input
            type="hidden"
            name="profile_id"
            v-model="JSON.parse(text.m).profile_id"
          />
          <input
            type="hidden"
            name="transaction_uuid"
            v-model="JSON.parse(text.m).transaction_uuid"
          />
          <input
            type="hidden"
            name="signed_field_names"
            v-model="JSON.parse(text.m).signed_field_names"
          />
          <input
            type="hidden"
            name="unsigned_field_names"
            v-model="JSON.parse(text.m).unsigned_field_names"
          />
          <input
            type="hidden"
            name="signed_date_time"
            v-model="JSON.parse(text.m).signed_date_time"
          />
          <input
            type="hidden"
            name="locale"
            v-model="JSON.parse(text.m).locale"
          />
          <input
            type="hidden"
            name="transaction_type"
            v-model="JSON.parse(text.m).transaction_type"
          />
          <input
            type="hidden"
            name="reference_number"
            v-model="JSON.parse(text.m).reference_number"
          />
          <input
            type="hidden"
            name="amount"
            v-model="JSON.parse(text.m).amount"
          />
          <input
            type="hidden"
            name="currency"
            v-model="JSON.parse(text.m).currency"
          />
          <input
            type="hidden"
            name="signature"
            v-model="JSON.parse(text.m).signature"
          />

          <v-row v-if="payment === 'BOA'">
            <v-col>
              <v-btn
                class="btn btn-danger float-right"
                color="#09b750"
                dark
                type="submit"
                id="submit"
                name="submit"
                value="Submit"
              >
                Continue
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                @click="clearSuccess"
                color="error"
                type="button"
                class="btn btn-danger mx-4"
              >
                Close
              </v-btn>
            </v-col>
          </v-row>
        </form>

        <v-row v-if="payment === 'Telebirr'">
          <v-col>
            <v-btn
              class="btn btn-danger float-right"
              color="#09b750"
              dark
              :href="text.m"
            >
              Continue
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              @click="clearSuccess"
              color="error"
              type="button"
              class="btn btn-danger mx-4"
            >
              Close
            </v-btn>
          </v-col>
        </v-row>

        <v-row v-if="payment === 'PayPal'">
          <v-col>
            <v-btn
              class="btn btn-danger float-right"
              color="#09b750"
              dark
              :href="text.m"
            >
              Continue
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              @click="clearSuccess"
              color="error"
              type="button"
              class="btn btn-danger mx-4"
            >
              Close
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          v-if="
            payment != 'BOA' && payment != 'Telebirr' && payment != 'PayPal'
          "
          justify="end"
        >
          <v-col cols="4">
            <v-btn class="pa-5 my-5" color="success" @click="clearSuccess">
              Finish
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      persistent
      v-model="visF"
      style="background-color:red"
      :overlay-opacity="0.8"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-5">
        <h2 class="text-center mb-2">Billing Information</h2>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Dropoff Location
        </p>
        <v-row class="ma-0">
          <v-col class="ma-0 pa-0" cols="12" md="7">
            <v-text-field
              background-color="#ebe9e9"
              class="ma-0"
              height="50"
              solo
              flat
              placeholder="Enter your address"
              v-model="address"
              disabled
            >
            </v-text-field
          ></v-col>
          <v-col class="ma-0 pa-0" cols="12" md="5">
            <v-btn
              :loading="loading"
              class="ml-3 mt-1"
              style="font-size:12px;text-transform:none"
              large
              dark
              @click="locatorButtonPressed"
            >
              <v-icon class="mr-2"> mdi-map-marker</v-icon>
              Current location
            </v-btn>
          </v-col>
        </v-row>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Phone Number
        </p>
        <v-text-field
          background-color="#ebe9e9"
          class="ma-0"
          height="50"
          solo
          flat
          placeholder="Phone Number"
          v-model="phone"
        >
        </v-text-field>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Full Name
        </p>
        <v-text-field
          background-color="#ebe9e9"
          class="ma-0"
          height="50"
          solo
          flat
          placeholder="Full Name"
          v-model="fname"
        >
        </v-text-field>
        <v-row justify="center">
          <v-btn
            @click="billing"
            class="mx-5"
            style="text-transform:none"
            :disabled="!address || !fname || !phone"
            color="#43DB80"
            >Proceed</v-btn
          >
          <v-btn
            @click="visF = false"
            class="mx-5"
            style="text-transform:none"
            color="error"
            >Close</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      persistent
      v-model="check"
      style="background-color:red"
      :overlay-opacity="0.8"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-5">
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Address
        </p>
        <v-row class="ma-0">
          <v-col class="ma-0 pa-0" cols="12" md="3">
            <v-text-field
              background-color="#ebe9e9"
              class="ma-0"
              height="50"
              solo
              flat
              placeholder="Country"
              v-model="country"
            >
            </v-text-field
          ></v-col>
          <v-spacer></v-spacer>
          <v-col class="ma-0 pa-0" cols="12" md="3">
            <v-text-field
              background-color="#ebe9e9"
              class="ma-0"
              height="50"
              solo
              flat
              placeholder="Region"
              v-model="region"
            >
            </v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="ma-0 pa-0" cols="12" md="3">
            <v-text-field
              background-color="#ebe9e9"
              class="ma-0"
              height="50"
              solo
              flat
              placeholder="Wereda"
              v-model="wereda"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Email
        </p>
        <v-text-field
          background-color="#ebe9e9"
          class="ma-0"
          height="50"
          type="email"
          solo
          flat
          placeholder="Enter your email address"
          v-model="email"
        >
        </v-text-field>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Phone Number
        </p>
        <v-text-field
          background-color="#ebe9e9"
          class="ma-0"
          height="50"
          solo
          flat
          placeholder="Phone Number"
          v-model="phone"
        >
        </v-text-field>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Full Name
        </p>
        <v-text-field
          background-color="#ebe9e9"
          class="ma-0"
          height="50"
          solo
          flat
          placeholder="Full Name"
          v-model="fname"
        >
        </v-text-field>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Total Price
        </p>
        <div
          background-color="#ebe9e9"
          style="background-color:#ebe9e9;height:50px;width:200px"
          class="pa-3 mb-3"
          solo
          flat
        >
          <p class="text-subtitle-1  subTitle">{{ total }} birr</p>
        </div>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Delivery Option
        </p>
        <v-select
          background-color="#ebe9e9"
          class="mb-0"
          height="50"
          solo
          flat
          placeholder="Please select a delivery option"
          :items="['bus', 'motor-cycle', 'self-pick', 'plane']"
          v-model="delivery"
        ></v-select>
        <p class="text-subtitle-1 font-weight-bold mb-2 subTitle">
          Payment Method
        </p>
        <v-select
          background-color="#ebe9e9"
          class="mb-0"
          height="50"
          solo
          flat
          placeholder="Please select a payment method"
          :items="[
            'PayPal',
            'Visa',
            'MasterCard',
            'Hello Cash',
            'Mbirr',
            'Bank Payment',
            'Telebirr',
          ]"
          v-model="payment"
        ></v-select>
        <v-row justify="center">
          <v-btn
            @click="checkout"
            class="mx-5"
            style="text-transform:none"
            :disabled="
              !delivery ||
                !fname ||
                !phone ||
                !country ||
                !region ||
                !wereda ||
                !email
            "
            color="#43DB80"
            >Proceed</v-btn
          >
          <v-btn
            @click="setVisFalse"
            class="mx-5"
            style="text-transform:none"
            color="error"
            >Close</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog v-model="testF" width="500">
      <v-card v-if="payment == 'Bank Payment'" class="pa-5">
        {{
          "Y" +
            "OU ARE ABOUT TO PAY YOUR PAYMENT THROUGH ANY BANK YOU WANT EITHER IN YOUR WALLETS OR MANUALLY IN YOUR NEAREST BANK".toLowerCase()
        }}
        <v-row class="my-5" justify="center">
          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-expansion-panel-header>አቢሲንያ ባንክ </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 53454108</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- <v-expansion-panel>
              <v-expansion-panel-header> ህብረት ባንክ </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 1450111452422028</p>
              </v-expansion-panel-content>
            </v-expansion-panel> -->
            <v-expansion-panel>
              <v-expansion-panel-header> አዋሽ ባንክ</v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 01304451622001</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- <v-expansion-panel>
              <v-expansion-panel-header>
                አዲስ ኢንተርናሽናል ባንክ
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 263668</p>
              </v-expansion-panel-content>
            </v-expansion-panel> -->
            <v-expansion-panel>
              <v-expansion-panel-header>
                የኢትዮጵያ ንግድ ባንክ
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 1000388040606</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- <v-expansion-panel>
              <v-expansion-panel-header> ብርሃን ባንክ </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 2600110019980</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                የኦሮሚያ ህብረት ስራ ባንክ
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 1000090484471</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                ኦሮሚያ ኢንተርናሽናል ባንክ
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 1393007900001</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                ዳሽን ባንክ
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 5090220264021</p>
              </v-expansion-panel-content>
            </v-expansion-panel> -->
            <v-expansion-panel>
              <v-expansion-panel-header>
                ዘመን ባንክ
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 1455111090174017</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- <v-expansion-panel>
              <v-expansion-panel-header>
                አባይ ባንክ
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Account Number: 1422117542275013</p>
              </v-expansion-panel-content>
            </v-expansion-panel> -->
          </v-expansion-panels>
        </v-row>
        <v-btn @click="t = true" dark color="#07a04b">Order</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="t" width="600">
      <v-card class="px-5 pb-5" color="basil">
        <v-card-title class="text-center justify-center py-6">
          <v-avatar v-if="tab === 0" height="100px" width="200px">
            <img
              src="Commercial- Bank- of- Ethiopia5c026f2aabb8f.png"
              alt="logo"
            />
          </v-avatar>
          <v-avatar v-else-if="tab === 1" height="100px" width="200px">
            <v-img src="BOA.png"> </v-img>
          </v-avatar>
          <v-avatar v-else-if="tab === 2" height="100px" width="200px">
            <v-img src="Awash.png"> </v-img>
          </v-avatar>
          <v-avatar v-else-if="tab === 3" height="100px" width="200px">
            <v-img src="Zemen.png"> </v-img>
          </v-avatar>
        </v-card-title>
        <p class="text-center">
          {{
            "T" +
              "HIS FORM MUST BE FILLED AFTER YOU PAY FOR YOUR ORDER".toLowerCase()
          }}
        </p>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card class="pa-5">
              <v-text-field
                background-color="#ebe9e9"
                class="ma-0"
                height="50"
                solo
                flat
                placeholder="Deposited by"
                v-model="userB"
              >
              </v-text-field>

              <!-- <v-text-field
                background-color="#ebe9e9"
                class="ma-0"
                height="50"
                solo
                flat
                placeholder="Transaction Id"
                v-model="transactionId"
              >
              </v-text-field> -->
              <v-text-field
                background-color="#ebe9e9"
                class="ma-0"
                height="50"
                solo
                flat
                placeholder="Reference"
                v-model="reference"
              >
              </v-text-field>
              <v-btn @click="finalizeCheckout" dark color="#07a04b"
                >Proceed</v-btn
              >
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
    <ErrorMessage />
  </v-container>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isMobile: false,
      check: false,
      tab: null,
      items: ["የኢትዮጵያ ንግድ ባንክ", "አቢሲንያ ባንክ", "አዋሽ ባንክ", "ዘመን ባንክ"],
      chek: false,
      vis: false,
      test: true,
      testF: false,
      visF: false,
      loading: false,
      transactionId: "",
      fname: "",
      country: "Ethiopia",
      firstNameProxy: "null",
      lastNameProxy: "null",
      emailProxy: "null",
      yourValueProxy: "-1",
      delivery: "",
      region: "",
      wereda: "",
      countryList: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands",
      ],
      phone: "",
      payment: "",
      userB: "",
      reference: "",
      transaction: "",
      t: false,
      key: "AIzaSyCVZffDCQLlsX9vz9TGBg0h8aZkG5eIUoY",
      address: "",
    };
  },
  created() {
    if (!this.$store.state.auth.isTokenSet) {
      router.push({ path: "/login" });
    } else {
      if (this.$store.getters.totalCartList.length == 0) {
        this.$store.dispatch("getCartList");
      }
      this.$store.dispatch("getDeliveryTypes");
    }
  },
  methods: {
    updateCart(item) {
      this.cartItems = [];
      this.$store.dispatch("updateCart", item);
    },
    async submit() {
      if (this.payment == "Bank Payment") {
        this.testF = true;
      } else {
        if (this.payment == "Visa" || this.payment == "MasterCard") {
          this.payment = "BOA";
        }
        this.testF = false;
        this.$store.dispatch("checkout", {
          payment: this.payment,
          fname: `${this.firstName + this.lastName}`,
          address: `${this.country}${this.region}${this.wereda}`,
          phone: this.yourValue.replace(/\s+/g, ""),
          deliveryType: this.delivery,
          country: this.country,
          region: this.region,
          wereda: this.wereda,
          email: this.email,
        });
        this.visF = false;
      }
      //This event signifies that a successfull checkout
      this.$gtag.event("Checkout", {
        event_category: "Checkout",
        event_label: "User Checkout Items",
      });
    },
    handleDeliveryMethod(a) {
      this.delivery = a;
      if (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.yourValue &&
        this.country &&
        this.region &&
        this.wereda &&
        this.delivery
      ) {
        this.$store.dispatch("calculateCart", {
          deliveryType: this.delivery,
          country: this.country,
          region: this.region,
          wereda: this.wereda,
          email: this.email,
          phone: this.yourValue.replace(/\s+/g, ""),
        });
      } else {
        console.log("not all filled");
      }
    },
    deliveryInformation() {
      const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      return {
        ...this.$store.state.cart.deliveryInformation,
        esT: formatDate(
          this.$store.state.cart.deliveryInformation.estimatedTime
        ),
      };
    },
    setVisFalse() {
      // this.$store.commit("SET_VIS_FALSE");
      // console.log("vis false");
      this.vis = false;
    },
    removeProduct(id) {
      console.log(id);
      this.$store.dispatch("removeFromCart", id);
      //This event signifies that a successfull product was removed from cart
      this.$gtag.event("Remove from Cart", {
        event_category: "Product removed from cart",
        event_label: "Product Removed",
      });
    },
    async getDelivery() {
      await this.$store.dispatch("getDelivery");
    },
    clearSuccess() {
      //route to profile page
      this.vis = false;
      router.push({ path: "/profile" });
      this.$store.commit("CLEAR_SUCCESS");
    },
    finalizeCheckout() {
      const ids = [
        {
          id: "f81fa93b-e132-4883-99d0-46d49a0adac1",
          name: "Commericial Bank of Ethio",
          logo: "cbe.jpg",
        },
        {
          id: "637b1df1-5d5f-42e1-814d-a0fbd4a57037",
          name: "Bank of Abyssinia",
          logo: "bank-of-abyssinia-logo-banks-in-ethiopia.jpg",
        },
        {
          id: "8cbdff72-6ce3-4d83-a0f1-33f120684fa6",
          name: "Awash Bank",
          logo: "",
        },
        {
          id: "28769c58-173a-4996-8640-a302e9ae166d",
          name: "Zemen Bank",
          logo: "zemen.jpg",
        },
      ];

      this.$store.dispatch("checkout", {
        payment: this.payment,
        loc: this.address,
        fname: this.fname,
        phone: this.phone,
        deliveryType: this.delivery,
        country: this.country,
        region: this.region,
        wereda: this.wereda,
        email: this.email,
        referenceNumber: this.reference,
        transactionId: this.transactionId,
        depositedBy: this.userB,
        bankId: ids[this.tab].id,
      });
    },
    billing() {
      if (this.payment == "Bank Payment") {
        this.testF = true;
      } else {
        this.testF = false;
        this.$store.dispatch("checkout", {
          loc: this.address,
          fname: this.fname,
          phone: this.phone,
          deliveryType: this.delivery,
          country: this.country,
          region: this.region,
          wereda: this.wereda,
          email: this.email,
        });
        this.visF = false;
      }
    },
    checkout() {
      if (this.payment == "Bank Payment") {
        this.testF = true;
      } else {
        if (this.payment == "Visa" || this.payment == "MasterCard") {
          this.payment = "BOA";
        }
        this.testF = false;
        this.$store.dispatch("checkout", {
          payment: this.payment,
          loc: this.address,
          fname: this.fname,
          phone: this.phone,
          deliveryType: this.delivery,
          country: this.country,
          region: this.region,
          wereda: this.wereda,
          email: this.email,
        });
        this.visF = false;
      }
      //This event signifies that a successfull checkout
      this.$gtag.event("Checkout", {
        event_category: "Checkout",
        event_label: "User Checkout Items",
      });
      console.log({
        deliveryId: this.getId,
        loc: this.address,
        payment: this.payment,
      });
    },
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getStreetAddressFrom(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    async getStreetAddressFrom(lat, long) {
      this.loading = true;
      try {
        var { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyDWcLelnVruUu7vMx93jpvJs-XkMgoolEg"
        );
        if (data.error_message) {
          console.log(data.error_message);
          this.address = lat + "," + long;
        } else {
          this.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
      this.loading = false;
    },
    clear() {
      this.$store.commit("CLEAR_CART");
    },
    inc(id) {
      var foundIndex = this.totalCartList.findIndex((x) => x.productId == id);
      this.$store.commit("INCREMENT_QUANTITY_CART", foundIndex);
      //This event signifies that a successfull checkout
      this.$gtag.event("INCREMENT_QUANTITY_CART", {
        event_category: "INCREMENT_QUANTITY_CART",
        event_label: "User INCREMENT_QUANTITY_CART",
      });
    },
    dec(id) {
      var foundIndex = this.totalCartList.findIndex((x) => x.productId == id);
      this.$store.commit("DECREMENT_QUANTITY_CART", foundIndex);
      //This event signifies that a successfull checkout
      this.$gtag.event("DECREMENT_QUANTITY_CART", {
        event_category: "DECREMENT_QUANTITY_CART",
        event_label: "User DECREMENT_QUANTITY_CART",
      });
    },
  },
  computed: {
    totalCartList() {
      switch (this.$store.getters.totalCartList.length) {
        case 0:
          return [];
        default:
          return this.$store.getters.totalCartList;
      }
    },

    headers() {
      return this.currency === "ETB"
        ? [
            { text: "IMAGE", value: "image", sortable: false },
            { text: "PRODUCT", value: "name", sortable: false },

            { text: "QUANTITY", value: "quantity", sortable: false },
            {
              text: "PRICE",
              value: "price",
              sortable: true,
            },
            { text: "ACTION", value: "action", sortable: false },
          ]
        : [
            { text: "IMAGE", value: "image", sortable: false },
            { text: "PRODUCT", value: "name", sortable: false },

            { text: "QUANTITY", value: "quantity", sortable: false },
            {
              text: "PRICE",
              value: "usdPrice",
              sortable: true,
            },
            { text: "ACTION", value: "action", sortable: false },
          ];
    },
    cartItems() {
      const cartItems = this.totalCartList.map((item) => {
        return {
          image: item.product.image,
          id: item.id,
          name: item.product.name,
          price: item.product.sellingPrice,
          usdPrice: item.product.usdPrice,
          quantity: item.quantity,
          total: item.total,
          productId: item.product.id,
        };
      });

      return cartItems;
    },
    currency() {
      return this.$store.state.product.currency;
    },
    ...mapGetters(["isTokenSet", "user"]),
    calCart() {
      return this.$store.state.cart.calCart;
    },
    validated() {
      if (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.yourValue &&
        this.country &&
        this.region &&
        this.wereda &&
        this.delivery
      ) {
        if (this.calCart === null) {
          this.$store.dispatch("calculateCart", {
            deliveryType: this.delivery,
            country: this.country,
            region: this.region,
            wereda: this.wereda,
            email: this.email,
            phone: this.yourValue.replace(/\s+/g, ""),
          });
        }
        return true;
      } else {
        return false;
      }
    },
    deliveryTypes() {
      return this.$store.state.cart.deliveryTypes.map((type) => {
        return {
          text: `${type.method} - ${type.price} ETB`,
          value: type.id,
        };
      });
    },
    error() {
      return this.yourValue.replace(/\s+/g, "").length !== 10 ? true : false;
    },
    firstName: {
      get() {
        return this.firstNameProxy === "null"
          ? this.user
            ? this.user.firstName
              ? this.user.firstName
              : ""
            : ""
          : this.firstNameProxy;
      },
      set(val) {
        this.firstNameProxy = val;
      },
    },
    lastName: {
      get() {
        return this.lastNameProxy === "null"
          ? this.user
            ? this.user.lastName
              ? this.user.lastName
              : ""
            : ""
          : this.lastNameProxy;
      },
      set(val) {
        this.lastNameProxy = val;
      },
    },

    email: {
      get() {
        return this.emailProxy === "null"
          ? this.user
            ? this.user.email
              ? this.user.email
              : ""
            : ""
          : this.emailProxy;
      },
      set(val) {
        this.emailProxy = val;
      },
    },
    yourValue: {
      get() {
        return this.yourValueProxy === "-1"
          ? this.user
            ? this.user.phone
              ? this.user.phone
              : ""
            : ""
          : this.yourValueProxy;
      },
      set(val) {
        this.yourValueProxy = val ? val : "";
      },
    },
    deliveryData() {
      const deliveryName = this.$store.state.cart.deliveryItems.map(
        (delivery) => {
          return { id: delivery.provider.id, name: delivery.provider.name };
        }
      );
      console.log(deliveryName);
      return deliveryName;
    },
    deliveryItem() {
      const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      const deliveryData = this.$store.state.cart.deliveryItems.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.provider.id === thing.provider.id)
      );
      const deliveryName = deliveryData.map((delivery) => {
        return {
          id: delivery.provider.id,
          lable: `Company: ${
            delivery.provider.name
          }, Estimated time: ${formatDate(
            delivery.estimatedTime
          )}, Delivery Price: ${delivery.deliveryPrice}`,
        };
      });
      return deliveryName;
    },
    getId() {
      //function to find one by name and get Id from array
      const id = this.$store.state.cart.deliveryItems.find(
        (x) => x.provider.name == this.delivery
      ).id;
      return id;
    },
    success() {
      return this.$store.state.cart.success;
    },
    text() {
      return this.$store.state.cart.text;
    },
    total() {
      let t = 0;
      this.$store.state.cart.cartItems.forEach((element) => {
        t = t + element.product.sellingPrice * element.quantity;
      });
      return t;
    },
    btnWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 100;
        case "sm":
          return 25;
        case "md":
          return 25;
        case "lg":
          return 25;
        case "xl":
          return 25;
        default:
          return 25;
      }
    },
  },
};
</script>

<style>
.apply-btn:hover {
  background-color: #07a04b;
  color: white;
}

.btn {
  text-transform: none;
}
.v-list .v-list-item--active {
  background-color: #07a04b !important;
}
.v-list .v-list-item--active .v-list-item__title {
  color: white !important;
}
</style>
