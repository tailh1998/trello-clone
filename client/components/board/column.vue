<template>
  <v-container
    class="board-column bg-boardColumn h-100 mx-0 py-0 px-0 align-content-start rounded-lg"
  >
    <v-row
      no-gutters
      align="start"
    >
      <!-- z:-------- HEADER ---------->
      <v-col
        cols="12"
        class="d-flex align-center"
        :style="`height:${HEIGHT.COLUMN_HEADER}`"
      >
        <div class="w-100 px-2 d-flex justify-space-between align-center">
          <span class="text-subtitle-1 font-weight-bold"> {{ column.title }} </span>
          <v-menu transition="scale-transition">
            <template #activator="{ props }">
              <v-btn
                data-draggable="false"
                icon="mdi-chevron-down"
                color="blue"
                variant="text"
                v-bind="props"
              />
            </template>

            <v-list density="compact">
              <!-- z: Add new -->
              <v-list-item
                color="primary"
                value="add"
                @click="isOpenNewCardForm = true"
              >
                <template #prepend>
                  <v-icon icon="mdi-folder-plus-outline" />
                </template>
                <v-list-item-title v-text="'Add new card'" />
              </v-list-item>

              <!-- z: Cut -->
              <v-list-item
                color="primary"
                value="cut"
              >
                <template #prepend>
                  <v-icon icon="mdi-content-cut" />
                </template>
                <v-list-item-title v-text="'Cut'" />
              </v-list-item>

              <!-- z: Copy -->
              <v-list-item
                color="primary"
                value="copy"
              >
                <template #prepend>
                  <v-icon icon="mdi-content-copy" />
                </template>
                <v-list-item-title v-text="'Copy'" />
              </v-list-item>

              <!-- z: Paste -->
              <v-list-item
                color="primary"
                value="paste"
              >
                <template #prepend>
                  <v-icon icon="mdi-content-paste" />
                </template>
                <v-list-item-title v-text="'Paste'" />
              </v-list-item>

              <v-divider></v-divider>

              <!-- z: Archive -->
              <v-list-item
                color="primary"
                value="archive"
              >
                <template #prepend>
                  <v-icon icon="mdi-cloud-arrow-up" />
                </template>
                <v-list-item-title v-text="'Archive this column'" />
              </v-list-item>

              <!-- z: Delete -->
              <v-list-item
                color="primary"
                value="delete"
                @click="onDeleteColumnClick"
              >
                <template #prepend>
                  <v-icon
                    color="error"
                    icon="mdi-delete"
                  />
                </template>
                <v-list-item-title
                  class="v-list-item-title--delete"
                  v-text="'Delete this column'"
                />
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>

      <!-- z:-------- LIST CARD ---------->
      <board-list-cards
        class="pb-2"
        v-if="column.cards"
        :columnId="column._id"
        :cards="orderedCards"
      />

      <!-- z:-------- FOOTER ---------->
      <v-col
        cols="12"
        class="d-flex align-center"
        :style="`height:${HEIGHT.COLUMN_FOOTER}`"
      >
        <!-- TODO: Everything inside will only render on the Client -->
        <!-- ! FIX WARNING -->
        <client-only v-if="!isOpenNewCardForm">
          <div class="w-100 d-flex justify-space-between align-center px-2">
            <v-btn
              data-draggable="false"
              variant="text"
              color="blue"
              prepend-icon="mdi-folder-plus-outline"
              @click.stop.prevent="toggleOpenNewColumnForm"
            >
              Add new card
            </v-btn>

            <v-btn
              variant="text"
              icon
            >
              <v-icon color="blue"> mdi-drag-horizontal-variant </v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                Drag to move
              </v-tooltip>
            </v-btn>
          </div>
        </client-only>
        <div
          class="d-flex py-3 px-2 flex-1-0 align-center new-card-form-wrapper"
          data-draggable="false"
          v-else
        >
          <v-text-field
            color="blue"
            density="comfortable"
            v-model="newCardTitle"
            label="Enter card title..."
            append-inner-icon="mdi-plus"
            @click:append-inner.stop.prevent="addNewCard"
            @keyup.enter.stop.prevent="addNewCard"
            hide-details
            autofocus
          />
          <v-btn
            @click.stop.prevent="closeNewCardForm"
            height="36"
            width="36"
            variant="plain"
            icon="mdi-close"
            size="small"
            color="red-darken-4"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { HEIGHT, BOARD_CONTENT_HEIGHT } from "~/constants/app"
import { mapOrder } from "~/utils/core/sort"
import cardApis from "~/apis/card.apis"
import columnApis from "~/apis/column.apis"

const { open } = useToastStore()
const { showAlert } = useAlert()
type Props = {
  column: Column<string>
}

const route = useRoute()
const newCardTitle = ref<string>("")
const isOpenNewCardForm = ref<boolean>(false)

const { mutate: deleteColumn } = columnApis.mutations.deleteColumn({
  onSuccess: () => {
    refetchBoard()
    open({ text: "Delete column success!" })
  }
})

const { mutate: addCard } = cardApis.mutations.addCard({
  onSuccess: () => {
    closeNewCardForm()
    refetchBoard()
    open({ text: "Add new card success!" })
  }
})

const toggleOpenNewColumnForm = () => (isOpenNewCardForm.value = !isOpenNewCardForm.value)

const clearInputNewColumnTitle = () => (newCardTitle.value = "")

const props = defineProps<Props>()

const orderedCards = computed(() =>
  mapOrder<Card<string>>(props.column.cards, props.column.cardOrderIds, "_id")
)

const addNewCard = () => {
  if (!newCardTitle.value.trim()) {
    open({
      text: "Please enter Card Title",
      type: "error",
      title: "Invalid Data"
    })

    return
  }

  addCard({
    title: newCardTitle.value,
    columnId: props.column._id,
    boardId: route.params.id as string
  })
}

const onDeleteColumnClick = () => {
  showAlert({
    message: "This action will permanently delete your Column and it's Cards! Are you sure?",
    onYes: () => deleteColumn(props.column._id)
  })
}

const closeNewCardForm = () => {
  toggleOpenNewColumnForm()
  clearInputNewColumnTitle()
}

const {
  method: { refetchBoard }
} = inject("boardStore") as PStore
</script>

<style scoped lang="scss">
.board-column {
  $bottomSpace: 32px;
  min-width: 300px;
  max-width: 300px;
  height: fit-content !important;
  max-height: calc(v-bind("BOARD_CONTENT_HEIGHT") - $bottomSpace);
  cursor: pointer;

  .new-card-form-wrapper {
    gap: 8px;
  }
}

.v-list-item-title.v-list-item-title--delete {
  color: rgb(207, 102, 121);
}
</style>
