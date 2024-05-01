<template>
  <v-menu transition="scale-transition">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="text-none"
        stacked
      >
        <v-avatar
          color="brown"
          size="large"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John Doe"
          ></v-img>
        </v-avatar>
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
const items = [
  { text: "Real-Time", icon: "mdi-clock" },
  { text: "Audience", icon: "mdi-account" },
  { text: "Conversions", icon: "mdi-flag" }
]
</script>
