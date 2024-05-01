export const useBoardInfoStore = defineStore("boardInfo", {
  state: (): Pick<Board<string>, "title" | "type"> => {
    return {
      title: "LHT Dashboard",
      type: "my type"
    }
  }
})
