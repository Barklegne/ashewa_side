import * as types from "@/store/mutation-types";

const getters = {
  totalWishList: (state) => state.wishLists,
  getQuantity: (state) => {
    const q = [];
    state.wishLists.forEach((element) => {
      q.push(element.quantity);
    });
    return q;
  },
};

const mutations = {
  [types.REMOVE_PRODUCT_FROM_WISH_LIST](state, value) {
    state.wishLists = state.wishLists.filter(function(product) {
      return product.productId != value;
    });
  },
  [types.INCREMENT_QUANTITY](state, value) {
    let wl = state.wishLists;
    wl[value] = {
      ...wl[value],
      quantity: wl[value].quantity + 1,
    };
    state.wishLists = wl;
  },
  [types.DECREMENT_QUANTITY](state, value) {
    if (state.wishLists[value].quantity == 1) {
      state.wishLists = state.wishLists.filter(function(product) {
        return product.productId != state.wishLists[value].productId;
      });
    } else {
      state.wishLists[value] = {
        ...state.wishLists[value],
        quantity: state.wishLists[value].quantity - 1,
      };
    }
  },
  [types.ADD_PRODUCT_TO_WISH_LIST](state, value) {
    state.wishLists = [
      ...state.wishLists,
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
  wishLists: [],
  totalProducts: 8,
};

export default {
  state,
  getters,
  mutations,
};
