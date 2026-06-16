// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Inter: [400, 600, 700],
      Fraunces: [400, 600, 700, 800],
      Audiowide: [400]
    }
  },
  supabase: {
    redirect: false
  },
  css: ['~/assets/css/main.css'],
  vite: {
    server: {
      allowedHosts: true
    }
  }
})
