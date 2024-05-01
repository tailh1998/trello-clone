<template>
  <v-menu transition="scale-transition">
    <template #activator="{ props }">
      <v-btn
        color="primary"
        v-bind="props"
        append-icon="mdi-chevron-down"
      >
        Recent
      </v-btn>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
      >
        <template #prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
const items = [{ text: "Board 01", icon: "mdi-account" }]
</script>
