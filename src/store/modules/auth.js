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
            updateProfile(email: "${payload.email}",firstName: "${payload.firstName}",lastName: "${payload.lastName}",id:"${payload.id}",phone:"") {
              payload{
                id
                firstName
                lastName
                username
                phone
                email
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
  async requestPasswordReset({ commit }, email) {
    commit(types.SHOW_LOADING, true);
    const response = await apolloClient
      .mutate({
        mutation: gql`
      mutation{
        requestPasswordReset(email:"${email}"){
          codeSent
        }
      }
      `,
      })
      .then((res) => {
        commit(types.SHOW_LOADING, false);
        commit(types.CHANGE_RESET_PASSWORD, true);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        handleError(error, commit, response);
      });
  },
  async resetPassword({ commit }, payload) {
    commit(types.SHOW_LOADING, true);
    const response = await apolloClient
      .mutate({
        mutation: gql`
          mutation {
            resetPassword(code: "${payload.code}", email: "${payload.email}", newPassword: "${payload.password}") {
              payload {
                id
                firstName
                lastName
                username
              }
            }
          }
        `,
      })
      .then((res) => {
        commit(types.SHOW_LOADING, false);
        commit(types.SUCCESS, {
          msg: "Password reset, Please login to proceed",
        });
        commit(types.CHANGE_RESET_PASSWORD, false);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        handleError(error, commit, response);
      });
  },
  async userLogin({ commit }, payload) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .mutate({
        mutation: gql`
          mutation {
            userAuth(username: "${payload.email}", password: "${payload.password}") {
              payload {
                token
                user {
                  id
                  firstName
                  lastName
                  username
                  phone
                  email
                }
              }
            }
          }
        `,
      })
      .then((response) => {
        console.log({
          auth: false,
          ...response.data.userAuth.payload.user,
          profilePic: "",
        });
        onLogin(apolloClient, response.data.userAuth.payload.token);
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            auth: false,
            ...response.data.userAuth.payload.user,
            profilePic: "",
          })
        );
        window.localStorage.setItem(
          "token",
          JSON.stringify(response.data.userAuth.payload.token)
        );
        commit(types.SAVE_USER, {
          auth: false,
          ...response.data.userAuth.payload.user,
          profilePic: "",
        });
        commit(types.SAVE_TOKEN, response.data.userAuth.payload.token);
        console.log(response.data.userAuth.payload);
        buildSuccess("Successfully logged in", commit);
        router.push({
          path: "/",
        });
      })
      .catch((error) => {
        console.log({ error: error.message });
        if (error.message === "GraphQL error: User Not Verified") {
          commit(types.VERIFY_PAGE, true);
        }
        handleError(error, commit, resp);
      });
  },
  autoLogin(ctx) {
    if (localStorage.getItem("token")) {
      const resp = apolloClient
        .query({
          query: gql`
            {
              getMe {
                id
                firstName
                lastName
                username
                phone
                email
                profilePic
                isActive
              }
            }
          `,
        })
        .then((response) => {
          ctx.commit(types.SAVE_USER, {
            auth: false,
            ...response.data.getMe,
            profilePic: "",
          });
          window.localStorage.setItem(
            "user",
            JSON.stringify({
              auth: false,
              ...response.data.getMe,
              profilePic: "",
            })
          );
        })
        .catch((error) => {
          debugger;
          console.log(resp);
          console.log(error);
          onLogout(apolloClient);
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("user");
          ctx.commit(types.LOGOUT);
        });
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
  async requestSignupCode({ commit }, payload) {
    commit(types.SHOW_LOADING, true);
    const response = await apolloClient
      .mutate({
        mutation: gql`
          mutation {
            requestSignupCode(email: "${payload}") {
              codeSent
            }
          }
        `,
      })
      .then((res) => {
        commit(types.SHOW_LOADING, false);
        commit(types.REQUEST_SENT, true);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        handleError(error, commit, response);
      });
  },
  async verifyEmail(ctx, payload) {
    ctx.commit(types.SHOW_LOADING, true);
    const response = await apolloClient
      .mutate({
        mutation: gql`
          mutation {
            verifyUser(code: "${payload.code}", email: "${payload.email}") {
              verified
            }
          }
        `,
      })
      .then((res) => {
        ctx.commit(types.SHOW_LOADING, false);
        ctx.commit(types.SUCCESS, { msg: "User suucessfully verified" });
        ctx.commit(types.SET_VERIFY, true);
        console.log(res);
        ctx.dispatch("userLogin", {
          email: payload.userName,
          password: payload.password,
        });
      })
      .catch((error) => {
        console.log(error);
        handleError(error, ctx.commit, response);
      });
  },
  async getMe({ commit }) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .query({
        query: gql`
          {
            getMe {
              id
              firstName
              lastName
              username
              phone
              email
            }
          }
        `,
      })
      .then((res) => {
        commit(types.SHOW_LOADING, false);
        commit(types.SAVE_USER, res.data.getMe);
      })
      .catch((error) => {
        console.log(error, "error rrr");
        handleError(error, commit, resp);
      });
  },
};

const mutations = {
  [types.SAVE_TOKEN](state, token) {
    state.token = token;
    state.isTokenSet = true;
    VueCookies.set("token", token, "12h");
    VueCookies.set("eccommerceToken", token, "12h", "/", ".ashewa.com");
    window.localStorage.setItem("token", token);
  },
  [types.LOGOUT](state) {
    state.user = null;
    state.token = null;
    state.isTokenSet = false;
  },
  [types.CHANGE_RESET_PASSWORD](state, payload) {
    state.passwordReset = payload;
  },
  [types.SAVE_USER](state, user) {
    window.localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
    window.localStorage.setItem(
      "user",
      JSON.stringify({ auth: false, ...user })
    );
  },
  [types.VERIFY_PAGE](state, payload) {
    state.verifyPage = payload;
  },
  [types.REQUEST_SENT](state, payload) {
    state.requestSent = payload;
  },
  [types.SET_VERIFY](state, payload) {
    state.verify = payload;
  },
};

const state = {
  user: null,
  token: JSON.parse(!!localStorage.getItem("token")) || null,
  isTokenSet: !!localStorage.getItem("token"),
  passwordReset: false,
  forgotPassword: false,
  verifyPage: false,
  requestSent: false,
  verify: false,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
