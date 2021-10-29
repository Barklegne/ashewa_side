import * as types from "@/store/mutation-types";
import router from "@/router";
// import { login } from "@/services/api/auth";
import { onLogin, createProvider, onLogout } from "../../vue-apollo";
import { buildSuccess, handleError } from "@/utils/utils.js";
import { gql } from "graphql-tag";
import VueCookies from "vue-cookies";

let apolloClient = createProvider().defaultClient;

const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  isTokenSet: (state) => state.isTokenSet,
};

const actions = {
  async updateUser({ commit }, payload) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .mutate({
        mutation: gql`
          mutation{
            updateProfile(email: "${payload.email}",firstName: "${payload.firstName}",lastName: "${payload.lastName}",id:"${payload.id}",phone:"",profilePic:"") {
              payload{
                id
                firstName
                lastName
                username
                phone
                email
                profilePic
              }
            }
          }
        `,
      })
      .then((response) => {
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            auth: false,
            ...response.data.updateProfile.payload,
          })
        );

        commit(types.SAVE_USER, {
          auth: false,
          ...response.data.updateProfile.payload,
        });

        commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        console.log(error);
        handleError(error, commit, resp);
      });
  },
  async userLogin({ commit }, payload) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .mutate({
        mutation: gql`
          mutation{
            tokenAuth(username: "${payload.email}", password: "${payload.password}") {
              token
              user{
                id
                firstName
                lastName
                username
                phone
                email
                profilePic
              }
            }
          }
        `,
      })
      .then((response) => {
        console.log({ auth: false, ...response.data.tokenAuth.user });
        onLogin(apolloClient, response.data.tokenAuth.token);
        window.localStorage.setItem(
          "user",
          JSON.stringify({ auth: false, ...response.data.tokenAuth.user })
        );
        window.localStorage.setItem(
          "token",
          JSON.stringify(response.data.tokenAuth.token)
        );

        commit(types.SAVE_USER, {
          auth: false,
          ...response.data.tokenAuth.user,
        });
        commit(types.SAVE_TOKEN, response.data.tokenAuth.token);
        console.log(response.data.tokenAuth);
        // dispatch("getAllProducts", { page: 1, pageSize: 6 });
        // dispatch("parentCats");
        buildSuccess("Successfully logged in", commit);
        router.push({
          path: "/",
        });

        // }
      })
      .catch((error) => {
        console.log(error);
        handleError(error, commit, resp);
      });
  },
  async autoLogin(ctx) {  
    if(!localStorage.getItem("token")){
      if(VueCookies.get("vendorToken")){
        const tokenE = VueCookies.get("vendorToken");
        onLogin(apolloClient, VueCookies.get("vendorToken"));
        ctx.commit(types.SAVE_TOKEN, tokenE);
        ctx.commit(types.SET_LOCALE, JSON.parse(localStorage.getItem("locale")));
        ctx.dispatch("getMe") 
      }
    }
    else{
      onLogin(apolloClient, localStorage.getItem("apollo-token"));
      const user = JSON.parse(localStorage.getItem("user"));
      ctx.commit(types.SAVE_USER, user);
      ctx.commit(types.SAVE_TOKEN, JSON.parse(localStorage.getItem("token")));
      ctx.commit(types.SET_LOCALE, JSON.parse(localStorage.getItem("locale")));
    }
    
  },
  userLogout({ commit }) {
    onLogout(apolloClient);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    commit(types.LOGOUT);
    router.push({
      name: "login",
    });
  },
  async getMe({commit}) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
        {
          getMe{
            id
            firstName
            lastName
            username
            phone
            email
            profilePic 
          }
        }
        `,
      })
      .then((res) => {
        commit(types.SHOW_LOADING, false);
        commit(types.SAVE_USER, res.data.getMe);
      })
      .catch((error) => {
        console.log(error,"error rrr")
        handleError(error, commit, resp);
      });
  }
};

const mutations = {
  [types.SAVE_TOKEN](state, token) {
    state.token = token;
    state.isTokenSet = true;
    VueCookies.set("token", token, "12h");
    VueCookies.set("eccommerceToken", token, "12h","/",".ashewa.com")
    window.localStorage.setItem(
      "token",
      token
    );
  },
  [types.LOGOUT](state) {
    state.user = null;
    state.token = null;
    state.isTokenSet = false;
  },
  [types.SAVE_USER](state, user) {
    window.localStorage.setItem(
      "user",
      JSON.stringify(user )
    );
    state.user = user;
  },
};

const state = {
  user: null,
  token: JSON.parse(!!localStorage.getItem("token")) || null,
  isTokenSet: !!localStorage.getItem("token"),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
