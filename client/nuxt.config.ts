// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Jost:wght@300;400;500;600&display=swap",
        },
      ],
    },
  },
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: "coffeeLuxury",
        themes: {
          coffeeLuxury: {
            dark: false,
            colors: {
              background: "#FAF6F0",
              surface: "#FFFFFF",
              primary: "#6F4E37",
              "primary-darken-1": "#3E2723",
              secondary: "#C9A227",
              "secondary-darken-1": "#A9840F",
              espresso: "#3E2723",
              cafe: "#6F4E37",
              gold: "#C9A227",
              champagne: "#E8D5A3",
              cream: "#FAF6F0",
              error: "#B3261E",
              info: "#6F4E37",
              success: "#4E6E58",
              warning: "#C9A227",
              "on-background": "#3E2723",
              "on-surface": "#3E2723",
              "on-primary": "#FAF6F0",
              "on-secondary": "#3E2723",
            },
          },
        },
      },
      defaults: {
        VBtn: {
          rounded: "lg",
          class: "text-none font-weight-medium",
          style: "letter-spacing: 0.02em;",
        },
        VCard: {
          rounded: "lg",
          elevation: 2,
        },
        VTextField: {
          variant: "outlined",
          color: "primary",
          rounded: "lg",
        },
        VAppBar: {
          elevation: 0,
        },
        VAlert: {
          rounded: "lg",
        },
      },
    },
    moduleOptions: {
      importComposables: [
        "useDate",
        "useLocale",
        "useDefaults",
        "useDisplay",
        "useRtl",
        "useTheme",
        "useGoTo",
        "useHotkey",
        "useMask",
      ],
    },
  },
});
