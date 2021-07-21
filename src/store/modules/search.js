import * as types from "@/store/mutation-types";
import { createProvider } from "../../vue-apollo";
import { handleError } from "@/utils/utils.js";
import { gql } from "graphql-tag";

let apolloClient = createProvider().defaultClient;

const getters = {
  searchProducts: (state) => state.products,
};

const actions = {
  async search({ commit }, value) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            searchProducts(name_Contains: "${value}") {
              edges {
                node {
                  name
                  id
                  image
                  productrateSet {
                    user {
                      username
                    }
                    rate
                    comment
                  }
                  vendor {
                    storeName
                    id
                    productSet {
                      name
                      id
                      image
                      productimageSet {
                        image
                      }
                      sellingPrice
                    }
                  }
                  sellingPrice
                  productimageSet {
                    image
                  }
                  discount
                  description
                  category {
                    id
                    name
                    image
                  }
                  subcategory {
                    id
                    name
                  }
                }
              }
            }
          }
        `,
      })
      .then((response) => {
        const p = [];
        response.data.searchProducts.edges.map((n) => {
          p.push(n.node);
        });
        commit(types.SHOW_LOADING, false);
        commit(types.SAVE_ALL_SEARCH_PRODUCTS, p);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
};

const mutations = {
  [types.SAVE_ALL_SEARCH_PRODUCTS](state, products) {
    state.products = products;
  },
};

const state = {
  products: [],
};

export default {
  state,
  getters,
  actions,
  mutations,
};
