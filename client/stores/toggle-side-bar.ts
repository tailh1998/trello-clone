export const useToggleSideBarStore = defineStore("toggle-side-bar", {
  state: () => {
    return {
      isOpen: false as boolean
    }
  }
})
