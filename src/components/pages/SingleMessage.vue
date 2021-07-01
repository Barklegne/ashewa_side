<template>
  <div style="background-color:#F7F3F3;height:100vh">
    <v-app-bar fixed dark style="font-weight:600;z-index:2000" color="#43DB80"
      ><v-icon @click="$router.go(-1)" left>mdi-arrow-left</v-icon> Ashewa
      Store</v-app-bar
    >
    <v-footer style="z-index:1000" class="pa-0 hidden-lg-and-up" fixed>
      <div style="width:100vw" class="mt-1">
        <Chat
          :participants="participants"
          :myself="myself"
          :messages="myMessages"
          :chat-title="chatTitle"
          :placeholder="placeholder"
          :colors="colors"
          :border-style="borderStyle"
          :hide-close-button="hideCloseButton"
          :close-button-icon-size="closeButtonIconSize"
          :submit-icon-size="submitIconSize"
          :submit-image-icon-size="submitImageIconSize"
          :load-more-messages="null"
          :link-options="linkOptions"
          :async-mode="asyncMode"
          :scroll-bottom="scrollBottom"
          :display-header="false"
          :send-images="true"
          :profile-picture-config="profilePictureConfig"
          :timestamp-config="timestampConfig"
          @onImageClicked="onImageClicked"
          @onImageSelected="onImageSelected"
          @onMessageSubmit="onMessageSubmit"
          @onType="onType"
          @onClose="onClose"
        >
          <template v-slot:header>
            <div>
              <p
                class="mt-2"
                style="font-weight:600;color:white;font-size:18px"
              >
                Ashewa Store
              </p>
            </div>
          </template>
        </Chat>
      </div>
    </v-footer>
  </div>
</template>

<script>
import { Chat } from "vue-quick-chat";
import "vue-quick-chat/dist/vue-quick-chat.css";

