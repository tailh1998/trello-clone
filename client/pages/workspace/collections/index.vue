<template>
  <div>This is a collections</div>
</template>

<script setup lang="ts">
import { TITLE } from "~/constants/app"

const PAGE_TITLE = `Collections | ${TITLE}`

useHead({ titleTemplate: () => PAGE_TITLE })
</script>
