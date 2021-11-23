import * as types from "@/store/mutation-types";
import { createProvider } from "../../vue-apollo";
import { handleError } from "@/utils/utils.js";
import { gql } from "graphql-tag";

let apolloClient = createProvider().defaultClient;

const getters = {
  services: (state) => state.services,
  retailers: (state) => state.retailers,
  suppliers: (state) => state.suppliers,
  vendorProducts: (state) => state.vendorProducts,
  supplierProducts: (state) => state.supplierProducts,
  filteredProducts: (state) => state.filteredProducts,
};

const actions = {
  async searchFilter({ commit }, id) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            searchProduct(filter:{startPrice:${id}}){
              objects {
                name
                id
                image
                productpriceoptionSet {
                  id
                  quantity
                  discount
                }
                productrateSet {
                  id
                  user {
                    username
                    id
                  }
                  rate
                  comment
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
                  subcategorySet {
                    name
                    id
                  }
                }
                subcategory {
                  id
                  name
                }
              }
            }
          
        `,
      })
      .then((response) => {
        console.log(response.data.searchProduct.objects);
        commit(
          types.SAVE_ALL_FILTERED_PRODUCTS,
          response.data.searchProduct.objects
        );
        commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
  async getSupplierProducts({ commit }, id) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            supplierProductsPaginated(supplierId: "${id}") {
              objects {
                name
                id
                image
                productpriceoptionSet {
                  id
                  quantity
                  discount
                }
                productrateSet {
                  id
                  user {
                    username
                    id
                  }
                  rate
                  comment
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
                  subcategorySet {
                    name
                    id
                  }
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
        console.log(response.data.supplierProductsPaginated.objects);
        commit(
          types.SAVE_ALL_SUPPLIER_PRODUCTS,
          response.data.supplierProductsPaginated.objects
        );
        commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
  async getVendorProducts({ commit }, id) {
    commit(types.SHOW_LOADING, true);
    console.log(`{
      vendorProducts(vendorId: "${id}}") {
        objects {
          name
          id
          image
          productpriceoptionSet {
            id
            quantity
            discount
          }
          productrateSet {
            id
            user {
              username
              id
            }
            rate
            comment
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
            subcategorySet {
              name
              id
            }
          }
          subcategory {
            id
            name
          }
        }
      }
    }`);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            vendorProducts(vendorId: "${id}}") {
              objects {
                name
                id
                image
                productpriceoptionSet {
                  id
                  quantity
                  discount
                }
                productrateSet {
                  id
                  user {
                    username
                    id
                  }
                  rate
                  comment
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
                  subcategorySet {
                    name
                    id
                  }
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
        console.log(response.data.vendorProducts.objects);
        commit(
          types.SAVE_ALL_VENDOR_PRODUCTS,
          response.data.vendorProducts.objects
        );
        commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
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
            allVendors {
              id
              storeName
              storeCover
            }
          }
        `,
      })
      .then((response) => {
        commit(types.SAVE_ALL_RETAILERS, response.data.allVendors);
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
            allSuppliers {
              id
              storeName
            }
          }
        `,
      })
      .then((response) => {
        commit(types.SAVE_ALL_SUPPLIERS, response.data.allSuppliers);
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
  [types.SAVE_ALL_VENDOR_PRODUCTS](state, suppliers) {
    state.vendorProducts = suppliers;
  },
  [types.SAVE_ALL_SUPPLIER_PRODUCTS](state, suppliers) {
    state.supplierProducts = suppliers;
  },
  [types.SAVE_ALL_FILTERED_PRODUCTS](state, suppliers) {
    state.filteredProducts = suppliers;
  },
};

const state = {
  services: [],
  retailers: [],
  suppliers: [],
  vendorProducts: [],
  supplierProducts: [],
  filteredProducts: [],
};

export default {
  state,
  getters,
  actions,
  mutations,
};
