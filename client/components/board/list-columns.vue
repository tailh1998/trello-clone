<template>
  <div class="w-100 h-100 overflow-y-hidden overflow-x-auto d-flex ga-3">
    <draggable
      :list="columns"
      item-key="_id"
      class="d-flex ga-3 h-100"
      :force-fallback="true"
      :animation="200"
      ghost-class="ghost"
      chosen-class="chosen"
      @change="handleChangeColumnPosition"
    >
      <template #item="{ element }">
        <board-column
          :column="element"
          :key="element._id"
        />
      </template>
    </draggable>
    <v-btn
      v-if="!isOpenNewColumnForm"
      @click="toggleOpenNewColumnForm"
      width="300"
      color="white"
      variant="tonal"
      prepend-icon="mdi-file-plus"
    >
      Add new column
    </v-btn>
    <v-card
      variant="flat"
      color="blue-grey-lighten-5"
      max-width="300"
      min-width="300"
      style="height: fit-content"
      v-else
    >
      <v-card-item id="v-card-item-form">
        <v-text-field
          class="w-100 pt-2"
          v-model="newColumnTitle"
          @keyup.enter.stop.prevent="addNewColumn"
          bg-color="indigo-lighten-5"
          color="indigo-darken-3"
          density="comfortable"
          variant="outlined"
          label="Enter column title..."
          autofocus
        />
        <div class="d-flex justify-space-between">
          <v-btn
            color="indigo-darken-3"
            variant="tonal"
            @click="addNewColumn"
          >
            Add Column
          </v-btn>
          <v-btn
            @click="closeNewColumnForm()"
            height="36"
            width="36"
            variant="plain"
            icon="mdi-close"
            size="small"
            color="red-darken-4"
          />
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable"
import boardApis from "~/apis/board.apis"
import columnApis from "~/apis/column.apis"

type Props = {
  columns: Column<string>[]
}

const route = useRoute()

const { open } = useToastStore()

const props = defineProps<Props>()

const columns = computed(() => props.columns)

const isOpenNewColumnForm = ref<boolean>(false)
const newColumnTitle = ref<string>("")

const { refetch } = boardApis.queries.getBoardById(route.params.id, {
  enabled: !!route.params.id
})

const { mutate: addColumn } = columnApis.mutations.addColumn({
  onSuccess: () => {
    closeNewColumnForm()
    refetch()
    open({ text: "Add new column success!" })
  }
})

const toggleOpenNewColumnForm = () => (isOpenNewColumnForm.value = !isOpenNewColumnForm.value)

const clearInputNewColumnTitle = () => (newColumnTitle.value = "")

const closeNewColumnForm = () => {
  toggleOpenNewColumnForm()
  clearInputNewColumnTitle()
}

const addNewColumn = () => {
  if (!newColumnTitle.value.trim()) {
    open({
      text: "Please enter Column Title",
      type: "error",
      title: "Invalid Data"
    })
    return
  }

  // Call API
  addColumn({
    title: newColumnTitle.value,
    boardId: route.params.id as string
  })
}

const handleChangeColumnPosition = () => {
  const columnsIds = columns.value.map((x) => x._id)
  updateColumnPosition(columnsIds)
}

const {
  method: { updateColumnPosition }
} = inject("boardStore") as PStore
</script>

<style scoped lang="scss">
.chosen {
  opacity: 1 !important;
  transform: rotate(3.125deg);
}
.ghost {
  opacity: 0.3125 !important;
  transform: unset;
}
#v-card-item-form {
  padding: 16px;
  padding-top: 8px;
}
</style>
