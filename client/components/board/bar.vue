<template>
  <v-app-bar
    class="overflow-x-auto"
    color="boardBar"
    height="50"
  >
    <!-- z: LEFT CONTENT -->
    <template #prepend>
      <v-btn
        prepend-icon="mdi-view-dashboard"
        variant="text"
      >
        {{ boardInfo.title }}
      </v-btn>
      <v-btn
        prepend-icon="mdi-cloud-lock-open"
        variant="text"
      >
        {{ capitalizeFirstLetter(boardInfo.type) }}
      </v-btn>
      <v-btn
        v-for="(x, index) in chips"
        :key="index"
        :prepend-icon="x.icon"
        variant="text"
      >
        {{ x.name }}
      </v-btn>
    </template>

    <!-- z: RIGHT CONTENT -->
    <template #append>
      <v-btn
        class="me-4"
        variant="outlined"
        color="primary"
        prepend-icon="mdi-account-plus"
      >
        Invite
      </v-btn>
      <div class="avatar-group">
        <v-avatar
          color="primary"
          v-for="avatar in avatars"
        >
          {{ avatar.name }}
        </v-avatar>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
const boardInfo = useBoardInfoStore()

const avatars = [
  {
    name: "1"
  },
  {
    name: "2"
  },
  {
    name: "3"
  }
]

const chips = [
  {
    name: "Add To Google Drive",
    icon: "mdi-google-drive"
  },
  {
    name: "Automation",
    icon: "mdi-lightning-bolt"
  },
  {
    name: "Filter",
    icon: "mdi-filter-variant"
  }
]
</script>

<style scoped lang="scss">
.avatar-group {
  max-width: 200px;
  overflow-x: auto;
  display: flex;
}
</style>
