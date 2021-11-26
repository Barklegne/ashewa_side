import * as types from "@/store/mutation-types";
import router from "@/router";
import Vue from "vue";
import { createProvider } from "../../vue-apollo";
import { handleError } from "@/utils/utils.js";
import { gql } from "graphql-tag";

let apolloClient = createProvider().defaultClient;

const getters = {
  totalCartList: (state) => state.cartItems,
};

const actions = {
  async getOrderHistory({ commit }) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            orderHistory {
              page
              pages
              objects {
                id
                price
                orders {
                  product {
                    id
                    name
                    productimageSet {
                      image
                    }
                  }
                  quantity
                }
                paid
                reference
                paymentMethod
                status
              }
            }
          }
        `,
      })
      .then((res) => {
        commit(types.SHOW_LOADING, false);
        commit(types.SET_ORDER_HISTORY, res.data.orderHistory.objects);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
  async getDelivery(ctx) {
    ctx.commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            deliveryOptions {
              id
              provider {
                id
                name
                phone
                address
                totalPrice
                totalDistance
                estimatedTime
              }
            }
          }
        `,
      })
      .then((response) => {
        ctx.commit(types.SET_DELIVERY, response.data.deliveryOptions);
        ctx.commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, ctx.commit, resp);
      });
  },
  async getCartList({ commit }) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            getCart {
              id
              quantity
              product {
                id
                name
                image
                sellingPrice
                productimageSet {
                  image
                }
              }
            }
          }
        `,
      })
      .then((res) => {
        commit(types.SET_CART_LIST, res.data.getCart);
        commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
  async addToCart(ctx, value) {
    debugger;
    ctx.commit(types.SHOW_LOADING, true);
    debugger;
    const resp = await apolloClient
      .mutate({
        mutation: gql`
          mutation {
            addToCart(
              productId: "${value.id}"
              quantity: ${value.quantity ? value.quantity : 1}
            ) {
              payload {
                id
              quantity
              product {
                id
                name
                image
                sellingPrice
                productimageSet {
                  image
                }
              }
              }
            }
          }
        `,
      })
      .then((resp) => {
        ctx.commit(types.SET_CART_LIST, resp.data.addToCart.payload);
        ctx.commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, ctx.commit, resp);
      });
  },
  async removeFromCart(ctx, value) {
    ctx.commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .mutate({
        mutation: gql`
          mutation {
            clearCart(productId: "${value}") {
              cleared
            }
          }
        `,
      })
      .then((resp) => {
        console.log(resp.data.clearCart.payload);
        ctx.commit(types.SET_CART_LIST, []);
        ctx.commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, ctx.commit, resp);
      });
  },
  async finalizeCheckout(ctx, value) {
    const resp = await apolloClient
      .mutate({
        mutation: gql`
          mutation {
            finalizeLocalTransferTransaction(
              depositedBy: "${value.user}"
              reference: "${value.reference}"
              transactionId: "${value.transaction}"
            ) {
              payload {
                id
              }
            }
          }
        `,
      })
      .then((resp) => {
        console.log(resp.data.finalizeLocalTransferTransaction.payload.id);
      })
      .catch((error) => {
        handleError(error, ctx.commit, resp);
      });
  },

  async createBillingInformation(ctx, value) {
    console.log(value);
    ctx.commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .mutate({
        mutation: gql`
          mutation {
            createBillingInfo(
              address: "9.0011098,38.8100753"
              fullName: "test test"
              phone: "0923772845"
            ) {
              payload {
                id
                phone
                fullName
                address
              }
            }
          }
        `,
      })
      .then(async () => {
        ctx.commit(types.SHOW_LOADING, false);
        ctx.dispatch("getDelivery");
      })
      .catch((error) => {
        console.log("error");
        handleError(error, ctx.commit, resp);
      });
  },
  async checkout(ctx, value) {
    console.log(value);
    ctx.commit(types.SHOW_LOADING, true);
    console.log(`
    mutation{
      checkoutOrder(deliveryProviderId: "${value.deliveryId}", userLocation: "${value.loc}"){
        payload{
          order{
            id
            reference
          }
          deliveryOption{
            provider{
              id
            }
          }
        }
      }
    }
      `);
    const resp = await apolloClient
      .mutate({
        mutation: gql`
        mutation {
          checkoutOrder(billingInfo: {country: "${value.country}", region: "${value.region}", wereda: "${value.wereda}", phone: "${value.phone}", email: "${value.email}"}, deliveryProviderId: "${value.deliveryId}") {
            payload {
              order {
                id
                reference
              }
              deliveryOption {
                provider {
                  id
                  name
                }
              }
            }
          }
        }        
  `,
      })
      .then(async (r) => {
        console.log(`
        ${r.data.checkoutOrder.payload.order.reference}
      `);
        ctx.commit(
          types.CHECKOUT_CREATED,
          r.data.checkoutOrder.payload.deliveryOption
        );
        ctx.commit("SET_VIS_FALSE");
        if (value.payment === "BOA") {
          const res = await apolloClient
            .mutate({
              mutation: gql`
              mutation {
                createBoaTransaction(
                  orderId: "${r.data.checkoutOrder.payload.order.id}"
                ) {
                  payload
                }
              }
            `,
            })
            .then((response) => {
              ctx.commit(types.SHOW_LOADING, false);
              console.log(response.data.createBoaTransaction.payload);
              ctx.commit(types.CHECKOUT_SUCCESS, {
                a: r.data.checkoutOrder.payload.order.reference,
                m: response.data.createBoaTransaction.payload,
              });
            })
            .catch((error) => {
              handleError(error, ctx.commit, res);
            });
        } else if (value.payment === "Telebirr") {
          const res = await apolloClient
            .mutate({
              mutation: gql`
              mutation {
                createTeleBirrTransaction(
                  orderId: "${r.data.checkoutOrder.payload.order.id}"
                ) {
                  payUrl
                }
              }
            `,
            })
            .then((response) => {
              ctx.commit(types.SHOW_LOADING, false);
              console.log(response.data.createTeleBirrTransaction.payUrl);
              ctx.commit(types.CHECKOUT_SUCCESS, {
                a: r.data.checkoutOrder.payload.order.reference,
                m: response.data.createTeleBirrTransaction.payUrl,
              });
            })
            .catch((error) => {
              handleError(error, ctx.commit, res);
            });
        } else if (value.payment === "PayPal") {
          const res = await apolloClient
            .mutate({
              mutation: gql`
              mutation {
                createPaypalTransaction(
                  orderId: "${r.data.checkoutOrder.payload.order.id}"
                ) {
                  payload
                }
              }
            `,
            })
            .then((response) => {
              ctx.commit(types.SHOW_LOADING, false);
              console.log(response.data.createPaypalTransaction.payload);
              ctx.commit(types.CHECKOUT_SUCCESS, {
                a: r.data.checkoutOrder.payload.order.reference,
                m: response.data.createPaypalTransaction.payload,
              });
            })
            .catch((error) => {
              handleError(error, ctx.commit, res);
            });
        } else if (value.payment === "Hello Cash") {
          console.log(`mutation{
            createHelloCashTransaction(orderId:"${r.data.checkoutOrder.payload.order.id}", phone: "${value.phone}"){
              payload{
                amount
                id
              }
            }

          }`);
          const res = await apolloClient
            .mutate({
              mutation: gql`
              mutation{
                createHelloCashTransaction(orderId:"${r.data.checkoutOrder.payload.order.id}", phone: "${value.phone}"){
                  payload{
                    amount
                    id
                  }
                }
              }
              
              `,
            })
            .then((response) => {
              ctx.commit(types.SHOW_LOADING, false);
              console.log(response.data.createHelloCashTransaction.payload.id);
              ctx.commit(
                types.CHECKOUT_SUCCESS,
                r.data.checkoutOrder.payload.order.reference
              );
            })
            .catch((error) => {
              handleError(error, ctx.commit, res);
            });
        } else if (value.payment === "Mbirr") {
          console.log(`
          mutation{
            createMbirrTransaction(orderId:"${r.data.checkoutOrder.payload.order.id}"){
              payload{
                id
                reference
              }
            }
          }
          `);
          const res = await apolloClient
            .mutate({
              mutation: gql`
              mutation{
                createMbirrTransaction(orderId:"${r.data.checkoutOrder.payload.order.id}"){
                  payload{
                    id
                    reference
                  }
                }
              }
              `,
            })
            .then((response) => {
              ctx.commit(types.SHOW_LOADING, false);
              console.log(response.data.createMbirrTransaction.payload.id);
              ctx.commit(types.CHECKOUT_SUCCESS, {
                a: r.data.checkoutOrder.payload.order.reference,
                m: response.data.createMbirrTransaction.payload.reference,
              });
            })
            .catch((error) => {
              handleError(error, ctx.commit, res);
            });
        } else {
          const res = await apolloClient
            .mutate({
              mutation: gql`
              mutation{
                createLocalTransferTransaction(orderId: "${r.data.checkoutOrder.payload.order.id}"){
                  payload{
                    id
                  }
                }
              }
              `,
            })
            .then((response) => {
              ctx.commit(types.SHOW_LOADING, false);
              console.log(
                response.data.createLocalTransferTransaction.payload.id
              );
              ctx.commit(
                types.CHECKOUT_SUCCESS,
                r.data.checkoutOrder.payload.order.reference
              );
            })
            .catch((error) => {
              handleError(error, ctx.commit, res);
            });
        }
      })
      .catch((error) => {
        console.log("error");
        handleError(error, ctx.commit, resp);
      });
  },
};

const mutations = {
  SET_CART_LIST(state, value) {
    Vue.set(state, "cartItems", value);
  },
  [types.SET_DELIVERY](state, value) {
    state.deliveryItems = value;
    state.vis = true;
  },
  [types.CHECKOUT_SUCCESS](state, value) {
    state.success = true;
    state.text = value;
  },
  [types.CLEAR_SUCCESS](state) {
    state.success = false;
    state.text = "";
  },
  [types.CLEAR_CART](state) {
    state.cartItems = [];
    router.push({
      name: "landing",
    });
  },
  [types.CHECKOUT_CREATED](state, value) {
    state.deliveryInformation = { ...value };
  },
  [types.CHECKOUT](state, value) {
    const str = JSON.parse(value);
    console.log(str, value);
  },
  [types.INCREMENT_QUANTITY_CART](state, value) {
    let cl = state.cartItems;
    cl[value] = {
      ...state.cartItems[value],
      quantity: state.cartItems[value].quantity + 1,
    };
    Vue.set(state, "cartItems", [...cl]);
  },
  [types.DECREMENT_QUANTITY_CART](state, value) {
    if (state.cartItems[value].quantity == 1) {
      state.cartItems = state.cartItems.filter(function(product) {
        return product.productId != state.cartItems[value].productId;
      });
    } else {
      let cl = state.cartItems;
      cl[value] = {
        ...state.cartItems[value],
        quantity: state.cartItems[value].quantity - 1,
      };
      Vue.set(state, "cartItems", [...cl]);
    }
  },
  [types.SET_ORDER_HISTORY](state, value) {
    state.orderHistory = value;
  },
  [types.SET_VIS_FALSE](state) {
    state.vis = false;
  },
  [types.ADD_PRODUCT_TO_CART_LIST](state, value) {
    state.cartItems = [
      ...state.cartItems,
      {
        productId: value.id,
        name: value.title,
        category: value.category,
        price: value.price,
        image: value.image,
        quantity: value.quantity ? value.quantity : 1,
      },
    ];
  },
};

const state = {
  test: "test",
  vis: false,
  cartItems: [],
  deliveryInformation: {
    provider: {
      id: "",
      name: "",
    },
    totalDistance: "",
    estimatedTime: "",
    deliveryPrice: "",
  },
  totalProducts: 8,
  deliveryItems: [],
  success: false,
  text: "",
  orderHistory: [],
  cartList: [],
};

export default {
  state,
  actions,
  getters,
  mutations,
};
