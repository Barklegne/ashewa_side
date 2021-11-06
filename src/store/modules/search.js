import * as types from "@/store/mutation-types";
import { createProvider } from "../../vue-apollo";
import { handleError } from "@/utils/utils.js";
import { gql } from "graphql-tag";

let apolloClient = createProvider().defaultClient;

const getters = {
  searchProducts: (state) => state.products,
};

const actions = {
  async searchFilter({ commit }, value) {
    commit(types.SHOW_LOADING, true);
    console.log();
    const resp = await apolloClient
      .query({
        query: gql`
        {
          filterProducts(filter: {name: "${value.word.toLowerCase()}", startPrice: 0 ${
          value.price !== 0 ? `,endPrice: ${value.price}` : ""
        }}) {
            objects {
              name
              id
              image
              usdPrice
              productrateSet {
                id
                user {
                  username
                  id
                }
                rate
                comment
              }
              productcolorSet {
                id
                name
                image
                productsizeSet {
                  id
                  name
                  quantity
                }
              }
              supplierDomain
              vendor {
                domain
                storeName
                id
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
              productrateSet {
                id
                rate
              }
              subcategory {
                id
                name
              }
            }
          }
        }
        `,
      })
      .then((response) => {
        commit(types.SHOW_LOADING, false);

        commit(
          types.SAVE_ALL_SEARCH_PRODUCTS,
          response.data.filterProducts.objects
        );
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
