(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["NewArrivals"],{"0706":function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("section",{staticClass:"sec",attrs:{id:"products-found"}},[r("div",[r("v-row",{staticClass:"pa-3 mt-2 mx-0",style:t.$vuetify.theme.dark?"background-color:#121212":"background-color:#F5F5F5;"},[r("div",{staticClass:"mt-3"},[t._v(" "+t._s(""+t.products.length)+" Products found ")]),r("v-spacer")],1),r("v-row",t._l(t.products,(function(t,e){return r("v-col",{key:e,attrs:{cols:"6",md:"3"}},[r("ProductMobile",{attrs:{vendor:t.vendor,productName:t.name,productImages:0==t.productimageSet.length?[{image:t.image}]:t.productimageSet,sellingPrice:t.sellingPrice,productId:""+t.id,productCategory:t.category,width:150,productrateSet:t.productrateSet,height:150}})],1)})),1)],1)])])},c=[],a=(r("d3b7"),r("3ca3"),r("ddb0"),function(){return r.e("chunk-682ee36f").then(r.bind(null,"c58c"))}),s={components:{ProductMobile:a},created:function(){this.$store.dispatch("getNewArrivals")},computed:{products:function(){return this.$store.state.product.newArrivals}}},d=s,n=r("2877"),i=r("6544"),u=r.n(i),l=r("62ad"),p=r("0fd9"),v=r("2fa4"),g=Object(n["a"])(d,o,c,!1,null,"e4670a34",null);e["default"]=g.exports;u()(g,{VCol:l["a"],VRow:p["a"],VSpacer:v["a"]})}}]);
//# sourceMappingURL=NewArrivals.53602e0f.js.map