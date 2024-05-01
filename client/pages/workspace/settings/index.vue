<template>
  <div>This is a settings</div>
</template>

<script setup lang="ts">
import { TITLE } from "~/constants/app"

const PAGE_TITLE = `Settings | ${TITLE}`

useHead({ titleTemplate: () => PAGE_TITLE })
</script>
