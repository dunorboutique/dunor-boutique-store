/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string
  readonly CLOUDINARY_CLOUD_NAME: string
  readonly CLOUDINARY_API_KEY: string
  readonly CLOUDINARY_API_SECRET: string
  readonly BODYGRAM_API_KEY: string
  readonly BODYGRAM_ORGANIZATION_ID: string
  readonly RESEND_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
