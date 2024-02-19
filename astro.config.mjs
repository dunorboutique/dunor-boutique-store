import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel/serverless"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: "https://www.dunorboutique.net/",
  output: "server",
  adapter: vercel(),
  redirects: {
    "/categories": "/"
  },
  integrations: [tailwind(), sitemap()]
})