export default {
  components: {
    Chat,
  },
  computed: {
    myMessages() {
      if (this.$route.params.id == 2) {
        return [
          {
            content: "Hello, Thankyou for visiting our store",
            myself: false,
            participantId: 2,
            timestamp: {
              year: 2011,
              month: 3,
              day: 5,
              hour: 10,
              minute: 10,
              second: 3,
              millisecond: 123,
            },
            uploaded: true,
            viewed: true,
            type: "text",
          },
        ];
      }
      if (this.$route.params.id == 1) {
        return [
          {
            content: "Hello, Thankyou for visiting our store",
            myself: false,
            participantId: 2,
            timestamp: {
              year: 2011,
              month: 3,
              day: 5,
              hour: 10,
              minute: 10,
              second: 3,
              millisecond: 123,
            },
            uploaded: true,
            viewed: true,
            type: "text",
          },
          {
            content: "How much is your product?",
            myself: true,
            participantId: 3,
            timestamp: {
              year: 2010,
              month: 0,
              day: 5,
              hour: 19,
              minute: 10,
              second: 3,
              millisecond: 123,
            },
            uploaded: true,
            viewed: true,
            type: "text",
          },
        ];
      }
      return [
        {
          content: "Hello, Thankyou for visiting our store",
          myself: false,
          participantId: 2,
          timestamp: {
            year: 2011,
            month: 3,
            day: 5,
            hour: 10,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
          type: "text",
        },
        {
          content: `I would like to inquire about ${this.$route.params.id}`,
          myself: true,
          participantId: 3,
          timestamp: {
            year: 2010,
            month: 0,
            day: 5,
            hour: 19,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
          type: "text",
        },
      ];
    },
  },
  data() {
    return {
      visible: true,
      participants: [
        {
          name: "Arnaldo",
          id: 1,
          profilePicture:
            "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg",
        },
        {
          name: "José",
          id: 2,
          profilePicture:
            "https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg",
        },
      ],
      myself: {
        name: "Matheus S.",
        id: 3,
        profilePicture:
          "https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg",
      },
      messages: [
        // {
        //   content: "received messages",
        //   myself: false,
        //   participantId: 1,
        //   timestamp: {
        //     year: 2019,
        //     month: 3,
        //     day: 5,
        //     hour: 20,
        //     minute: 10,
        //     second: 3,
        //     millisecond: 123,
        //   },
        //   type: "text",
        // },
        // {
        //   content: "sent messages",
        //   myself: true,
        //   participantId: 3,
        //   timestamp: {
        //     year: 2019,
        //     month: 4,
        //     day: 5,
        //     hour: 19,
        //     minute: 10,
        //     second: 3,
        //     millisecond: 123,
        //   },
        //   type: "text",
        // },
        // {
        //   content: "other received messages",
        //   myself: false,
        //   participantId: 2,
        //   timestamp: {
        //     year: 2019,
        //     month: 5,
        //     day: 5,
        //     hour: 10,
        //     minute: 10,
        //     second: 3,
        //     millisecond: 123,
        //   },
        //   type: "text",
        // },
      ],
      chatTitle: "My chat title",
      placeholder: "send your message",
      colors: {
        header: {
          bg: "#43DB80",
          text: "#fff",
        },
        message: {
          myself: {
            bg: "#43DB80",
            text: "#fff",
          },
          others: {
            bg: "#fff",
            text: "#bdb8b8",
          },
          messagesDisplay: {
            bg: "#f7f3f3",
          },
        },
        submitIcon: "#43DB80",
        submitImageIcon: "#43DB80",
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      hideCloseButton: false,
      submitIconSize: 25,
      closeButtonIconSize: "20px",
      asyncMode: false,
      toLoad: [
        {
          content: "Hello, Thankyou for visiting our store",
          myself: false,
          participantId: 2,
          timestamp: {
            year: 2011,
            month: 3,
            day: 5,
            hour: 10,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
          type: "text",
        },
        {
          content: "How much is your product?",
          myself: true,
          participantId: 3,
          timestamp: {
            year: 2010,
            month: 0,
            day: 5,
            hour: 19,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
          type: "text",
        },
      ],
      scrollBottom: {
        messageSent: true,
        messageReceived: false,
      },
      displayHeader: true,
      profilePictureConfig: {
        others: true,
        myself: true,
        styles: {
          width: "30px",
          height: "30px",
          borderRadius: "50%",
        },
      },
      timestampConfig: {
        format: "HH:mm",
        relative: false,
      },
      // there are other options, you can check them here
      // https://soapbox.github.io/linkifyjs/docs/options.html
      linkOptions: {
        myself: {
          className: "myLinkClass",
          events: {
            click: function() {
              alert("Link clicked!");
            },
            mouseover: function() {
              alert("Link hovered!");
            },
          },
          format: function(value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          },
        },
        others: {
          className: "othersLinkClass",
          events: {
            click: function() {
              alert("Link clicked!");
            },
            mouseover: function() {
              alert("Link hovered!");
            },
          },
          format: function(value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          },
        },
      },
    };
  },
  methods: {
    onType: function() {
      //here you can set any behavior
    },
    loadMoreMessages(resolve) {
      setTimeout(() => {
        resolve(this.toLoad); //We end the loading state and add the messages
        //Make sure the loaded messages are also added to our local messages copy or they will be lost
        this.messages.unshift(...this.toLoad);
        this.toLoad = [];
      }, 1000);
    },
    onMessageSubmit: function(message) {
      /*
       * example simulating an upload callback.
       * It's important to notice that even when your message wasn't send
       * yet to the server you have to add the message into the array
       */
      this.messages.push(message);

      /*
       * you can update message state after the server response
       */
      // timeout simulating the request
      setTimeout(() => {
        message.uploaded = true;
      }, 2000);
    },
    onClose() {
      this.visible = false;
    },
    onImageSelected(files, message) {
      let src =
        "https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg";
      this.messages.push(message);
      /**
       * This timeout simulates a requisition that uploads the image file to the server.
       * It's up to you implement the request and deal with the response in order to
       * update the message status and the message URL
       */
      setTimeout(
        (res) => {
          message.uploaded = true;
          message.src = res.src;
        },
        3000,
        { src }
      );
    },
    onImageClicked(message) {
      /**
       * This is the callback function that is going to be executed when some image is clicked.
       * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
       */
      console.log("Image clicked", message.src);
    },
  },
};
</script>
