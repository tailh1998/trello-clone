<template>
  <v-layout class="rounded rounded-md h-100">
    <app-bar />
    <v-main
      class="d-flex bg-boardBar"
      style="min-height: 300px"
    >
      <NuxtLayout :name="dynamicLayout">
        <slot />
      </NuxtLayout>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { TITLE, DESCRIPTION } from "~/constants/app"

useHead({
  titleTemplate: () => TITLE,
  htmlAttrs: { class: "scroll-bar" }
})

useSeoMeta({
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: TITLE,
  ogDescription: DESCRIPTION,
  ogImage: "[og:image]",
  ogUrl: "[og:url]"
})

const route = useRoute()
const dynamicLayout = computed(() => (route.name === "boards-id" ? "board" : "home"))
</script>
