<template>
  <div>This is a members</div>
</template>

<script setup lang="ts">
import { TITLE } from "~/constants/app"

const PAGE_TITLE = `Members | ${TITLE}`

useHead({ titleTemplate: () => PAGE_TITLE })
</script>
