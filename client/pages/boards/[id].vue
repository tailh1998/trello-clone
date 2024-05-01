<template>
  <board-list-columns
    v-if="columns"
    :columns="columns"
  />
</template>

<script setup lang="ts">
import { mapOrder } from "~/utils/core/sort"
import { deepClone } from "~/utils"
import { TITLE, DESCRIPTION } from "~/constants/app"
import boardApis from "~/apis/board.apis"
import columnApis from "~/apis/column.apis"

const PAGE_TITLE = `My Board | ${TITLE}`

const boardInfo = useBoardInfoStore()

useHead({ titleTemplate: () => PAGE_TITLE })

useSeoMeta({
  title: PAGE_TITLE,
  description: DESCRIPTION,
  ogTitle: PAGE_TITLE,
  ogDescription: DESCRIPTION
})

const route = useRoute()

const columns = ref<Column<string>[]>([])

const currentCardId = ref<string | null>(null)
const nextColumnId = ref<string | null>(null)
const nextCardOrderIds = ref<string[]>([])
const prevColumnId = ref<string | null>(null)
const prevCardOrderIds = ref<string[]>([])

const { data, refetch: refetchBoard } = boardApis.queries.getBoardById(route.params.id, {
  enabled: !!route.params.id,
  onSuccess: (board) => {
    boardInfo.title = board.title
    boardInfo.type = board.type
    columns.value = deepClone(mapOrder<Column<string>>(board.columns, board.columnOrderIds, "_id"))
  }
})

const mutateSuccess = {
  onSuccess: () => refetchBoard()
}
const { mutate: updateBoard } = boardApis.mutations.updateBoardById(mutateSuccess)

const { mutate: moveCardToDiffColumn } = boardApis.mutations.moveCardToDiffColumn({
  onSuccess: () => {
    refetchBoard()
    resetCardPosition()
  }
})

const { mutate: updateColumn } = columnApis.mutations.updateColumnById(mutateSuccess)

const resetCardPosition = () => {
  currentCardId.value = null
  nextColumnId.value = null
  prevColumnId.value = null
  nextCardOrderIds.value = []
  prevCardOrderIds.value = []
}

const updateCardBasedOnColumnId = (
  columnId: string,
  cards: Card<string>[],
  cardOrderIds: string[],
  isMoveInTheSameColumn: boolean,
  event: any
): void => {
  for (let i = 0; i < columns.value.length; i++) {
    const element = columns.value[i]
    if (element._id === columnId) {
      columns.value[i].cardOrderIds = cardOrderIds
      columns.value[i].cards = cards
      break
    }
  }

  if (isMoveInTheSameColumn) {
    const currentCardOrderIds = data.value?.columns.find((x) => x._id === columnId)?.cardOrderIds
    const isNotChanging = JSON.stringify(currentCardOrderIds) == JSON.stringify(cardOrderIds)

    !isNotChanging &&
      updateColumn({
        id: columnId,
        body: { cardOrderIds }
      })
  } else {
    if (event.added) {
      nextColumnId.value = columnId
      nextCardOrderIds.value = cardOrderIds
    } else if (event.removed) {
      currentCardId.value = event.removed.element._id
      prevColumnId.value = columnId
      prevCardOrderIds.value = cardOrderIds
    }

    const checkPayloadIsValid = () =>
      currentCardId.value && nextColumnId.value && prevColumnId.value

    const isValid = checkPayloadIsValid()

    if (isValid) {
      moveCardToDiffColumn({
        currentCardId: currentCardId.value,
        nextColumnId: nextColumnId.value,
        nextCardOrderIds: nextCardOrderIds.value,
        prevColumnId: prevColumnId.value,
        prevCardOrderIds: prevCardOrderIds.value
      })
    }
  }
}

const updateColumnPosition = (columnOrderIds: string[]) =>
  updateBoard({
    id: route.params.id,
    body: { columnOrderIds }
  })

provide("boardStore", {
  method: {
    updateCardBasedOnColumnId,
    updateColumnPosition,
    refetchBoard
  }
})

watchEffect(() => {
  if (data.value?.columns) {
    const orderedColumns = mapOrder(data.value.columns, data.value.columnOrderIds, "_id")
    columns.value = deepClone(orderedColumns)
  }
})
</script>
