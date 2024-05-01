// https://nuxt.com/docs/api/configuration/nuxt-config
const DEFAULT_PORT = 3000
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"
import vueQuery from "./configs/vue-query.config"
import veeValidate from "./configs/vee-validate.config"

export default defineNuxtConfig({
  ssr: false, //z: Client Side Rendering Only
  app: {
    head: {
      htmlAttrs: {
        lang: "en"
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA0FJREFUeF7tW01oE0EU/ja0UPwtWlA0bUSLIFRbIx4SpQEP9SClWhS1EYuNeJGCFw/qwXjQmyCIFzFKhRTFopbiwYBKiyYHMWotFKQVY9Ki0kqsPxQTGtnEhVCSvl2nnQy7k2P2e/PmffNm5r2ZeQoK/1pRU38S9s2NcGz9hSqHDRXLKlBWXl4EL9bf6VQK01PTmIjNIPZ6MRLvBvDp7TUA92d3VJn1RwNqXQG429ZjbV2lWFYx9mZsKIlw9weMRHwA3mit5ROwB27vQ3iOlzGqElu8/0Ya4eBeAI/UjmoENMDtfWl647WhyZGwXfWEHAG1rlc4cMkp9tDNc+/unY1iJLJNJaAVR68GTDfnKb7UNeF2p09BTf0TeK/sovCm/B489VSB+0gKHp+5F75io9cfSCs4fDmJdc7lukd4fBj4/B74naRFFlUCqzcCazbR2EKIhdb1MfpdQWfPFJasXEr2MD6IppkhdOxvxg63C/ZVVXOKZDIZjH2dxItwBDd7+hCy1QHVW0g1WQAvXT8nfyg4HfpDRnjxQZzf8A1+v1+fAQVQquyF0RU0CTx1pVMpBWeeZSirmmLdeBy8TsHI77u9JxBytM2J46krFwhRBIwP406LHQf3NZMGUoC7D/pwqDdRfE3gqetfZ2kCor2Id50j5zxlvPo98WUC1e0XAWdLYThPXboJeN6FzMAtPfaRGHVhtHk6gJ3thbE8dZWCgOycazzGhQBSlyQgxwC9BsyjW5KjwlOX9ADpAXIKyDVALoJyF5DboIwDyGyQZ3DCU5cMhGQgJAMhGQjJQMjEgRB5+iTkLmD2M0HyQETIU2HOwYl49wKcCVCvxbjdQgm3C2iH5bzuBoUlQCNioW+HhSeAvGphB4iVDrPbY7gFSYBQ5wGGx49dQHqA9ADqgQTvQIjdqw21IKcAzymgN0U1NISMYNoDSpCiMtpkSJwmoAQpqiELGME0AQB4p6iMNhkS10UA7xTVkAWMYH0EqEo4pqiMNhkS1/dUNr9JDimqIQtYwNmnsnofS7MoElU2+1ja6HN5UY35n35ln8tbvmDC8iUzli+aUueOxcvmVAosXjiZW0EtXTqrbSKWLp7O30ktUz7/F7qf5FO8jZxZAAAAAElFTkSuQmCC",
          sizes: "64x64"
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: ""
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        }
      ]
    }
  },
  devServer: {
    port: Number(process.env.NUXT_PORT) || DEFAULT_PORT
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext"
      }
    },
    prerender: {
      crawlLinks: false,
      routes: ["/"]
    }
  },
  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },
  css: ["~/styles/main.scss"],
  typescript: {
    strict: true,
    /**
     *  NOTE:
     *  Disable automatic type checking, avoid performance issues, use
     *  `yarn run type:check` instead.
     *
     *  @see https://nuxt.com/docs/guide/concepts/typescript#type-checking
     */
    typeCheck: false,
    /**
     * NOTE:
     * When using VSCode and Volar with Take Over Mode，`d.ts` files
     * generated for *.vue files can be disabled.
     *
     * @see https://nuxt.com/docs/getting-started/installation#new-project
     */
    shim: false
  },
  imports: {
    presets: ["pinia"],
    dirs: ["stores"]
  },
  runtimeConfig: {
    public: {
      motion: {
        directives: {}
      },
      baseUrl: process.env.NUXT_API
    }
  },
  build: {
    transpile: ["vuetify"]
  },
  modules: [
    "@nuxt/image",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "nuxt-icon",
    "@nuxtjs/i18n",
    "@hebilicious/vue-query-nuxt",
    "@vee-validate/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"]
      }
    ],
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],
  veeValidate,
  vueQuery,
  i18n: {
    vueI18n: "./configs/i18n.config.ts" // if you are using custom path, default
  },
  vite: {
    vue: {
      template: { transformAssetUrls }
    }
  },
  /**
   * Nuxt Image
   *
   * @see https://image.nuxt.com/
   */
  image: {
    dir: "assets/img"
  },
  routeRules: {
    // pages pre-rendered at build time
    "/": { prerender: true },
    "/boards": { prerender: true },
    "/home": { prerender: true },
    "/sign-in": { prerender: true },
    "/sign-up": { prerender: true }
  }
})
