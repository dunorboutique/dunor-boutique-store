import type { APIRoute } from "astro"
import { createUserMeasures } from "@db/measures"

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { userId: user_id, measures, userInfo: user_info } = body
  if (!user_id) {
    return new Response("User id is required", { status: 400 })
  }
  if (!measures) {
    return new Response("Measures are required", { status: 400 })
  }
  if (!user_info) {
    return new Response("User info is required", { status: 400 })
  }

  const userMeasure = { user_id, measures, user_info }
  const { error } = await createUserMeasures(userMeasure)
  if (error) {
    return new Response("Error al guardar las medidas", { status: 500 })
  }
  return new Response("Medidas guardadas", { status: 200 })
}
