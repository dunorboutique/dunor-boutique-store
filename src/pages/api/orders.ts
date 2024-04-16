import type { APIRoute } from "astro"
import { createOrder } from "@db/orders"

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { userId: user_id, status, total, productsInCart } = body

  if (!user_id) {
    return new Response(JSON.stringify("User id is required"), { status: 400 })
  }
  if (!status || !total || !productsInCart) {
    return new Response(JSON.stringify("Status, Total and Products are required"), { status: 400 })
  }

  const { order, error } = await createOrder({
    user_id,
    products_id_quantity: productsInCart,
    status,
    total
  })
  if (error) {
    return new Response(JSON.stringify("Error al crear la compra"), { status: 500 })
  }
  return new Response(JSON.stringify(order), { status: 200 })
}
