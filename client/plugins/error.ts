export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vue:error", (..._args) => {
    errorLogger("VUE", ..._args)
  })
  nuxtApp.hook("app:error", (..._args) => {
    errorLogger("APP", ..._args)
  })
  nuxtApp.vueApp.config.errorHandler = (..._args) => {
    errorLogger("GLOBAL", ..._args)
  }
})
