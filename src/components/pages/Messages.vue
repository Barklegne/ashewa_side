<template>
  <div>
    <v-app-bar flat> Messages</v-app-bar>
    <div
      v-if="messages.length == 0"
      style="margin:50px auto"
      class="text-center"
      
    >
      <v-img
        width="50vw"
        style="margin:auto auto"
        src="/images/no_message.png"
      ></v-img>
      <p class="ma-0 pa-0">No messages now</p>
      <p>Choose a product you like and contact the supplier</p>
      <button v-on:click="sendMessage()">Send Message</button>
    </div>
<button v-on:click="sendMessage()">Send Message</button>
    <v-list class="text-start" v-for="(message, i) in newmessages" :key="i">
      <v-list-item
        @click="
          $router.push({
            path: '/messages/'+message.id+'/',
            params: { id: message.id },
          })
        "
      >
      
        <v-list-item-avatar>
          <v-list-item-avatar size="50">
            <v-img :src="message.src"></v-img>
          </v-list-item-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ message.username }}</v-list-item-title>
          <v-list-item-subtitle>recently</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    


  </div>
</template>

<script>
import gql from "graphql-tag"

export default {

apollo: {
  // Query with parameters
  newmessages: {
    query: gql`query  {
            newmessages:messageHistory{
                id
                username
            }
}`,
  }
},
  data() {
    return {
      newmessages: [],
      message: [{'username':'kid','title':'Admin','last':'recently'},{'username':'hiruy','title':'Store','last':'recently'}]};
  },
  computed: {
    messages() {
      //return this.$store.getters.messages;
      
      return this.message;
    },
  },
  methods: {
    sendMessage: function() {
      console.log(this.connection,'test',this.newmessages);

    }
  },
  created: function() {
    console.log("-======------------=========------",this.newmessages)

  },
};
</script>

<style lang="scss" scoped></style>
