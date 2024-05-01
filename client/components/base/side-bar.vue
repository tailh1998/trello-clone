<template>
  <v-navigation-drawer
    v-model="toggleSideBar.isOpen"
    location="left"
    temporary
  >
    <v-list-item><app-workspace-btn /></v-list-item>
    <v-list-item><app-recent-btn /></v-list-item>
    <v-list-item><app-starred-btn /></v-list-item>
    <v-list-item><app-template-btn /></v-list-item>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const toggleSideBar = useToggleSideBarStore()
</script>
