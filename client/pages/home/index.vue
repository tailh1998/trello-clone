<template>
  <v-container>
    <!-- z: ::::::::::::::: Your Items ::::::::::::::: -->
    <div class="text-h5 font-weight-bold d-flex align-center ga-2 pb-3">
      <v-icon
        icon="mdi-checkbox-marked-outline"
        size="x-small"
      />
      Your Items
    </div>
    <div class="text-subtitle-2">When you're added to a checklist item, it'll show up here.</div>

    <v-divider class="my-6" />

    <!-- z: ::::::::::::::: Up next ::::::::::::::: -->
    <div class="text-h5 font-weight-bold d-flex align-center ga-2 pb-3">
      <v-icon
        icon="mdi-clock-outline"
        size="x-small"
      />
      Up next
    </div>
  </v-container>
</template>

<script setup lang="ts">
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
