<template>
  <div>This is a billing</div>
</template>

<script setup lang="ts">
import { TITLE } from "~/constants/app"

const PAGE_TITLE = `Billing | ${TITLE}`

useHead({ titleTemplate: () => PAGE_TITLE })
</script>
