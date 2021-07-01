import * as types from "@/store/mutation-types";
import router from "@/router";

const getters = {
  totalCartList: (state) => state.cartItems,
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
  [types.INCREMENT_QUANTITY_CART](state, value) {
    state.cartItems[value] = {
      ...state.cartItems[value],
      quantity: state.cartItems[value].quantity + 1,
    };
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
        quantity: 1,
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
  getters,
  mutations,
};
