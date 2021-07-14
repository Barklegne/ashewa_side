import * as types from "@/store/mutation-types";
// import { login } from "@/services/api/auth";
import { createProvider } from "../../vue-apollo";
import { handleError } from "@/utils/utils.js";
import { gql } from "graphql-tag";

let apolloClient = createProvider().defaultClient;

const getters = {
  products: (state) => state.products,
  productFound: (state) => state.productFound,
  productsVendor: (state) => state.productsVendor,
  sampleProducts: (state) => state.sampleProducts,
  filteredProducts: (state) => state.filteredProducts,
  totalProducts: (state) => state.products.length,
  dealOfTheDay: (state) => state.products.slice(0, 6),
  electronics: (state) => state.products.slice(7, 13),
  clothings: (state) => state.products.slice(14, 20),
  home: (state) => state.products.slice(19, 25),
  getProductId: (state) => (id) => {
    return state.products.find((p) => p.id == id);
  },
};

const actions = {
  async getAllProducts({ commit }) {
    const resp = await apolloClient
      .query({
        query: gql`
          {
            allProductsPaginated {
              page
              pages
              hasNext
              hasPrev
              totalObjects
              objects {
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
        `,
      })
      .then((response) => {
        console.log(response.data.allProductsPaginated.objects);
        commit(
          types.SAVE_ALL_PRODUCTS,
          response.data.allProductsPaginated.objects
        );
        // commit(types.SAVE_TOKEN, response.data.tokenAuth.token);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
  async getProductByVendor({ commit }, id) {
    const resp = await apolloClient
      .query({
        query: gql`
          {
            productsByVendorPaginated(vendorId:"${id}"){
              page
              pages
              hasNext
              hasPrev
              totalObjects
              objects {
                name
                id
                image
                productrateSet{
                  id
                  user{
                    username
                    id
                  }
                  rate
                  comment
                }
                productcolorSet{
                  id
                  name
                  image
                  productsizeSet{
                    id
                    name
                    quantity
                  }
                }
                vendor {
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
        console.log(response.data.productsByVendorPaginated.objects);
        commit(
          types.SAVE_ALL_PRODUCTS_VENDOR,
          response.data.productsByVendorPaginated.objects
        );
        // commit(types.SAVE_TOKEN, response.data.tokenAuth.token);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
  async getAProduct({ commit }, id) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            
              getProductsById(id: "${id.id}") {
                name
                id
                image
                productrateSet{
                  id
                  user{
                    username
                    id
                  }
                  rate
                  comment
                }
                productcolorSet{
                  id
                  name
                  image
                  productsizeSet{
                    id
                    name
                    quantity
                  }
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
                  subcategorySet{
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
        commit(types.GET_A_PRODUCT, response.data.getProductsById);
        commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
  async getRelatedProduct({ commit }, id) {
    const resp = await apolloClient
      .query({
        query: gql`
          {
            relatedProducts(productId: "${id.id}") {
                name
                id
                image
                productrateSet{
                  id
                  user{
                    username
                    id
                  }
                  rate
                  comment
                }
                productcolorSet{
                  id
                  name
                  image
                  productsizeSet{
                    id
                    name
                    quantity
                  }
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
        `,
      })
      .then((response) => {
        commit(types.GET_RELATED_PRODUCT, response.data.relatedProducts);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
  async filterProducts({ commit }, payload) {
    const resp = await apolloClient
      .query({
        query: gql`
          {
            filterProds(
              pcat: "${payload.pcat}"
              page: ${payload.page}
              pageSize: ${payload.pageSize}
              ranged: ${payload.ranged}
              minP: ${payload.minP}
              maxP: ${payload.maxP}
            ) {
              page
              pages
              hasNext
              hasPrev
              objects {
                productId
                productName
                sellingPrice
                vendor{
                  storeName
                  id
                }
                productImages {
                  image
                }
              }
              total
            }
          }
        `,
      })
      .then((response) => {
        console.log(response.data.filterProds.objects);
        commit(types.SAVE_FILTERED_PRODUCTS, response.data.filterProds.objects);
        // commit(types.SAVE_TOKEN, response.data.tokenAuth.token);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
};

const mutations = {
  [types.SAVE_ALL_PRODUCTS](state, products) {
    console.log(products);
    state.products = products;
  },
  [types.SAVE_ALL_PRODUCTS_VENDOR](state, products) {
    console.log(products);
    state.productsVendor = products;
  },
  [types.SAVE_FILTERED_PRODUCTS](state, products) {
    state.filteredProducts = products;
  },
  [types.GET_A_PRODUCT](state, products) {
    if (products.productimageSet.length == 0) {
      state.productFound = {
        ...products,
        productimageSet: [{ image: products.image }],
      };
    } else {
      state.productFound = products;
    }
  },
  [types.GET_RELATED_PRODUCT](state, products) {
    state.relatedProducts = products;
  },
};

const state = {
  products: [],
  relatedProducts: [],
  productsVendor: [],
  filteredProducts: [],
  productFound: {},
  totalProducts: 8,
  sampleProducts: [
    {
      id: 1,
      name: "Test",
      sellingPrice: 5000,
      dealerPrice: 6000,
      description: "Test",
      vendor: {
        storeName: "Test Store",
      },
      category: { name: "Electronics" },
      productimageSet: [
        {
          image:
            "https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Test 2",
      sellingPrice: 5000,
      dealerPrice: 6000,
      description: "Test",
      vendor: {
        storeName: "Test Store",
      },
      category: { name: "Electronics" },
      productimageSet: [
        {
          image:
            "https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg",
        },
      ],
    },
    {
      id: 3,
      name: "Test 3",
      sellingPrice: 5000,
      dealerPrice: 6000,
      description: "Test",
      vendor: {
        storeName: "Test Store",
      },
      category: { name: "Electronics" },
      productimageSet: [
        {
          image:
            "https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg",
        },
      ],
    },
    {
      id: 4,
      name: "Test 4",
      sellingPrice: 5000,
      dealerPrice: 6000,
      description: "Test",
      vendor: {
        storeName: "Test Store",
      },
      category: { name: "Electronics" },
      productimageSet: [
        {
          image:
            "https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg",
        },
      ],
    },
  ],
};

export default {
  state,
  getters,
  actions,
  mutations,
};
