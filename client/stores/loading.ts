export const useLoadingStore = defineStore("loading", () => {
  const isLoading = ref<boolean>(false)
  const start = () => (isLoading.value = true)
  const end = () => (isLoading.value = false)

  return { isLoading: computed(() => isLoading.value), start, end }
})
