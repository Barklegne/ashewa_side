(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["landing"],{f44d:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("FirstAd"),s("div",{attrs:{id:"top-categories-of-the-month"}},[s("v-app-bar",{attrs:{color:"#f2f7f4",dense:"",flat:""}},[s("v-toolbar-title",{staticClass:"hidden-md-and-down font-weight-bold"},[t._v(" All Categories ")]),s("v-toolbar-title",{staticClass:"hidden-lg-and-up font-weight-bold",staticStyle:{"font-size":"15px"}},[t._v(" All Categories ")])],1),s("div",{staticClass:"mx-4 my-0"},[s("v-slide-group",t._l(t.categories,(function(e,a){return s("v-slide-item",{key:a,staticClass:"mr-5 mb-4"},[s("v-hover",{attrs:{"open-delay":"200"},scopedSlots:t._u([{key:"default",fn:function(a){var n=a.hover;return[s("div",{staticStyle:{cursor:"pointer"},on:{click:function(s){return t.$router.push({path:"/subcategory/"+e.id})}}},[s("v-card",{staticClass:"hidden-md-and-down",class:{"on-hover":n},attrs:{elevation:n?16:2,shaped:n,width:250,height:200}},[s("v-img",{staticClass:"white--text align-end",attrs:{src:"h"==e.image[0]?e.image:"http://api.ashewa.com/media/"+e.image,"lazy-src":"/img/icons/mobile-logo.png",gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",width:250,height:200}},[s("v-card-title",{staticClass:"text-md-h6 text-subtitle-2",domProps:{textContent:t._s(e.name.length>21?e.name.slice(0,21):e.name)}})],1)],1),s("v-card",{staticClass:"hidden-lg-and-up",attrs:{width:"150",height:"100"}},[s("v-img",{staticClass:"white--text align-end",attrs:{src:"h"==e.image[0]?e.image:"http://api.ashewa.com/media/"+e.image,"lazy-src":"/img/icons/mobile-logo.png",gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)",width:"150",height:"100"}},[s("v-card-title",{staticClass:"text-md-h6 mb-0 text-subtitle-2 font-weight-bold align-content-lg-start",domProps:{textContent:t._s(e.name)}})],1)],1)],1)]}}],null,!0)})],1)})),1)],1)],1),s("SecondAd"),t._l(t.parentCategoriesProducts,(function(t,e){return s("ProductSlide",{key:e,attrs:{title:t.name,data:t.data}})})),t.categories.length!==t.parentCategoriesProducts.length?s("div",{staticClass:"mb-2"},["Deal of the day"!=t.title?s("v-app-bar",{attrs:{color:"#f2f7f4",dense:"",flat:""}},[s("v-toolbar-title",{staticClass:"hidden-md-and-down font-weight-bold"},[t._v("All Products ")]),s("v-toolbar-title",{staticClass:"hidden-lg-and-up font-weight-bold",staticStyle:{"font-size":"15px"}},[t._v("All Products ")]),s("v-spacer")],1):t._e(),s("v-row",{staticClass:"hidden-sm-and-down"},[s("v-slide-group",{staticClass:"pa-4",attrs:{"active-class":"success","show-arrows":""},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},t._l(5,(function(t,e){return s("v-slide-item",{key:e,staticClass:"mr-5 mb-4"},[s("v-sheet",{staticClass:"pa-3",attrs:{color:"grey lighten-4"}},[s("v-skeleton-loader",{staticClass:"mx-auto",attrs:{width:"300",type:"card"}})],1)],1)})),1)],1),s("v-row",{staticClass:"mx-4 py-5 hidden-md-and-up",staticStyle:{"background-color":"#FFFFFF"}},t._l(4,(function(t,e){return s("v-col",{key:e,staticClass:"ma-0 pa-0",attrs:{cols:"6",lg:"3",md:"4",sm:"6"}},[s("v-sheet",{staticClass:"pa-3",attrs:{color:"grey lighten-4"}},[s("v-skeleton-loader",{staticClass:"mx-auto",attrs:{width:"150",type:"card"}})],1)],1)})),1)],1):t._e(),s("ProductSlide",{staticClass:"mb-5",attrs:{title:"New Arrivals",data:t.newArrivals}}),s("ThirdAd",{ref:"users"}),s("SuccessMessage")],2)},n=[],r=s("5530"),o=(s("d3b7"),s("3ca3"),s("ddb0"),s("b0c0"),s("159b"),function(){return s.e("chunk-9f46dbe4").then(s.bind(null,"74ac"))}),i=function(){return s.e("chunk-2d0b2ee8").then(s.bind(null,"25e4"))},d=function(){return s.e("chunk-2d21789f").then(s.bind(null,"c6c9"))},l=function(){return s.e("chunk-3259c7d6").then(s.bind(null,"02cd"))},c=function(){return Promise.resolve().then(s.bind(null,"ffe4"))},u={components:{FirstAd:o,SecondAd:i,ThirdAd:d,ProductSlide:l,SuccessMessage:c},data:function(){return{lastIndex:0}},methods:{getNextCategory:function(){var t=this;window.onscroll=function(){var e=document.documentElement.scrollTop+window.innerHeight>=.5*document.documentElement.offsetHeight;e&&t.categories.length>t.lastIndex&&(t.$store.dispatch("singleCat",{id:t.categories[t.lastIndex].id,name:t.categories[t.lastIndex].name}),t.lastIndex++)}}},mounted:function(){this.getNextCategory()},computed:{categories:function(){var t=[];return this.$store.getters.categories.forEach((function(e){e.image?t.push(Object(r["a"])({},e)):t.push(Object(r["a"])(Object(r["a"])({},e),{},{image:""}))})),t},parentCategoriesProducts:function(){return this.$store.state.categories.parentCategoriesProducts},products:function(){return this.$store.getters.products},totalProducts:function(){return this.$store.getters.totalProducts},dealOfTheDay:function(){return this.$store.getters.dealOfTheDay},newArrivals:function(){return this.$store.state.product.newArrivals},electronics:function(){return this.$store.getters.electronics},clothings:function(){return this.$store.getters.clothings},home:function(){return this.$store.getters.home},sampleCategories:function(){return this.$store.getters.sampleCategories},sampleProducts:function(){return this.$store.getters.sampleProducts}}},h=u,g=s("2877"),m=s("6544"),f=s.n(m),p=s("40dc"),b=s("b0af"),v=s("99d9"),C=s("62ad"),w=s("ce87"),y=s("adda"),x=s("0fd9"),k=s("8dd9"),S=s("3129"),P=s("7efd"),A=s("9dbe"),_=s("2fa4"),$=s("2a7f"),V=Object(g["a"])(h,a,n,!1,null,"260bcdab",null);e["default"]=V.exports;f()(V,{VAppBar:p["a"],VCard:b["a"],VCardTitle:v["e"],VCol:C["a"],VHover:w["a"],VImg:y["a"],VRow:x["a"],VSheet:k["a"],VSkeletonLoader:S["a"],VSlideGroup:P["b"],VSlideItem:A["a"],VSpacer:_["a"],VToolbarTitle:$["c"]})}}]);
//# sourceMappingURL=landing.faa2202d.js.map