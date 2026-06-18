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
  },
  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '587',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || ''
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo.png' }
      ],
      script: [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TVXW334T');`
        }
      ],
      noscript: [
        {
          innerHTML: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TVXW334T" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          tagPosition: 'bodyOpen'
        }
      ]
    }
  }
})
