export const useUserInfoStore = defineStore("userInfo", {
  state: (): User => {
    return {
      email: "",
      name: "",
      _id: ""
    }
  }
})
