<template>
  <div class="my-10">
    <v-row class="ma-10">
      <v-col>
        <v-card elevation="10" class="mx-auto" width="350">
          <v-img src="/images/marcus.jpg" height="400px"></v-img>
          <div><h3>Jhon Doe (CEO)</h3></div>
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 " icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="10" class="mx-auto" width="350">
          <v-img src="/images/marcus.jpg" height="400px"></v-img>
          <div><h3>Jhon Doe (CEO)</h3></div>
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 " icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="10" class="mx-auto" width="350">
          <v-img src="/images/marcus.jpg" height="400px"></v-img>
          <div><h3>Jhon Doe (CEO)</h3></div>
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 " icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-10">
      <v-col>
        <v-card elevation="10" class="mx-auto" width="350">
          <v-img src="/images/marcus.jpg" height="400px"></v-img>
          <div><h3>Jhon Doe (CEO)</h3></div>
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 " icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="10" class="mx-auto" width="350">
          <v-img src="/images/marcus.jpg" height="400px"></v-img>
          <div><h3>Jhon Doe (CEO)</h3></div>
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 " icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="10" class="mx-auto" width="350">
          <v-img src="/images/marcus.jpg" height="400px"></v-img>
          <div><h3>Jhon Doe (CEO)</h3></div>
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 " icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
};
</script>

<style lang="scss" scoped></style>
