import type { APIRoute } from "astro"
import { supabase } from "@lib/supabase"

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const authCode = url.searchParams.get("code")
  if (!authCode) {
    return new Response("No auth code provided", { status: 400 })
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(authCode)
  if (error) {
    return new Response(error.message, { status: 500 })
  }

  const { access_token, refresh_token } = data.session
  cookies.set("sb_access_token", access_token, { httpOnly: true, secure: true, path: "/" })
  cookies.set("sb_refresh_token", refresh_token, { httpOnly: true, secure: true, path: "/" })

  return redirect("/")
}
