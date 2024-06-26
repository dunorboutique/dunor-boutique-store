import type { Product } from "@types"
import { supabase } from "@lib/supabase"
import { getCategoryByName, getSubcategoryByName } from "./categories"

export async function getAllProducts() {
  const { data, error } = await supabase.from("products").select()
  return { products: data as Product[] | null, error }
}

export async function getProductsByType(type: "category" | "subcategory", value: string) {
  const data =
    type === "category" ? await getCategoryByName(value) : await getSubcategoryByName(value)
  if (!data.length) return { products: null, error: { message: "Data not found" } }

  const columnId = data[0].id
  const productIds = await getProductIds(type, columnId)
  return await getProductsByIds(productIds)
}

async function getProductIds(type: "category" | "subcategory", id: number) {
  const { data: productData, error } = await supabase
    .from("products_category")
    .select("product_id")
    .eq(`${type}_id`, id)
  if (error) return []
  return productData.map(product => product.product_id)
}

export async function getProductsById(productId: string) {
  const { data, error } = await supabase.from("products").select().eq("id", productId)
  return { product: data?.[0] as Product | null, error }
}

export async function getProductsByIds(productIds: string[]) {
  const { data, error } = await supabase.from("products").select().in("id", productIds)
  return { products: data as Product[] | null, error }
}
