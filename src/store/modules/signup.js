import * as types from "@/store/mutation-types";

import { createProvider } from "../../vue-apollo";
import { handleError } from "@/utils/utils.js";
import { gql } from "graphql-tag";

//function to change image to base64

let apolloClient = createProvider().defaultClient;

const actions = {
  async userSignUp(ctx, payload) {
    ctx.commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
      .mutate({
        mutation: gql`
        mutation {
          userSignup(username: "${payload.userName}", email: "${payload.email}", firstName: "${payload.firstName}", lastName: "${payload.lastName}", phone: "${payload.phone}", password: "${payload.password}") {
            payload {
              username
              firstName
              lastName
              id
              phone
            }
          }
        }
        `,
      })
      .then(() => {
        ctx.dispatch("userLogin", {
          email: payload.userName,
          password: payload.password,
        });
      })
      .catch((error) => {
        handleError(error, ctx.commit, resp);
      });
  },
};

export default {
  actions,
};
