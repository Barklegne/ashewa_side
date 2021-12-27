export default [
	{
		path: '/ProductDetails/:id',
		name: 'ProductDetails',
		component: () =>
			import(
				/* webpackChunkName: "ProductDetails" */ '@/components/pages/ProductDetail.vue'
			),
	},
	{
		path: '/Store/:id',
		name: 'VisitStore',
		component: () =>
			import(
				/* webpackChunkName: "VisitStore" */ '@/components/pages/VisitStore.vue'
			),
	},
	{
		path: '/NewArrivals',
		name: 'NewArrivals',
		component: () =>
			import(
				/* webpackChunkName: "NewArrivals" */ '@/components/pages/NewArrivals.vue'
			),
	},
	{
		path: '/BestProducts',
		name: 'BestProducts',
		component: () =>
			import(
				/* webpackChunkName: "BestProducts" */ '@/components/pages/BestProducts.vue'
			),
	},
];
