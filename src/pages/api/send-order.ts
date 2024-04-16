import type { UserOrderData, OrderData } from "@types"
import type { APIRoute } from "astro"
import { Resend } from "resend"
import { StoreOrderEmail } from "@emails/store-order"
import { UserOrderEmail } from "@emails/user-order"

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { user, order } = body as { user: UserOrderData; order: OrderData }

  const validation = validateEmailData(user, order)
  if (validation.status === "error")
    return new Response(JSON.stringify(validation), { status: 400 })

  await sendStoreEmail(user, order)
  const { userEmail, errorUser } = await sendUserEmail(user, order)

  if (errorUser)
    return new Response(JSON.stringify({ status: "error", errorUser }), { status: 500 })
  return new Response(JSON.stringify({ status: "success", userEmail }), { status: 200 })
}

async function sendStoreEmail(user: UserOrderData, order: OrderData) {
  const { data: storeEmail, error: errorStore } = await resend.emails.send({
    from: "orders@dunor.boutique",
    to: "boutiquedunor@gmail.com",
    subject: "Nuevo Pedido Reservado",
    react: StoreOrderEmail({ user, order })
  })

  if (errorStore) console.error("Error sending store email", errorStore)
  else console.log("Store email sent", storeEmail)
}

async function sendUserEmail(user: UserOrderData, order: OrderData) {
  const { data: userEmail, error: errorUser } = await resend.emails.send({
    from: "orders@dunor.boutique",
    to: user.email,
    subject: "Nuevo Pedido Reservado",
    react: UserOrderEmail({ user, order })
  })
  return { userEmail, errorUser }
}

function validateEmailData(user: UserOrderData, order: OrderData) {
  if (!user.fullName || !user.email || !user.phone || !user.address)
    return { status: "error", message: "Missing required fields" }

  if (!order.id || !order.total || !order.created_at || !order.products)
    return { status: "error", message: "Missing required fields" }

  return { status: "success" }
}
