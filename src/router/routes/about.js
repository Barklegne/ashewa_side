export default [
	{
		path: '/about',
		name: 'about',
		component: () =>
			import(
				/* webpackChunkName: "About" */ '@/components/pages/About.vue'
			),
	},
	{
		path: '/suppliers',
		name: 'Suppliers',
		component: () =>
			import(
				/* webpackChunkName: "Suppliers" */ '@/components/pages/Suppliers.vue'
			),
	},
	{
		path: '/retailers',
		name: 'Retailers',
		component: () =>
			import(
				/* webpackChunkName: "Retailers" */ '@/components/pages/Retailers.vue'
			),
	},
	{
		path: '/vendor-supplier',
		name: 'VendorSupplier',
		component: () =>
			import(
				/* webpackChunkName: "AboutV" */ '@/components/pages/VendorSupplier.vue'
			),
	},
	{
		path: '/shipping-policy',
		name: 'ShippingPolicy',
		component: () =>
			import(
				/* webpackChunkName: "AboutS" */ '@/components/pages/ShippingPolicy.vue'
			),
	},
	{
		path: '/privacy-policy',
		name: 'PrivacyPolicy',
		component: () =>
			import(
				/* webpackChunkName: "AboutP" */ '@/components/pages/Policy.vue'
			),
	},
	{
		path: '/sell-on-products-on-ashewa',
		name: 'SellOnAshewaBusiness',
		component: () =>
			import(
				/* webpackChunkName: "AboutPB" */ '@/components/pages/SellOnAshewaBusiness.vue'
			),
	},
];
