<template>
  <div>This is a views</div>
</template>

<script setup lang="ts">
import { TITLE } from "~/constants/app"

const PAGE_TITLE = `Views | ${TITLE}`

useHead({ titleTemplate: () => PAGE_TITLE })
</script>
