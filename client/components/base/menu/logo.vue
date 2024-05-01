<template>
  <nuxt-link :to="DEFAULT_URI">
    <v-btn
      prepend-icon="mdi-trello"
      variant="text"
    >
      Trello
    </v-btn>
  </nuxt-link>
</template>

<script setup lang="ts">
import { DEFAULT_URI } from "~/constants/route"
</script>
