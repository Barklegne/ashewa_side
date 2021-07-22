import * as types from "@/store/mutation-types";
import { createProvider } from "../../vue-apollo";
import { handleError } from "@/utils/utils.js";
import { gql } from "graphql-tag";

let apolloClient = createProvider().defaultClient;

const getters = {
  services: (state) => state.services,
  retailers: (state) => state.retailers,
  suppliers: (state) => state.suppliers,
};

const actions = {
  async getServices({ commit }) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            services {
              title
              content
              image
              id
            }
          }
        `,
      })
      .then((response) => {
        console.log(response.data.services);
        commit(types.SAVE_ALL_SERVICES, response.data.services);
        commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
  async getRetailers({ commit }) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            retailers {
              id
              storeName
              storeCover
              productSet {
                name
                id
                image
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
                vendor {
                  storeName
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
        `,
      })
      .then((response) => {
        commit(types.SAVE_ALL_RETAILERS, response.data.retailers);
        commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
  async getSuppliers({ commit }) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            supliers {
              id
              storeName
              storeCover
              productSet {
                name
                id
                image
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
                vendor {
                  storeName
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
        `,
      })
      .then((response) => {
        commit(types.SAVE_ALL_SUPPLIERS, response.data.supliers);
        commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
};

const mutations = {
  [types.SAVE_ALL_SERVICES](state, services) {
    state.services = services;
  },
  [types.SAVE_ALL_RETAILERS](state, retailers) {
    state.retailers = retailers;
  },
  [types.SAVE_ALL_SUPPLIERS](state, suppliers) {
    state.suppliers = suppliers;
  },
};

const state = {
  services: [],
  retailers: [],
  suppliers: [],
};

export default {
  state,
  getters,
  actions,
  mutations,
};
