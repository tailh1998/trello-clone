<template>
  <v-app>
    <v-progress-linear
      class="loading"
      v-show="globalLoad.isLoading"
      :color="progressColor"
      indeterminate
    >
    </v-progress-linear>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <base-alert />
    <base-toast />
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify"

const globalLoad = useLoadingStore()
const theme = useTheme()
const isDark = computed(() => theme.global.name.value === "dark")
const progressColor = isDark.value ? "#66a3ff" : "#ff9966"
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  transform: unset;
}
</style>
