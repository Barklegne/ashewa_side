(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-682ee36f"],{7492:function(t,e,r){"use strict";r("8083")},8083:function(t,e,r){},c58c:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.productImages.length>0?r("div",{staticClass:"mr-3 mb-3 white",staticStyle:{"background-color":"#FFFFFF"}},[r("v-card",{staticClass:" white rounded-lg my-5",attrs:{flat:"",elevation:6,"background-color":"#43DB80"},on:{mouseenter:function(e){t.mo=!0},mouseleave:function(e){t.mo=!1}}},[r("v-card",{staticClass:"white"},[r("v-img",{staticClass:"white--text align-start text-start  rounded-lg",attrs:{src:"h"==t.productImages[0].image[0]?t.productImages[0].image:"http://api.ashewa.com/media/"+t.productImages[0].image,"lazy-src":"/img/icons/mobile-logo.png","aspect-ratio":"1.0"},on:{click:function(e){return t.$router.push({path:"/ProductDetails/"+t.productId})}}},[r("v-chip",{staticClass:"ma-2 pa-2",attrs:{"x-small":"",color:"white"}},[(t.productrateSet.length,r("v-rating",{attrs:{value:t.averageRating,readonly:"","background-color":"green lighten-3",color:"#09B750","x-small":""}}))],1)],1)],1),r("p",{staticClass:"ma-0 pa-0 ml-3 mt-2 text-start",staticStyle:{"font-size":"14px",color:"#000000"}},[t._v(" "+t._s(t.productName.length>19?t.productName.slice(0,16)+"...":t.productName.charAt(0).toUpperCase()+t.productName.slice(1).toLowerCase())+" ")]),r("v-row",[r("v-card-title",{staticClass:"text-md-h6 ma-0 pa-0 pl-0  ml-1 text-subtitle-1 ",staticStyle:{"font-size":"8px","font-weight":"500",color:"#09B750"}},[r("div",{staticClass:"ma-0 ml-5 mt-3 text-subtitle-2",staticStyle:{"font-weight":"550"}},[t._v(" "+t._s("USD"===t.currency?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(parseFloat(t.usdPrice).toFixed(2)):new Intl.NumberFormat("en-US",{style:"currency",currency:"ETB"}).format(t.sellingPrice))+" ")])]),r("v-row",{staticClass:"pa-0 ma-0 ml-8"},[r("v-col",{attrs:{cols:"4"}},[r("v-btn",{staticClass:"mx-auto",attrs:{icon:""},on:{click:function(e){return t.addToCart({image:t.productImages[0].image,price:t.sellingPrice,title:t.productName,id:t.productId,category:t.productCategory.categoryName})}}},[r("v-icon",{staticStyle:{color:"#09B750"},attrs:{size:"22"}},[t._v("mdi-cart-outline")])],1)],1),r("v-col",{attrs:{cols:"4"}},[r("v-btn",{attrs:{icon:""},on:{click:function(e){return t.addToWish({image:t.productImages[0].image,price:t.sellingPrice,title:t.productName,id:t.productId,category:t.productCategory.categoryName})}}},[r("v-icon",{staticStyle:{color:"#09B750"},attrs:{size:"22"}},[t._v("mdi-heart-outline")])],1)],1)],1)],1),t._e()],1)],1):t._e()},o=[],i=r("2909"),s=(r("a9e3"),r("7db0"),r("c740"),{computed:{totalWishList:function(){return this.$store.getters.totalWishList},currency:function(){return this.$store.state.product.currency},averageRating:function(){if(1===this.productrateSet.length)return this.productrateSet[0].rate;if(this.productrateSet.length>0){var t=function(t){return t.reduce((function(t,e){return t.rate+e.rate}))/t.length};return t(Object(i["a"])(this.productrateSet))}return 0},totalCartList:function(){switch(this.$store.getters.totalCartList.length){case 0:return[];default:return this.$store.getters.totalCartList}}},props:{vendor:{type:Object,required:!0},usdPrice:{type:Number,default:0},sellingPrice:{type:Number,required:!0},productId:{type:String,required:!0},productrateSet:{type:Array,required:!0},productName:{type:String,required:!0},productImages:{type:Array,required:!0},productCategory:{type:Object,required:!0},width:{type:Number,default:250},height:{type:Number,default:300}},data:function(){return{sh:!1,mo:!1}},methods:{addToCart:function(t){this.$store.state.auth.isTokenSet?(this.$store.dispatch("addToCart",t),this.$gtag.event("Add to Cart",{event_category:"Product added to cart",event_label:"Add to Cart"})):this.$router.push({path:"/login"})},addToWish:function(t){if(this.$store.state.auth.isTokenSet)if(console.log(this.totalWishList),this.totalWishList.find((function(e){return e.productId==t.id}))){console.log("here");var e=this.totalWishList.findIndex((function(e){return e.productId==t.id}));this.$store.commit("INCREMENT_QUANTITY",e)}else this.$store.commit("ADD_PRODUCT_TO_WISH_LIST",t);else this.$router.push({path:"/login"})}}}),c=s,n=(r("7492"),r("2877")),u=r("6544"),d=r.n(u),l=r("8336"),p=r("b0af"),m=r("99d9"),h=r("cc20"),g=r("62ad"),f=r("ce7e"),y=r("132d"),v=r("adda"),C=r("1d4d"),b=r("0fd9"),w=Object(n["a"])(c,a,o,!1,null,"526415df",null);e["default"]=w.exports;d()(w,{VBtn:l["a"],VCard:p["a"],VCardTitle:m["e"],VChip:h["a"],VCol:g["a"],VDivider:f["a"],VIcon:y["a"],VImg:v["a"],VRating:C["a"],VRow:b["a"]})}}]);
//# sourceMappingURL=chunk-682ee36f.b4f2e641.js.map