import * as types from '@/store/mutation-types';
import { createProvider } from '../../vue-apollo';
import { handleError } from '@/utils/utils.js';
import { gql } from 'graphql-tag';
import Vue from 'vue';

let apolloClient = createProvider().defaultClient;

const getters = {
	categories: (state) => state.categories,
	totalCategories: (state) => state.totalCategories,
	sampleCategories: (state) => state.sampleCategories,
	getCategoryId: (state) => (id) => {
		return state.categories.find((category) => category.id == id);
	},
	subCategory: (state) => state.subCategory,
};

const actions = {
	async parentCats({ commit }) {
		commit(types.SHOW_LOADING, true);
		const resp = await apolloClient
			.query({
				query: gql`
					{
						parentCategories {
							name
							image
							id
							description
							categorySet {
								id
								name
								image
							}
						}
					}
				`,
			})
			.then((response) => {
				console.log('test');
				console.log(response.data.parentCats);
				commit(
					types.SAVE_ALL_CATEGORIES,
					response.data.parentCategories
				);
				commit(types.SHOW_LOADING, false);
				// commit(types.SAVE_TOKEN, response.data.tokenAuth.token);
			})
			.catch((error) => {
				handleError(error, commit, resp);
			});
	},

	async singleCat({ commit }, value) {
		commit(types.SET_CATEGORY_LOADING, true);
		const resp = await apolloClient
			.query({
				query: gql`
					{
						filterProducts(filter: {parentCategory: "${value.id}"}) {
							page
							pages
							hasNext
							hasPrev
							totalObjects
							objects {
							name
							usdPrice
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
						}
					}

				`,
			})
			.then((response) => {
				commit(types.ADD_TO_PARENT_CATEGORY_PRODUCTS, {
					data: response.data.filterProducts.objects,
					id: value.id,
					name: value.name,
				});
				commit(types.SET_CATEGORY_LOADING, false);
				// commit(types.SAVE_TOKEN, response.data.tokenAuth.token);
			})
			.catch((error) => {
				handleError(error, commit, resp);
			});
	},

	async getSubCatProducts({ commit }, value) {
		commit(types.SHOW_LOADING, true);
		const resp = await apolloClient
			.query({
				query: gql`
				{
					filterProducts(filter: {category: "${value.id}"}) {
						page
						pages
						hasNext
						hasPrev
						totalObjects
						objects {
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
					}
					}
				`,
			})
			.then((response) => {
				console.log(response.data.filterProducts.objects, 'test');
				commit(types.ADD_TO_SUB_CATEGORY_PRODUCTS, {
					data: response.data.filterProducts.objects,
					id: value.id,
				});
				commit(types.SHOW_LOADING, false);
				// commit(types.SAVE_TOKEN, response.data.tokenAuth.token);
			})
			.catch((error) => {
				handleError(error, commit, resp);
			});
	},
	async getSubCat({ commit }, id) {
		commit(types.SHOW_LOADING, true);
		console.log(id);
		const resp = await apolloClient
			.query({
				query: gql`
          {
            getCategoryById(id:"${id}") {
              name
              id
              image
              description
              subcategorySet {
                id
                name
              }
              productSet {
                name
                id
                image
                usdPrice
                productrateSet{
                  id
                  user{
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
				console.log('here');
				commit(
					types.SAVE_A_SUBCATEGORIES,
					response.data.getCategoryById
				);
				commit(types.SHOW_LOADING, false);
				// commit(types.SAVE_TOKEN, response.data.tokenAuth.token);
			})
			.catch((error) => {
				handleError(error, commit, resp);
			});
	},
};

const mutations = {
	[types.CREATE_CATEGORY](state, value) {
		state.categories.push({
			image: value.image,
			id: state.categories.length + 1,
			title: value.title,
		});
	},
	[types.SAVE_ALL_CATEGORIES](state, value) {
		state.categories = value;
	},
	[types.SAVE_A_SUBCATEGORIES](state, value) {
		state.subCategory = value;
	},
	[types.SET_CATEGORY_LOADING](state, value) {
		state.loading = value;
	},
	[types.ADD_TO_PARENT_CATEGORY_PRODUCTS](state, value) {
		const pr = state.parentCategoriesProducts;
		if (!pr.find((item) => item.id === value.id)) {
			const cl = [
				...pr,
				{ data: value.data, id: value.id, name: value.name },
			];
			console.log(cl);
			Vue.set(state, 'parentCategoriesProducts', [...cl]);
		}
		value.data.forEach((element) => {
			if (!state.AllProducts.find((item) => item.id === element.id)) {
				const pr = [...state.AllProducts, element];
				Vue.set(state, 'AllProducts', [...pr]);
			}
		});
	},
	[types.ADD_TO_SUB_CATEGORY_PRODUCTS](state, value) {
		const pr = state.subCategoriesProducts;
		if (!pr.find((item) => item.id === value.id)) {
			const cl = [...pr, { data: value.data, id: value.id }];

			Vue.set(state, 'subCategoriesProducts', [...cl]);
		}
		value.data.forEach((element) => {
			if (!state.AllProducts.find((item) => item.id === element.id)) {
				const pr = [...state.AllProducts, element];
				Vue.set(state, 'AllProducts', [...pr]);
			}
		});
	},
};

const state = {
	categories: [],
	loading: false,
	parentCategories: [],
	parentCategoriesProducts: [],
	subCategoriesProducts: [],
	AllProducts: [],
	loadedProducts: 0,
	category: {},
	subCategory: {},
	totalCategories: 8,
	sampleCategories: [
		{
			id: '1',
			name: 'Electronics',
			image:
				'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
		},
		{
			id: '2',
			name: 'Fashion',
			image:
				'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
		},
		{
			id: '3',
			name: 'Health and Beauty',
			image:
				'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
		},
		{
			id: '4',
			name: 'Home and Garden',
			image:
				'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
		},
		{
			id: '5',
			name: 'Sports',
			image:
				'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
		},
		{
			id: '6',
			name: 'Industrial equipment',
			image:
				'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
		},
		{
			id: '7',
			name: 'Motors',
			image:
				'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
		},
		{
			id: '8',
			name: 'Collectibles and Art',
			image:
				'https://cdn.alzashop.com/Foto/LegendFoto/photos/NL244a1b_2.jpg',
		},
	],
};

export default {
	state,
	getters,
	mutations,
	actions,
};
