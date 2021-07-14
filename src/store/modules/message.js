import * as types from "@/store/mutation-types";
import Vue from "vue";

const getters = {
  messages: (state) => state.messages,
  messageContents: (state) => state.messageContents,
};

const mutations = {
  [types.SAVE_ALL_MESSAGES](state, value) {
    state.messages = value;
  },
  [types.CREATE_A_MESSAGE](state, value) {
    var msg = {
      participants: value.participants,
      myself: value.myself,
      messageContent: [],
    };
    state.message = msg;
  },
  [types.INQUIRE_A_MESSAGE](state, value) {
    var msg = {
      participants: value.participants,
      myself: value.myself,
      messageContent: value.messageContent,
    };
    state.message = msg;
  },
  [types.PUSH_A_MESSAGE](state, value) {
    const i = state.messages.findIndex((p) => p.id == value.id);
    const messages = state.messages;
    if (i > -1) {
      messages[i] = value;
      Vue.set(state, "messages", [...messages]);
    } else {
      Vue.set(state, "messages", [...messages, value]);
    }
  },
};

const state = {
  messages: [],
  message: {},
};

export default {
  state,
  getters,
  mutations,
};
