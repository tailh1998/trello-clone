<template>
  <v-menu
    transition="scale-transition"
    max-width="350"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="ms-4"
        variant="outlined"
        color="primary"
        prepend-icon="mdi-plus-box"
      >
        Create
      </v-btn>
    </template>

    <v-list
      density="compact"
      lines="three"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
      >
        <template #prepend>
          <v-icon :icon="item.icon" />
        </template>

        <v-list-item-title v-text="item.text" />
        <v-list-item-subtitle v-text="item.subtitle" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
const items = [
  {
    text: "Create board",
    icon: "mdi-developer-board",
    subtitle:
      "A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything."
  },
  {
    text: "Create Workspace",
    icon: "mdi-lan-connect",
    subtitle:
      "A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends."
  },
  {
    text: "Start with a template",
    icon: "mdi-content-copy",
    subtitle: "Get started faster with a board template. Use it to save your time."
  }
]
</script>

<style scoped lang="scss">
.v-list-item {
  align-content: start;
  height: max-content;
}
</style>
