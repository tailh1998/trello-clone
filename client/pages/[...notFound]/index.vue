<template>
  <div>404 Not Found!</div>
</template>

<script setup lang="ts">
import { TITLE } from "~/constants/app"

definePageMeta({
  title: "404 Not Found"
})

const PAGE_TITLE = `404 | ${TITLE}`

useHead({
  titleTemplate: () => PAGE_TITLE
})

useSeoMeta({
  title: PAGE_TITLE,
  ogTitle: PAGE_TITLE
})
</script>
