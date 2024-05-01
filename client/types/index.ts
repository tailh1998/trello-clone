type Config<T> = Record<string, T>

type BoardData = {
  board?: Board
}

type Board<T = string> = {
  _id: T
  title: T
  description: T
  type: T
  ownerIds: T[]
  memberIds: T[]
  columnOrderIds: T[]
  columns: Column<T>[]
}

type Column<T = string> = {
  _id: T
  boardId: T
  title: T
  cardOrderIds: T[]
  cards: Card<T>[]
}

type Card<T = string> = {
  _id: T
  boardId: T
  columnId: T
  title: T
  description?: T | null
  cover?: T | null
  memberIds: T[]
  comments: T[]
  attachments: T[]
}

type PStore<T = any> = {
  state?: T
  method?: T
}

type ToastType = "success" | "warning" | "error" | "info"

type ToastOption = {
  text?: string | number
  title?: string
  type?: ToastType
  showLoading?: boolean
}

type ToastStore = {
  open: (option?: ToastOption) => void
  close: () => boolean
  defaultOptions: ToastOption
  isOpen: boolean
  options: Omit<ToastOption, "showLoading">
}

type User = {
  _id: string
  email: string
  name: string
}
