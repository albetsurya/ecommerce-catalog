export default {
  // Global page headers
  head: {
    title: "nuxt-ecommerce",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://kit.fontawesome.com/a076d05399.js" }],
  },

  css: ["~/assets/css/tailwind.css"],

  plugins: [],

  components: true,

  buildModules: ["@nuxt/postcss8"],

  modules: ["@nuxtjs/axios"],

  axios: {
    baseURL: "https://fakestoreapi.com",
  },

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
};
