<template>
  <div>
    <div
      style="border:1px solid grey;padding:25px"
      class="hidden-md-and-down my-4 ml-10 mr-15"
    >
      <v-row class="mx-0 pl-10">
        <v-col>
          <div class="text-start">
            <v-icon style="font-size:35px;color:#43DB80"
              >mdi-rocket-launch</v-icon
            >
            <p class="ma-0 mt-4 pa-0" style="font-size:16px;font-weight:700">
              Free Deliver
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              For all orders over ETB 5000
            </p>
          </div>
        </v-col>
        <v-col>
          <div class="text-start">
            <v-icon style="font-size:35px;color:#43DB80">mdi-reload</v-icon>
            <p class="ma-0 mt-4 pa-0" style="font-size:16px;font-weight:700">
              90 Days Return
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              If goods have problems
            </p>
          </div>
        </v-col>
        <v-col>
          <div class="text-start">
            <v-icon style="font-size:35px;color:#43DB80"
              >mdi-credit-card-check</v-icon
            >
            <p class="ma-0 mt-4 pa-0" style="font-size:16px;font-weight:700">
              Secure Payment
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              100% secure payment
            </p>
          </div>
        </v-col>
        <v-col>
          <div class="text-start">
            <v-icon style="font-size:35px;color:#43DB80"
              >mdi-chat-processing-outline</v-icon
            >
            <p class="ma-0 mt-4 pa-0" style="font-size:16px;font-weight:700">
              24/7 Support
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              Dedicated support
            </p>
          </div>
        </v-col>
        <v-col>
          <div class="text-start">
            <v-icon style="font-size:35px;color:#43DB80">mdi-gift</v-icon>
            <p class="ma-0 mt-4 pa-0" style="font-size:16px;font-weight:700">
              Gift Service
            </p>
            <p class="ma-0 pa-0" style="font-size:15px;font-weight:400">
              Support gift service
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- mobile view -->
    <div
      style="overflow-x: scroll; overflow-y:hidden;display:flex;"
      class="hidden-md-and-up center"
    >
      <v-chip
        class=""
        color="white"
        style="color:#43DB80;font-size:13px;font-weight:600;height:3rem;text-align:left"
        label
      >
        Free <br />
        Delivery
        <v-icon right size="20px" color="#43DB80" class="pl-1" dense>
          mdi-scooter
        </v-icon>
      </v-chip>

      <v-chip
        class=""
        color="white"
        style="color:#43DB80;font-size:13px;font-weight:600;height:3rem;text-align:left;"
        label
      >
        90 Days <br />Return
        <v-icon right size="20px" color="#43DB80" class="pl-1" dense>
          mdi-reload
        </v-icon>
      </v-chip>

      <v-chip
        class=""
        color="white"
        style="color:#43DB80;font-size:13px;font-weight:600;height:3rem;text-align:left;"
        label
      >
        Secured <br />
        Payment
        <v-icon right size="20px" color="#43DB80" class="pl-1" dense>
          mdi-credit-card-check
        </v-icon>
      </v-chip>

      <v-chip
        class=""
        color="white"
        style="color:#43DB80;font-size:13px;font-weight:600;height:3rem;text-align:left;"
        label
      >
        24/7 <br />
        Support
        <v-icon right size="20px" color="#43DB80 " class="pl-1" dense>
          mdi-chat-processing-outline
        </v-icon>
      </v-chip>

      <v-chip
        class=""
        color="white"
        style="color:#43DB80;font-size:13px;font-weight:600;height:3rem;text-align:left;"
        label
      >
        Gift <br />
        Service
        <v-icon right size="20px" color="#43DB80" class="pl-1" dense>
          mdi-gift
        </v-icon>
      </v-chip>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
