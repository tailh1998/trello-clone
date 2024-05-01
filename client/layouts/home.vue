<template>
  <div class="w-100 mt-3 mx-3 py-1">
    <v-container class="home-layout-wrapper">
      <v-row
        class="home-content"
        no-gutters
      >
        <v-col
          class="home-content-left"
          cols="3"
        >
          <v-list
            class="bg-boardBar d-flex flex-column ga-2"
            density="compact"
            v-model:selected="selected"
            v-model:opened="opened"
            @update:opened="onOpen"
            @update:selected="onChange"
            mandatory
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item.path"
              rounded="xl"
              color="info"
            >
              <template #prepend>
                <v-icon :icon="item.icon" />
              </template>
              <v-list-item-title
                class="text-capitalize"
                v-text="item.text"
              />
            </v-list-item>

            <v-divider class="my-2" />

            <v-list-group
              value="WorkSpaceDetail"
              prepend-icon="$vuetify"
            >
              <template #activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :active="workSpaceTitle_isActive"
                  :class="{
                    'v-list-group-title-active': workSpaceTitle_isActive
                  }"
                  @click="opened = ['WorkSpaceDetail']"
                  :append-icon="null"
                  rounded="xl"
                  color="info"
                  title="WorkSpace"
                />
              </template>

              <v-list-item
                v-for="([title, icon, path], i) in mockWorkSpaceDetails"
                class="my-2 text-capitalize"
                :value="path"
                :prepend-icon="icon"
                :key="i"
                rounded="xl"
                color="info"
              >
                <v-list-item-title
                  class="text-capitalize"
                  v-text="title"
                />
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-col>
        <v-col
          class="home-content-right"
          cols="9"
        >
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { TITLE, DESCRIPTION } from "~/constants/app"
import { HOME_URI, BOARDS_URI, TEMPLATES_URI, NOT_PRIVATE_ROUTE } from "~/constants/route"

const BOARD_TITLE = `Boards | ${TITLE}`

const route = useRoute()

useHead({
  titleTemplate: () => BOARD_TITLE
})

useSeoMeta({
  title: BOARD_TITLE,
  description: DESCRIPTION,
  ogTitle: BOARD_TITLE,
  ogDescription: DESCRIPTION
})

const items = [
  {
    text: "home",
    icon: "mdi-home-analytics",
    path: HOME_URI
  },
  {
    text: "boards",
    icon: "mdi-developer-board",
    path: BOARDS_URI
  },
  {
    text: "templates",
    icon: "mdi-clipboard-text-multiple-outline",
    path: TEMPLATES_URI
  }
]

const mockWorkSpaceDetails = [
  ["boards", "mdi-developer-board", "/workspace/boards"],
  ["collections", "mdi-rhombus-split", "/workspace/collections"],
  ["highlights", "mdi-heart-outline", "/workspace/highlights"],
  ["views", "mdi-view-grid-outline", "/workspace/views"],
  ["members", "mdi-account-group-outline", "/workspace/members"],
  ["settings", "mdi-cog-outline", "/workspace/settings"],
  ["billing", "mdi-account-credit-card", "/workspace/billing"]
]

const selected = ref<string[]>([])
const opened = ref(["WorkSpaceDetail"])

const workSpaceTitle_isActive = computed(() => {
  const itemsValue = items.map((x) => x.path)
  return !itemsValue.includes(selected.value[0]) && opened.value[0] === "WorkSpaceDetail"
})

const onOpen = () => {
  const itemsValue = items.map((x) => x.path)
  if (itemsValue.includes(selected.value[0])) {
    opened.value = ["WorkSpaceDetail"]
  }
}

const onChange = (e: string[]) => navigateTo(e[0])

onMounted(() => {
  selected.value.push(!NOT_PRIVATE_ROUTE.includes(route.path) ? route.path : BOARDS_URI)
})
</script>

<style scoped lang="scss">
.home-layout-wrapper {
  max-width: 1000px;
  .home-content {
    height: 100%;
  }
  .v-list-group-title-active {
    background-color: rgba(33, 150, 243, 0.05);
  }
}
</style>
