<template></template>

<script setup lang="ts">
definePageMeta({ middleware: "redirect" })
import { TITLE, DESCRIPTION } from "~/constants/app"

const PAGE_TITLE = `Home | ${TITLE}`

useHead({
  titleTemplate: () => PAGE_TITLE
})

useSeoMeta({
  title: PAGE_TITLE,
  description: DESCRIPTION,
  ogTitle: PAGE_TITLE,
  ogDescription: DESCRIPTION
})
</script>
