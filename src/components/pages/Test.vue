<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <v-row class="ma-0 pa-2">
          <v-col>
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
          <v-col>
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
                  <span class="subheading"
                    >{{ item.quantity * item.product.sellingPrice }}
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
              *Please feel all the required fields and pick a delivery method in
              billing details to see your order review
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
                    @change="handleDeliveryMethod()"
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
                  <span class="subheading"
                    >Delivery fee: {{ calCart ? calCart.deliveryFee : "" }}
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
                  <span class="subheading"
                    >{{ calCart ? calCart.subTotal : "" }}
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
                  <span class="subheading"
                    >{{ calCart ? calCart.tax : "" }}
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
                  <div class="text-end">
                    <strong>{{ calCart ? calCart.totalPrice : "" }}</strong>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <h2 class="text-start">Payment Methods</h2>
            <v-divider class="mb-5"></v-divider>
            <v-radio-group v-model="payment">
              <template v-slot:label>
                <div>Please select a <strong>payment method</strong></div>
              </template>

              <v-radio value="BOA">
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
              </v-radio>

              <v-radio value="BOA">
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
                      <div>Telebirr</div>
                    </v-col>
                    <v-col>
                      <v-img src="telebirr.png" height="30" width="100"></v-img>
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
              <v-radio value="Mbirr">
                <template v-slot:label>
                  <v-row align="center">
                    <v-col md="2">
                      <div>Mbirr</div>
                    </v-col>
                    <v-col>
                      <v-img src="mbirr.png" height="30" width="100"></v-img>
                    </v-col>
                  </v-row>
                </template>
              </v-radio>
              <v-radio value="Bank Payment">
                <template v-slot:label>
                  <div>Bank Payment</div>
                </template>
              </v-radio>
            </v-radio-group>
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    this.$store.dispatch("getDeliveryTypes");
  },

  computed: {
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
            phone: this.yourValue,
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
    totalCartList() {
      switch (this.$store.getters.totalCartList.length) {
        case 0:
          return [];
        default:
          return this.$store.getters.totalCartList;
      }
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
        return this.yourValueProxy === "null"
          ? this.user
            ? this.user.phone
              ? this.user.phone
              : ""
            : ""
          : this.yourValueProxy;
      },
      set(val) {
        this.yourValueProxy = val;
      },
    },
  },
  methods: {
    async submit() {
      console.log({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.yourValue,
        country: this.country,
        region: this.region,
        wereda: this.wereda,
        delivery: this.delivery,
      });
    },
    handleDeliveryMethod() {
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
            phone: this.yourValue,
          });
        }
      } else {
        console.log("not all filled");
      }
    },
  },

  data() {
    return {
      country: "Ethiopia",
      firstNameProxy: "null",
      lastNameProxy: "null",
      emailProxy: "null",
      yourValueProxy: "null",
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
    };
  },
};
</script>
