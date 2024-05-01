<template>
  <v-switch
    true-value="light"
    false-value="dark"
    false-icon="mdi-weather-night"
    true-icon="mdi-weather-sunny"
    @change="toggleTheme"
    :value="_theme"
    :hide-details="true"
    color="primary"
    inset
  />
</template>

<script setup lang="ts">
import { useTheme } from "vuetify"
const theme = useTheme()
const _theme = computed(() => theme.global.name.value)
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
}
</script>
