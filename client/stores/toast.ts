export const useToastStore = defineStore("toast", () => {
  const defaultOptions: ToastOption = {
    text: "Your changes have been successfully saved!",
    title: "Successful",
    type: "success",
    showLoading: false
  }
  const isOpen = ref<boolean>(false)
  const options = ref<ToastOption>(defaultOptions)

  const open = (option?: ToastOption) => {
    options.value = { ...defaultOptions, ...option }
    isOpen.value = true
  }

  const close = () => (isOpen.value = false)

  return {
    open,
    close,
    defaultOptions,
    isOpen: computed(() => isOpen.value),
    options: computed(() => options.value)
  }
})
