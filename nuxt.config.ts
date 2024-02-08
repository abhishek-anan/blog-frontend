// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/main.scss","@/assets/css/global.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_variables.scss" as *;',
        },
      },
    },
  },
  modules: [
    "@pinia/nuxt",
    'dayjs-nuxt',
  ],
  app:{
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'BeyondTheByline',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'BeyondTheByline' }
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "http://127.0.0.1:8000",
    }
  }
})
