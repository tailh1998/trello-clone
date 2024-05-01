<template>
  <div>This is a highlights</div>
</template>

<script setup lang="ts">
import { TITLE } from "~/constants/app"

const PAGE_TITLE = `Highlights | ${TITLE}`

useHead({ titleTemplate: () => PAGE_TITLE })
</script>
