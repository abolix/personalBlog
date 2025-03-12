// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
        htmlAttrs: { dir: 'rtl', lang: 'fa' },
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark', // fallback value if not system preference found
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000',
      // baseURL: process.env.BASE_URL || 'https://example.com',
      chunkSize:  5 * 1024 * 1024, // 5MB
    },
  },
  // pinia: {
  //   storesDirs: ['./stores/**'],
  // },
  fonts: {
    provider: "local",
    experimental: {
      disableLocalFallbacks: true
    },
    families: [
      {
        name: "IRANSansX",
        src: "/fonts/iransans/woff2/IRANSansX-Thin.woff2",
        global: true,
        weight: 100
      },
      {
        name: "IRANSansX",
        src: "/fonts/iransans/woff2/IRANSansX-UltraLight.woff2",
        global: true,
        weight: 200
      },
      {
        name: "IRANSansX",
        src: "/fonts/iransans/woff2/IRANSansX-Light.woff2",
        global: true,
        weight: 300
      },
      {
        name: "IRANSansX",
        src: "/fonts/iransans/woff2/IRANSansX-Regular.woff2",
        global: true,
        weight: 400
      },
      {
        name: "IRANSansX",
        src: "/fonts/iransans/woff2/IRANSansX-Medium.woff2",
        global: true,
        weight: 500
      },
      {
        name: "IRANSansX",
        src: "/fonts/iransans/woff2/IRANSansX-DemiBold.woff2",
        global: true,
        weight: 600
      },
      {
        name: "IRANSansX",
        src: "/fonts/iransans/woff2/IRANSansX-Bold.woff2",
        global: true,
        weight: 700
      },
      {
        name: "IRANSansXy",
        src: "/fonts/iransans/woff2/IRANSansX-ExtraBold.woff2",
        global: true,
        weight: 800
      },
      {
        name: "IRANSansX",
        src: "/fonts/iransans/woff2/IRANSansX-Heavy.woff2",
        global: true,
        weight: 900
      },
    ],
  },
  devtools: { enabled: true }
})