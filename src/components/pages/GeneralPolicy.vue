<template>
  <v-container class="mb-10 mt-2" fluid>
    <v-layout row wrap>
      <v-div style="margin:auto auto;width:80%" class="text-start">
        <h1 style="font-size:40px" class="text-center my-4">
          {{ $t("generalPolicy.GENERAL POLICY") }}
        </h1>
        <p>
          {{ $t("generalPolicy.1") }}
        </p>
      </v-div>
      <v-div style="margin:auto auto;width:80%" class="text-start">
        <p>
          {{ $t("generalPolicy.2") }}
        </p>
      </v-div>

      <v-div style="margin:auto auto;width:80%" class="text-start">
        <p>
          {{ $t("generalPolicy.3") }}
        </p>
      </v-div>
      <v-div style="margin:auto auto;width:80%" class="text-start">
        <h2 class="ml-1 mb-2">{{ $t("generalPolicy.PRE") }}</h2>
        <p>
          {{ $t("generalPolicy.4") }}
        </p>
        <p>
          {{ $t("generalPolicy.5") }}
        </p>
        <p>
          {{ $t("generalPolicy.6") }}
        </p>
        <p>
          {{ $t("generalPolicy.7") }}
        </p>
      </v-div>
      <v-div style="margin:auto auto;width:80%" class="text-start">
        <h2 class="ml-1 mb-2">{{ $t("generalPolicy.RETURN CRITERIA") }}</h2>
        <p>
          {{ $t("generalPolicy.8") }}
        </p>
        <h4 class="mb-2">{{ $t("generalPolicy.ELE") }}</h4>
        <p>
          {{ $t("generalPolicy.9") }}
        </p>
        <h4 class="mb-2">{{ $t("generalPolicy.FR") }}</h4>
        <p>
          {{ $t("generalPolicy.10") }}
        </p>
      </v-div>
      <v-div style="margin:auto auto;width:80%" class="text-start">
        <h2 class="ml-1 mb-2">{{ $t("generalPolicy.REFUND") }}</h2>
        <p>
          {{ $t("generalPolicy.11") }}
        </p>

        <p>
          {{ $t("generalPolicy.12") }}
        </p>
      </v-div>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped></style>
