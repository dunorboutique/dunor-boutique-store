import type { AstroCookies } from "astro"
import type { User } from "@types"
import { supabase } from "@lib/supabase"

export async function getUserInfo(cookies: AstroCookies) {
  const accessToken = cookies.get("sb_access_token")!
  const refreshToken = cookies.get("sb_refresh_token")!
  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken?.value,
    refresh_token: refreshToken?.value
  })

  if (error || !data?.user || !data?.user.user_metadata) return null
  const id = data.user.id
  const { avatar_url: avatarUrl, full_name: fullName, email } = data.user.user_metadata
  return { id, email, fullName, avatarUrl } as User
}

export function isUserSigned(cookies: AstroCookies) {
  const accessToken = cookies.get("sb_access_token")
  const refreshToken = cookies.get("sb_refresh_token")
  if (!accessToken || !refreshToken) return false
  else return true
}

export function cleanSession(cookies: AstroCookies) {
  cookies.delete("sb_access_token", { path: "/" })
  cookies.delete("sb_refresh_token", { path: "/" })
}
