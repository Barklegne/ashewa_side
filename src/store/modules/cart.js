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
  async checkout(ctx, value) {
    const ids = JSON.stringify(JSON.stringify(value));
    console.log(`
    mutation{
      createBoaTransaction(products:${ids},userId:"${ctx.rootState.auth.user.id}"){
        payload
      }
    }
  `);
    const resp = await apolloClient
      .mutate({
        mutation: gql`
        mutation{
          createBoaTransaction(products:${ids},userId:"${ctx.rootState.auth.user.id}"){
            payload
          }
        }
      `,
      })
      .then((response) => {
        console.log(response.data.createBoaTransaction.payload);
        // const http = new Http()
        // http({
        //   method: "POST",
        //   url: "https://testsecureacceptance.cybersource.com/pay",
        //   data: response.data.createBoaTransaction.payload,
        // });
        // this.vm
        //   .then((response) => {
        //     console.log(response);
        //     this.postResults = response.data.createBoaTransaction.payload;
        //     this.ajaxRequest = false;
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        // axios
        //   .post(
        //     "https://testsecureacceptance.cybersource.com/pay",
        //     response.data.createBoaTransaction.payload
        //   )
        //   .then((response) => {
        //     console.log(response.data);
        //   });
        // ctx.commit(types.CHECKOUT, response.data.createBoaTransaction.payload);
      })
      .catch((error) => {
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
    console.log(value);
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
};

export default {
  state,
  actions,
  getters,
  mutations,
};
