import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel/serverless"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  site: "https://www.dunor.boutique/",
  output: "server",
  adapter: vercel(),
  redirects: {
    "/categories": "/"
  },
  integrations: [tailwind(), sitemap(), react()]
})
