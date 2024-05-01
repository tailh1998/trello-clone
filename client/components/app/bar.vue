<template>
  <v-app-bar
    class="overflow-x-auto"
    color="appBar"
    flat
  >
    <!-- z: LEFT CONTENT -->
    <template #prepend>
      <v-btn
        icon="mdi-apps"
        color="primary"
      />
      <base-menu-logo />
      <div class="d-none d-sm-none d-md-none d-lg-flex">
        <app-workspace-btn />
        <app-recent-btn />
        <app-starred-btn />
        <app-template-btn />

        <app-create-btn />
      </div>
    </template>

    <!-- z: RIGHT CONTENT -->
    <template #append>
      <app-search />
      <app-mode-toggle class="ms-6" />
      <base-menu-notification />
      <base-menu-help />
      <base-menu-profile />
    </template>
  </v-app-bar>
</template>
