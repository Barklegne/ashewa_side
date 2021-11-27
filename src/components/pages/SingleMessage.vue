<template>
  <div>
    <div style="background-color:#F7F3F3;">
      <v-app-bar fixed dark style="font-weight:600;z-index:2000" color="#43DB80"
        ><v-icon @click="$router.go(-1)" left>mdi-arrow-left</v-icon> Ashewa
        Store | {{this.$router.history.current.params.productName}}</v-app-bar
      >
      <v-footer style="z-index:1000" class="pa-0" fixed>
        <div style="width:100vw;height:92vh" class="mt-1">
          <Chat
            :participants="participants"
            :myself="myself"
            :messages="messages"
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
  </div>
</template>

<script>
import { Chat } from "vue-quick-chat";
import "vue-quick-chat/dist/vue-quick-chat.css";
import { mapGetters } from "vuex";
import ReconnectingWebSocket from 'reconnecting-websocket';
import gql from "graphql-tag";

export default {
  apollo: {
  // Query with parameters 
  messages: {
    query: gql`query ($otherUsername: String!) {
  messages:allChat(otherUsername: $otherUsername) {
    content:message
    participantId: id
    timestamp: timestamp
    myself:readStatus
    user{
      username
    }
    thread{
      first{
        id
        username
        profilePic
      }
      second{
        id
        username
        profilePic
      }
    }
  }
}`,
    variables() {
      //console.log(this.user.username,"varrrrrrrrrrrrrrrrrrr",this.$router.history.current.params.id)
      const OtherUsername = this.$router.history.current.params.id;
      return {otherUsername: OtherUsername}
    },
  },

},
  components: {
    Chat,
  },
  computed: {
    ...mapGetters([
      "isTokenSet",
      "user",
    ]),
    participants() {
    /*if (this.$store.state.message.message) {
        return this.$store.state.message.message.participants;
      }
      return {}; */
      const users = this.messages && this.messages[0]
      console.log(this.messages,users,"///////////////////////")
      if( this.messages.length != 0 ){
              return [
                {
                    name: users.thread.first.username,
                    id: users.thread.first.id,
                    profilePicture: users.thread.first.profilePic
                },
                {
                    name: users.thread.second.username,
                    id: users.thread.second.id,
                    profilePicture: users.thread.second.profilePic
                }
            ]
      }
    else  {
      return [
              {
                    name: "him",
                    id: "users.thread.first.id",
                    profilePicture: ""
                },
                {
                    name: this.user.username,
                    id: this.user.id,
                    profilePicture: ""
                }
            ]
    }
    },
    myself() {
/*       if (this.$store.state.message.message) {
        return this.$store.state.message.message.myself;
      }
      return {}; */
      return {
                    name: this.user.username,
                    id: this.user.id,
                    profilePicture: ""            
            }  
    },
    messageContent() {
      if (this.$store.state.message.message) {
        return this.$store.state.message.message.messageContent;
      }
      return [];
    },
  },
  data() {
    return {
      visible: true,
      chatTitle: "My chat title",
      placeholder: "send your message",
      messages: [],
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
      toLoad: [],
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
        relative: true,
      },
      // there are other options, you can check them here
      // https://soapbox.github.io/linkifyjs/docs/options.html
      linkOptions: {
        myself: {
          className: "myLinkClass",
          events: {
            click: function() {
              //alert("Link clicked!");
            },
            mouseover: function() {
              //alert("Link hovered!");
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
              //alert("Link clicked!");
            },
            mouseover: function() {
              //alert("Link hovered!");
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
    created: function() {
    //const OtherUsername = this.$router.history.current.params.id
    //this.user = this.$store.getters.messages
    const otherUsername = this.$router.history.current.params.id
    console.log("Starting connection to WebSocket Server",otherUsername,this.user.id)
    this.connection = new ReconnectingWebSocket('wss://'
            + 'api.ashewa.com'
            + '/ws'
            + '/chat/'+this.user.id+'/'+otherUsername+'/')

    this.connection.onmessage = (event) =>{
      const data = JSON.parse(event.data)
      //console.log(this.newmessages,"==========onmessage")
      //console.log(data,"==========onmessage", data.username , this.user.username)
      console.log(data.timestamp,data,"===-------------======-----------===",
      data.username !== this.user.username, data.username , this.user.username, data.message)
      
     if(data.message === true || data.message === false){
          console.log()
      }
      else if (data.username !== this.user.username && data.room_name !== "notification_room"){
          let chatFrame = {
                    content: 'received messages',
                    myself: false,
                    participantId: data.timestamp,
                    timestamp: {year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                 
                }
           chatFrame.content = data.message
           //chatFrame.participantId = this.messages && this.messages[0].thread.second.id
           this.messages.push(chatFrame)
           console.log(this.messages,"this.messagesthis.messagesthis.messages")
      }
      //console.log(data.username,"=========",this.newmessages);
    }

    this.connection.onopen = function(event) {
      //console.log(event)
      console.log(event,"Successfully connected to the echo websocket server...")
    }


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
      //console.log(this.connection, window.location.href,"submit",message,productLink,this.$router.history.current);
      const otherUsername = this.$router.history.current.params.id
      const productLink = this.$router.history.current.params.productLink
      if(this.messages.some(message => !message.content.includes(productLink))){
        ///
      }else if(productLink !== undefined){
         message.content = productLink +'  '+ message.content
      }
     
      this.connection.send(JSON.stringify({
                  'message': message.content ,
                  'username': this.user.username,
                  'timestamp': otherUsername,
                  'room_name': "otherUsername",
                  'user_id': this.user.id,
      })); 


      this.messages.push(message);

      /*
       * you can update message state after the server response
       */
      // timeout simulating the request
      setTimeout(() => {
        message.uploaded = true;
        console.log(message, "submit");
      }, 2000);
    },
    onClose() {
      this.visible = false;
    },
    onImageSelected(files, message) {
      let src =
        "https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg";
      console.log(message, "image selected");
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
