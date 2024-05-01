<template>
  <v-card
    :loading="loading"
    max-width="300"
  >
    <template #loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="blue"
        height="4"
        indeterminate
      />
    </template>

    <v-img
      class="rounded"
      cover
      height="250"
      v-if="card.cover"
      :src="card.cover"
    />

    <v-card-item :class="{ ['pb-0']: shouldShowCardAction }">
      <v-card-title class="text-subtitle-1">{{ card.title }}</v-card-title>
    </v-card-item>
    <v-card-actions
      v-if="shouldShowCardAction"
      class="py-0"
      :style="{ minHeight: HEIGHT.CARD_ACTION }"
    >
      <v-btn
        v-if="card.memberIds?.length"
        prepend-icon="mdi-account-multiple"
        color="blue"
        variant="text"
        @click="reserve"
      >
        {{ card.memberIds?.length }}
      </v-btn>
      <v-btn
        v-if="card.comments?.length"
        prepend-icon="mdi-comment"
        color="blue"
        variant="text"
        @click="reserve"
      >
        {{ card.comments?.length }}
      </v-btn>
      <v-btn
        v-if="card.attachments?.length"
        prepend-icon="mdi-attachment"
        color="blue"
        variant="text"
        @click="reserve"
      >
        {{ card.attachments?.length }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { HEIGHT } from "~/constants/app"

const loading = ref(false)

const reserve = () => {
  loading.value = true

  setTimeout(() => (loading.value = false), 2000)
}

type Props = {
  card: Card<string>
}
const { card } = defineProps<Props>()

const shouldShowCardAction = computed<boolean>(
  () => !!card.memberIds?.length || !!card.comments?.length || !!card.attachments?.length
)
</script>

<style scoped lang="scss">
.v-card {
  overflow: unset;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid #2196f3;
  }
}

/**
  * TODO:HEIGHT.CARD_ACTION is undefined with ssr, in render first time
  * TODO: CSS v-bind() variable is undefined when using SSR
  * ! https://laracasts.com/discuss/channels/vite/css-v-bind-variable-is-undefined-when-using-ssr
  */
// .v-card-actions {
//   min-height: v-bind("HEIGHT.CARD_ACTION");
// }
</style>
