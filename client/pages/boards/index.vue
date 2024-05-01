<template>
  <v-container>
    <!-- z: ::::::::::::::: Starred ::::::::::::::: -->
    <div class="text-h5 font-weight-bold d-flex align-center ga-2 pb-3">
      <v-icon
        icon="mdi-star-outline"
        size="small"
      />
      Starred boards
    </div>
    <v-card
      max-width="250"
      variant="tonal"
      @click="navigateTo(`/boards/${TEMP_BOARD_ID}`)"
      link
    >
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">Board Title</div>
          <div class="text-caption">This is a board description !!!</div>
        </div>
      </v-card-item>

      <v-card-actions class="d-flex justify-space-between">
        <div class="text-subtitle-1 px-2 font-weight-bold">WS Name</div>
        <v-btn
          variant="text"
          :icon="starIcon"
          color="yellow-darken-3"
          @click.stop="toggleStarred"
        />
      </v-card-actions>
    </v-card>

    <v-divider class="my-6" />

    <!-- z: ::::::::::::::: Recently ::::::::::::::: -->
    <div class="text-h5 font-weight-bold d-flex align-center ga-2 pb-3">
      <v-icon
        icon="mdi-clock-outline"
        size="x-small"
      />
      Recently viewed
    </div>
    <v-card
      max-width="250"
      variant="tonal"
      link
    >
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">Board Title</div>
          <div class="text-caption">This is a board description !!!</div>
        </div>
      </v-card-item>

      <v-card-actions class="d-flex justify-space-between">
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          :icon="starIcon"
          color="yellow-darken-3"
          @click.stop="toggleStarred"
        />
      </v-card-actions>
    </v-card>

    <v-divider class="my-6" />

    <!-- z: ::::::::::::::: YOUR WORKSPACES ::::::::::::::: -->
    <div class="text-h5 font-weight-bold d-flex align-center ga-2 pb-3">
      <v-icon
        icon="mdi-lightning-bolt-outline"
        size="x-small"
      />
      Your workspace
    </div>
    <v-card
      max-width="250"
      variant="tonal"
      link
    >
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">Board Title</div>
          <div class="text-caption">This is a board description !!!</div>
        </div>
      </v-card-item>

      <v-card-actions class="d-flex justify-space-between">
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          :icon="starIcon"
          color="yellow-darken-3"
          @click.stop="toggleStarred"
        />
      </v-card-actions>
    </v-card>
    <v-btn
      class="mt-6"
      variant="tonal"
    >
      View all closed boards
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { TEMP_BOARD_ID, TITLE } from "~/constants/app"

const PAGE_TITLE = `Boards | ${TITLE}`

useHead({ titleTemplate: () => PAGE_TITLE })

const starIcon = ref("mdi-star")

const toggleStarred = () => {
  if (starIcon.value.includes("outline")) {
    starIcon.value = starIcon.value.replace("-outline", "")
  } else {
    starIcon.value = `${starIcon.value}-outline`
  }
}
</script>
