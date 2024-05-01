<template>
  <div v-if="alertStore.isOpen">
    <v-dialog
      :model-value="true"
      activator="parent"
      width="auto"
      persistent
    >
      <v-card>
        <template #title>
          <p class="text-error">
            <v-icon
              size="large"
              icon="mdi-trash-can-outline"
            />
            {{ alertStore.title }}
          </p>
        </template>
        <v-card-text> {{ alertStore.message }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <base-alert-yes-button @click="alertStore.onYes" />
          <base-alert-no-button @click="alertStore.onNo" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const alertStore = useAlertStore()
</script>

<style scoped lang="scss">
.v-card {
  padding: 8px;
}
</style>
