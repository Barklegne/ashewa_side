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
  async getDelivery(ctx) {
    ctx.commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            deliveryProviders {
              id
              name
            }
          }
        `,
      })
      .then((response) => {
        ctx.commit(types.SET_DELIVERY, response.data.deliveryProviders);
        ctx.commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, ctx.commit, resp);
      });
  },
  async addToCart(ctx, value) {
    ctx.commit(types.SHOW_LOADING, true);

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
                product {
                  id
                  name
                }
              }
            }
          }
        `,
      })
      .then((resp) => {
        ctx.commit(types.SHOW_LOADING, false);
        ctx.commit(types.ADD_PRODUCT_TO_CART_LIST, {
          id: value.id,
          title: value.title,
          category: value.category,
          price: value.price,
          image: value.image,
          quantity: value.quantity ? value.quantity : 1,
        });
        console.log(resp.data.addToCart.payload);
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
  `,
      })
      .then(async (r) => {
        console.log(`
        ${r.data.checkoutOrder.payload.order.reference}
      `);
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
  [types.REMOVE_PRODUCT_FROM_CART_LIST](state, value) {
    state.cartItems = state.cartItems.filter(function(product) {
      return product.productId != value;
    });
  },
  [types.SET_DELIVERY](state, value) {
    state.deliveryItems = value;
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
  cartItems: [],
  totalProducts: 8,
  deliveryItems: [],
  success: false,
  text: "",
};

export default {
  state,
  actions,
  getters,
  mutations,
};
