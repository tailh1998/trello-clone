export const useAlertStore = defineStore("alert", () => {
  const title = ref<string>("")
  const message = ref<string>("")
  const isOpen = ref<boolean>(false)
  const isWarningOnly = ref<boolean>(false)
  const onYes = ref<VoidFunction | null>(null)
  const onNo = ref<VoidFunction | null>(null)

  const hideDialog = () => {
    message.value = ""
    title.value = ""
    isOpen.value = false
  }

  const showDialog = () => (isOpen.value = true)

  return {
    isOpen,
    isWarningOnly,
    title,
    message,
    onYes,
    onNo,
    hideDialog,
    showDialog
  }
})
