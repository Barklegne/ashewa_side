import * as types from '@/store/mutation-types';
// import { login } from "@/services/api/auth";
import { createProvider } from '../../vue-apollo';
import { handleError } from '@/utils/utils.js';
import { gql } from 'graphql-tag';
import router from '@/router';

let apolloClient = createProvider().defaultClient;

const getters = {
	products: (state) => state.products,
	productFound: (state) => state.productFound,
	productsVendor: (state) => state.productsVendor,
	sampleProducts: (state) => state.sampleProducts,
	totalProducts: (state) => state.products.length,
	dealOfTheDay: (state) => state.products.slice(0, 6),
	getProductId: (state) => (id) => {
		return state.products.find((p) => p.id == id);
	},
};

const actions = {
	async getVendorInformation(ctx, id) {
		ctx.commit(types.SAVE_ALL_VENDOR_PRODUCTS_LOADING);
		const resp = await apolloClient
			.query({
				query: gql`
          {
            vendorInfo(vendorName: "${id}") {
              id
              storeName
              tradeLicence
              tinNumber
              description
              storeCover
              location
              phone
              email
              videoUrl
              domain
              country
              region
              subCity
              woreda
              vendorgallerySet{
                image
              }
              socialLinks{
                facebook
                telegram
                youtube
              }
              vendorfooter{
                ourService
                tradeService
                ourProducts
                whoWeAre
              }
            }
          }
        `,
			})
			.then((response) => {
				console.log(response.data.vendorInfo);
				ctx.commit(
					types.SAVE_ALL_VENDOR_INFO,
					response.data.vendorInfo
				);
				ctx.dispatch('getAllVendorProducts', {
					id: response.data.vendorInfo.id,
					page: 1,
				});
			})
			.catch((error) => {
				handleError(error, ctx.commit, resp);
				ctx.commit(types.SAVE_ALL_VENDOR_PRODUCTS_LOADING);
			});
	},
	async getAllVendorProducts({ commit }, val) {
		const resp = await apolloClient
			.query({
				query: gql`
          {
            vendorProducts(vendorId: "${val.id}",page:${val.page}) {
              page
              pages
              hasNext
              hasPrev
              totalObjects
              objects {
                name
                stockAmount
                usdPrice
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
                  phone
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
				commit(types.SAVE_ALL_VENDOR_PRODUCTS_LOADING);
			})
			.catch((error) => {
				handleError(error, commit, resp);
				commit(types.SAVE_ALL_VENDOR_PRODUCTS_LOADING);
			});
	},
	async addSubscriber(ctx, value) {
		ctx.commit(types.SHOW_LOADING, true);
		console.log(`mutation {
      addEmailSubscription(input: { email: "${value}" }) {
        payload {
          id
          email
        }
      }
    }`);
		const resp = await apolloClient
			.mutate({
				mutation: gql`
          mutation {
            addEmailSubscription(input: { email: "${value}" }) {
              payload {
                id
                email
              }
            }
          }
        `,
			})
			.then((res) => {
				ctx.commit(types.SHOW_LOADING, false);
				ctx.commit(types.SUCCESS, { msg: 'Thanks for subscribing  ' });
				console.log(res);
			})
			.catch((error) => {
				handleError(error, ctx.commit, resp);
			});
	},
	async addFollower(ctx, value) {
		ctx.commit(types.SHOW_LOADING, true);

		const resp = await apolloClient
			.mutate({
				mutation: gql`
          mutation {
            addVendorFollower(userId: "${ctx.rootState.auth.user.id}", vendorId: "${value.id}") {
              payload {
                id
                user {
                  username
                }
              }
            }
          }
        `,
			})
			.then(() => {
				router.go();
			})
			.catch((error) => {
				router.go();
				handleError(error, ctx.commit, resp);
			});
	},
	async addReview(ctx, value) {
		ctx.commit(types.SHOW_LOADING, true);
		const resp = await apolloClient
			.mutate({
				mutation: gql`
          mutation {
            addOrUpdateProductRate(
              comment: "${value.comment}"
              productId: "${value.productId}"
              rate: ${value.rate}
              userId: "${ctx.rootState.auth.user.id}"
            ) {
              payload {
                id
                rate
                comment
              }
            }
          }
        `,
			})
			.then(() => {
				ctx.commit(types.SHOW_LOADING, false);
				router.go();
			})
			.catch((error) => {
				handleError(error, ctx.commit, resp);
			});
	},

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
								supplierDomain
								vendor {
									domain
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
                size
                supplierDomain
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
	async getNewArrivals({ commit }) {
		const resp = await apolloClient
			.query({
				query: gql`
					{
						newArrivalsPaginated {
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
									phone
									followerSet {
										user {
											id
										}
										id
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
				console.log(response.data.newArrivalsPaginated.objects);
				commit(
					types.SAVE_NEW_ARRIVAL,
					response.data.newArrivalsPaginated.objects
				);
			})
			.catch((error) => {
				console.log(error, resp);
			});
	},
	async getBestProducts({ commit }) {
		commit(types.SHOW_LOADING, true);
		const resp = await apolloClient
			.query({
				query: gql`
					{
						filterProducts(filter: { startPrice: 500 }) {
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
									phone
									followerSet {
										user {
											id
										}
										id
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
				commit(types.SHOW_LOADING, false);
				console.log(response.data.filterProducts.objects);
				commit(
					types.SAVE_BEST_PRODUCTS,
					response.data.filterProducts.objects
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
					getProductsById(
						id: "${id.id}"
					) {
						name
						stockAmount
						usdPrice
						color {
							id
							name
							image
							size {
								id
								name
								price
								quantity
							}
						}
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
							isSupplier
							id
							phone
							user {
								id
								username
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
					productSpecification(
						productId: "${id.id}"
					) {
						specificationTitle
						specificationDetail
					}
				}
			`,
			})
			.then((response) => {
				commit(types.GET_A_PRODUCT, {
					...response.data.getProductsById,
					productSpecification: response.data.productSpecification,
				});
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
                size
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
        `,
			})
			.then((response) => {
				commit(
					types.GET_RELATED_PRODUCT,
					response.data.relatedProducts
				);
			})
			.catch((error) => {
				handleError(error, commit, resp);
			});
	},
	setCurrency({ commit }, payload) {
		commit(types.SUCCESS, null);
		commit(types.ERROR, null);
		commit(types.CHANGE_CURRENCY, payload);
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
                supplierDomain
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
				commit(
					types.SAVE_FILTERED_PRODUCTS,
					response.data.filterProds.objects
				);
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
	[types.CHANGE_CURRENCY](state, value) {
		state.currency = value;
	},
	[types.SAVE_NEW_ARRIVAL](state, value) {
		state.newArrivals = value;
	},
	[types.SAVE_BEST_PRODUCTS](state, value) {
		state.bestProducts = value;
	},
	[types.SAVE_ALL_VENDOR_INFO](state, value) {
		state.vendorInfo = value;
	},
	[types.SAVE_ALL_VENDOR_PRODUCTS](state, value) {
		state.vendorProducts = value;
	},
	[types.SAVE_ALL_VENDOR_PRODUCTS_LOADING](state) {
		state.loading = !state.loading;
	},
	[types.CHANGE_TAB](state, value) {
		state.tab = value;
	},
};

const state = {
	products: [],
	tab: 0,
	loading: false,
	newArrivals: [],
	vendorProducts: [],
	bestProducts: [],
	vendorInfo: {},
	currency: 'ETB',
	vis: false,
	email: '',
	relatedProducts: [],
	productsVendor: [],
	filteredProducts: [],
	productFound: {},
	totalProducts: 8,
	sampleProducts: [
		{
			id: 1,
			name: 'Test',
			sellingPrice: 5000,
			dealerPrice: 6000,
			description: 'Test',
			vendor: {
				storeName: 'Test Store',
			},
			category: { name: 'Electronics' },
			productimageSet: [
				{
					image:
						'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
				},
			],
		},
		{
			id: 2,
			name: 'Test 2',
			sellingPrice: 5000,
			dealerPrice: 6000,
			description: 'Test',
			vendor: {
				storeName: 'Test Store',
			},
			category: { name: 'Electronics' },
			productimageSet: [
				{
					image:
						'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
				},
			],
		},
		{
			id: 3,
			name: 'Test 3',
			sellingPrice: 5000,
			dealerPrice: 6000,
			description: 'Test',
			vendor: {
				storeName: 'Test Store',
			},
			category: { name: 'Electronics' },
			productimageSet: [
				{
					image:
						'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
				},
			],
		},
		{
			id: 4,
			name: 'Test 4',
			sellingPrice: 5000,
			dealerPrice: 6000,
			description: 'Test',
			vendor: {
				storeName: 'Test Store',
			},
			category: { name: 'Electronics' },
			productimageSet: [
				{
					image:
						'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
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
