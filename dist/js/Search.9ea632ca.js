(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Search"],{f678:function(t,e,r){"use strict";r.r(e);var c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("section",{staticClass:"sec",attrs:{id:"products-found"}},[r("div",[r("v-row",{staticClass:"pa-3 mt-2 mx-0",style:t.$vuetify.theme.dark?"background-color:#121212":"background-color:#F5F5F5;"},[r("div",{staticClass:"mt-3"},[t._v(" "+t._s(""+t.products.length)+" Products found ")]),r("v-spacer")],1),r("v-row",{staticClass:"ma-2"},t._l(t.products,(function(t,e){return r("v-col",{key:e,staticClass:"pa-2",attrs:{cols:"6",md:"3"}},[r("ProductMobile",{attrs:{vendor:t.vendor,productName:t.name,productImages:0==t.productimageSet.length?[{image:t.image}]:t.productimageSet,sellingPrice:t.sellingPrice,usdPrice:t.usdPrice,productId:""+t.id,productCategory:t.category,productrateSet:t.productrateSet}})],1)})),1)],1)])])},a=[],s=(r("d3b7"),r("3ca3"),r("ddb0"),r("ac1f"),r("841c"),function(){return r.e("chunk-685db00a").then(r.bind(null,"49ef"))}),o={components:{ProductMobile:s},created:function(){this.searchBy(JSON.parse(this.$route.params.id))},methods:{searchBy:function(t){this.$store.dispatch("searchFilter",t),this.$gtag.event("Serch",{event_category:"Product Search",event_label:"Number of User Searched on Ashewa"})}},computed:{products:function(){return this.$store.state.search.products}}},d=o,n=r("2877"),u=r("6544"),i=r.n(u),l=r("62ad"),p=r("0fd9"),h=r("2fa4"),f=Object(n["a"])(d,c,a,!1,null,"01dc661f",null);e["default"]=f.exports;i()(f,{VCol:l["a"],VRow:p["a"],VSpacer:h["a"]})}}]);
//# sourceMappingURL=Search.9ea632ca.js.map