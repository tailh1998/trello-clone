<template>
  <v-snackbar
    variant="text"
    location="bottom left"
    :timeout="3_000"
    :model-value="toast.isOpen"
    @update:modelValue="close"
  >
    <v-alert
      :type="toast.options.type"
      :title="toast.options.title"
      :text="toast.options.text"
      closable
      @click:close="close"
    >
      <v-progress-linear
        v-if="toast.options.showLoading"
        absolute
        bottom
        indeterminate
        color="white"
      />
    </v-alert>
  </v-snackbar>
</template>

<script setup lang="ts">
const toast = useToastStore()
const close = () => toast.close()
</script>
