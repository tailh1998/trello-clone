<template>
  <v-col cols="12">
    <draggable
      v-if="cards"
      :list="cards"
      item-key="_id"
      group="card"
      ghost-class="ghost"
      chosen-class="chosen"
      :scroll-sensitivity="500"
      :animation="200"
      :force-fallback="true"
      class="board-column__list-card px-1 mx-1 d-flex flex-column ga-2 overflow-x-hidden overflow-y-auto"
      @change="handleChangeCardPosition"
    >
      <template #item="{ element }">
        <board-card :card="element" />
      </template>
    </draggable>
  </v-col>
</template>

<script setup lang="ts">
import draggable from "vuedraggable"
import { BOARD_CONTENT_LIST_CARD_HEIGHT, EMPTY_COLUMN_TEXT } from "~/constants/app"
type Props = {
  cards: Card<string>[]
  columnId: string
}
const props = defineProps<Props>()
const { cards: _defaultCards, columnId } = props
const cards = ref<Card<string>[]>(_defaultCards)

const cardPlaceholder = computed(() => (cards.value.length ? "" : EMPTY_COLUMN_TEXT))

/**
 * z: I'm using type "ANY" because I don't know the type for this function.
 * z: Please follow the two links below for more information.
 * ! https://stackoverflow.com/questions/77408886/whats-the-type-of-the-vue-draggable-change-event
 * ! https://github.com/SortableJS/Vue.Draggable/issues/1229
 *
 */
const handleChangeCardPosition = (event: any) => {
  const { added, moved, removed } = event

  const cardsIds = cards.value.map((x) => x._id)

  if (added && added.element) {
    added.element.columnId = columnId
  }

  const isMoveInTheSameColumn = !!moved && !added && !removed

  updateCardBasedOnColumnId(columnId, cards.value, cardsIds, isMoveInTheSameColumn, event)
}

watch(
  () => props.cards,
  (newCards) => (cards.value = newCards)
)

const {
  method: { updateCardBasedOnColumnId }
} = inject("boardStore") as PStore
</script>

<style scoped lang="scss">
$bottomSpace: 32px;

.board-column__list-card {
  max-height: calc(v-bind("BOARD_CONTENT_LIST_CARD_HEIGHT") - $bottomSpace);
  min-height: 56px;
  position: relative;

  &::-webkit-scrollbar-thumb {
    background-color: #ced0da;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #bfc2cf;
  }

  &::before {
    content: v-bind("cardPlaceholder");
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
  }

  &:has(.ghost) {
    &::before {
      content: "";
    }
  }

  .chosen {
    opacity: 1 !important;
  }
  .ghost {
    opacity: 0.3125 !important;
    border: 2px solid #2196f3;
    box-shadow: unset;
  }
}
</style>
