(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Category"],{1210:function(t,e,r){"use strict";r("af73")},af73:function(t,e,r){},d5dc:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mt-5 mx-5"},[t.subCategory?r("v-row",{attrs:{justify:"space-around"}},[r("v-col",{staticClass:"hidden-sm-and-down",attrs:{cols:"3"}},[r("v-row",{staticClass:"mb-4"},[r("div",{class:t.$vuetify.theme.dark?"leftContDark":"leftContLight",staticStyle:{width:"100%","text-align":"start"}},[r("div",{staticClass:"mb-4",staticStyle:{"font-size":"20px"}},[t._v("CATEGORIES")]),t._l(t.categories,(function(e){return r("div",{key:e.id,staticClass:"my-1",staticStyle:{cursor:"pointer"},on:{click:function(r){return t.$router.push({path:"/subcategory/"+e.id})}}},[t._v(" "+t._s(e.name)+" ")])}))],2)]),r("v-row",{staticClass:"mb-4"},[r("div",{class:t.$vuetify.theme.dark?"leftContDark":"leftContLight",staticStyle:{width:"100%","text-align":"start"}},[r("div",{staticClass:"mb-4",staticStyle:{"font-size":"20px"}},[t._v("SUB-CATEGORIES")]),t._l(t.subCategory.subcategorySet,(function(e){return r("div",{key:e.id,staticClass:"my-1",staticStyle:{cursor:"pointer"},on:{click:function(r){return t.$router.push({path:"/category/"+e.id})}}},[t._v(" "+t._s(e.name)+" ")])}))],2)])],1),r("v-col",{staticClass:"test1",attrs:{cols:"11",md:"8"}},[r("section",{staticClass:"sec",attrs:{id:"best-sale-items"}},[r("v-row",[r("h2",{staticStyle:{"font-weight":"normal"}},[t._v("Best Sale Items")])]),r("v-divider",{staticClass:"my-4"}),r("v-row",[r("v-slide-group",{staticClass:"pa-4",attrs:{"active-class":"success","show-arrows":""},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},t._l(t.dataN,(function(t,e){return r("v-slide-item",{key:e,staticClass:"mr-5 mb-4"},[r("ProductCard",{attrs:{vendor:t.vendor,productName:t.name,productImages:t.productimageSet,sellingPrice:t.sellingPrice,productId:""+t.id,productCategory:t.category,description:t.description,dealerPrice:0,width:150,height:150,productrateSet:t.productrateSet}})],1)})),1)],1)],1),r("section",{staticClass:"sec",attrs:{id:"recomended-sale-items"}},[r("v-row",[r("h2",{staticStyle:{"font-weight":"normal"}},[t._v("Recomended Items")])]),r("v-divider",{staticClass:"my-4"}),r("v-row",[r("v-slide-group",{staticClass:"pa-4",attrs:{"active-class":"success","show-arrows":""},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},t._l(t.dataN,(function(t,e){return r("v-slide-item",{key:e,staticClass:"mr-5 mb-4"},[r("ProductCard",{attrs:{vendor:t.vendor,description:t.description,dealerPrice:0,productName:t.name,productImages:t.productimageSet,sellingPrice:t.sellingPrice,productId:""+t.id,productCategory:t.category,width:150,height:150,productrateSet:t.productrateSet}})],1)})),1)],1)],1),r("section",{staticClass:"sec",attrs:{id:"products-found"}},[r("div",[r("v-row",{staticClass:"pa-3",style:t.$vuetify.theme.dark?"background-color:#121212":"background-color:#F5F5F5;"},[r("div",{staticClass:"mt-3"},[t._v(" "+t._s(""+t.dataN.length)+" Products found ")]),r("v-spacer")],1),r("v-row",t._l(t.dataN,(function(t,e){return r("v-col",{key:e,attrs:{cols:"6",md:"3"}},[r("ProductMobile",{attrs:{vendor:t.vendor,productName:t.name,productImages:t.productimageSet,sellingPrice:t.sellingPrice,productId:""+t.id,productCategory:t.category,width:150,productrateSet:t.productrateSet,height:150}})],1)})),1)],1)])])],1):r("div",[t._v("Test")])],1)},a=[],i=r("5530"),o=r("1da1"),c=(r("96cf"),r("d3b7"),r("3ca3"),r("ddb0"),r("7db0"),r("159b"),function(){return r.e("chunk-682ee36f").then(r.bind(null,"c58c"))}),n=function(){return r.e("chunk-685db00a").then(r.bind(null,"49ef"))},d={components:{ProductCard:n,ProductMobile:c},created:function(){var t=this;this.subCategoriesProducts.find((function(e){return e.id===t.$route.params.id}))||this.getSubCat(this.$route.params.id)},methods:{getSubCat:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$store.dispatch("getSubCatProducts",{id:t});case 2:case"end":return r.stop()}}),r)})))()}},computed:{subCategory:function(){return this.$store.getters.subCategory?this.$store.getters.subCategory:{}},subCategoriesProducts:function(){return this.$store.state.categories.subCategoriesProducts},productsFromSelected:function(){var t=this;return this.subCategoriesProducts.find((function(e){return e.id===t.$route.params.id}))?this.subCategoriesProducts.find((function(e){return e.id===t.$route.params.id})):null},dataN:function(){var t=[];return this.productsFromSelected&&this.productsFromSelected.data.forEach((function(e){0==e.productimageSet.length?e.image&&(e.usdPrice?t.push(Object(i["a"])(Object(i["a"])({},e),{},{productimageSet:[{image:e.image}]})):t.push(Object(i["a"])(Object(i["a"])({},e),{},{productimageSet:[{image:e.image}],usdPrice:0}))):e.usdPrice?t.push(e):t.push(Object(i["a"])(Object(i["a"])({},e),{},{usdPrice:0}))})),t},filteredProducts:function(){return this.$store.getters.filteredProducts},categories:function(){return this.$store.getters.categories},dealOfTheDay:function(){return this.$store.getters.products},all:function(){return this.$store.getters.sampleProducts},sampleProducts:function(){return this.$store.getters.sampleProducts},sampleCategories:function(){return this.$store.getters.sampleCategories}},data:function(){return{sortBy:["sort by latest","sort by latest","sort by latest","sort by latest","sort by latest"],checkbox1:null,model:null}}},u=d,l=(r("1210"),r("2877")),m=r("6544"),p=r.n(m),g=r("62ad"),f=r("ce7e"),h=r("0fd9"),v=r("7efd"),b=r("9dbe"),C=r("2fa4"),y=Object(l["a"])(u,s,a,!1,null,"3b05740c",null);e["default"]=y.exports;p()(y,{VCol:g["a"],VDivider:f["a"],VRow:h["a"],VSlideGroup:v["b"],VSlideItem:b["a"],VSpacer:C["a"]})}}]);
//# sourceMappingURL=Category.43628512.js.map