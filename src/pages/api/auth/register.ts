import type { APIRoute } from "astro"
import { supabase } from "@lib/supabase"

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData()
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()
  const terms = formData.get("terms")?.toString()

  if (terms !== "on") {
    return redirect("/auth/register?error=You must agree to the terms")
  }

  if (!email || !password) {
    return redirect("/auth/register?error=Email and password are required")
  }

  const { error } = await supabase.auth.signUp({ email, password })
  if (error) {
    return redirect(`/auth/register?error=${error.message}. Please try again.`)
  }

  return redirect("/auth/login")
}
