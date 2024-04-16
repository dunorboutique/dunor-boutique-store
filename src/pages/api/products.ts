import type { APIRoute } from "astro"
import { getProductsByIds } from "@db/products"

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { productsIds } = body

  if (!productsIds)
    return new Response("Missing required fields", { status: 400 })

  const { products, error } = await getProductsByIds(productsIds)
  if (error)
    return new Response("Error fetching products", { status: 500 })
  
  return new Response(JSON.stringify(products), { status: 200 })
}
