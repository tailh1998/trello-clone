// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
import { createVuetify } from "vuetify"
import config from "~/configs/vuetify.theme.config"

/**
 *  NOTE: CONFIG THEME
 *  follow link below
 *
 *  @see https://vuetifyjs.com/en/features/theme/
 */
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify(config)
  app.vueApp.use(vuetify)
})
