<template>
  <div class="text-h4 font-weight-bold mb-2">Sign up</div>
  <div class="text-subtitle-1 mb-6">Send a request for user account creation</div>

  <!-- z: This code below just a raw UI , i will fix after -->
  <!-- <form @submit.prevent="submit"> -->
  <form>
    <div class="d-flex ga-1 flex-column">
      <v-text-field label="Email" />

      <v-text-field label="Username" />

      <v-text-field label="Password" />

      <v-text-field label="Confirm Password" />

      <v-text-field label="Your phone number" />
    </div>

    <div class="d-flex justify-center">
      <v-btn
        width="300"
        height="48"
        type="submit"
        color="blue"
        variant="elevated"
        class="me-4"
      >
        Sign Up
      </v-btn>
    </div>
    <div class="text-subtitle-1 text-center pt-6 d-flex justify-center align-center ga-2">
      Already have an account?
      <span class="link text-decoration-underline text-grey-darken-2">Login</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { TITLE } from "~/constants/app"

definePageMeta({ layout: "access" })

const PAGE_TITLE = `Sign Up | ${TITLE}`

useHead({ titleTemplate: () => PAGE_TITLE })

useSeoMeta({ title: PAGE_TITLE, ogTitle: PAGE_TITLE })
</script>
