<template>
  <div>This is a template</div>
</template>

<script setup lang="ts">
import { TITLE } from "~/constants/app"

const PAGE_TITLE = `Templates | ${TITLE}`

useHead({ titleTemplate: () => PAGE_TITLE })
</script>
