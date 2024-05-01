type ShowAlertProps = {
  title?: string
  message: string
  isWarningOnly?: boolean
  onYes?: VoidFunction
  onNo?: VoidFunction
}

export const useAlert = () => {
  const alertStore = useAlertStore()
  const showAlert = ({
    title = "Delete confirm",
    message = "",
    isWarningOnly = false,
    onYes,
    onNo
  }: ShowAlertProps) => {
    alertStore.isOpen = true
    alertStore.message = message
    alertStore.title = title
    alertStore.isWarningOnly = isWarningOnly
    alertStore.onYes = () => {
      onYes?.()
      alertStore.hideDialog()
    }
    alertStore.onNo = () => {
      onNo?.()
      alertStore.hideDialog()
    }
  }

  return { showAlert }
}
