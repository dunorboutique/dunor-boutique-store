import type { Order, OrderWithProducts } from "@types"
import { supabase } from "@lib/supabase"
import { getProductsByIds } from "@db/products"

export async function getOrdersByUserId(userId: string) {
  const { data, error } = await supabase.from("orders").select("*").eq("user_id", userId)
  return { orders: data as Order[] | null, error }
}

export async function getOrderById(id: string) {
  const { data, error } = await supabase.from("orders").select("*").eq("id", id)
  if (data?.[0]) {
    const order = data[0] as Order
    const { products, error } = await getProductsByIds(order.products_id)
    const orderWithProducts = { ...order, products: products ?? [] }
    return { order: orderWithProducts as OrderWithProducts, error }
  }
  return { order: null, error }
}

export async function createOrder(order: Order) {
  const { data, error } = await supabase.from("orders").insert([order])
  return { order: data as Order | null, error }
}
