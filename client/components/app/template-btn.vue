<template>
  <v-menu transition="scale-transition">
    <template #activator="{ props }">
      <v-btn
        color="primary"
        v-bind="props"
        append-icon="mdi-chevron-down"
      >
        Templates
      </v-btn>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
      >
        <v-list-item-title v-text="item.text" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
const items = [{ text: "Kanban" }, { text: "Company Overview" }, { text: "Simple Project Board" }]
</script>
