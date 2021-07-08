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
      Vue.set(state, "messages", [value]);
    }
  },
};

const state = {
  messages: [
    // {
    //   title: "Ashewa Store Three",
    //   last: "last text",
    //   src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    //   id: 1,
    // },
  ],
  message: {
    // participants: [
    //   {
    //     name: "Arnaldo",
    //     id: 1,
    //     profilePicture:
    //       "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg",
    //   },
    //   {
    //     name: "José",
    //     id: 2,
    //     profilePicture:
    //       "https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg",
    //   },
    // ],
    // myself: {
    //   name: "Matheus S.",
    //   id: 3,
    //   profilePicture:
    //     "https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg",
    // },
    // messageContent: [
    //   {
    //     content: "Hello, Thankyou for visiting our store",
    //     myself: false,
    //     participantId: 2,
    //     timestamp: {
    //       year: 2011,
    //       month: 3,
    //       day: 5,
    //       hour: 10,
    //       minute: 10,
    //       second: 3,
    //       millisecond: 123,
    //     },
    //     uploaded: true,
    //     viewed: true,
    //     type: "text",
    //   },
    //   {
    //     content: "last text",
    //     myself: true,
    //     participantId: 3,
    //     timestamp: {
    //       year: 2010,
    //       month: 0,
    //       day: 5,
    //       hour: 19,
    //       minute: 10,
    //       second: 3,
    //       millisecond: 123,
    //     },
    //     uploaded: true,
    //     viewed: true,
    //     type: "text",
    //   },
    // ],
  },
};

export default {
  state,
  getters,
  mutations,
};
