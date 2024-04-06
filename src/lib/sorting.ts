import type { Product } from "@types"

export function sortProductsByNameAscending(products: Product[]) {
  return products.toSorted((a, b) => a.name.localeCompare(b.name))
}

export function sortProductsByNameDescending(products: Product[]) {
  return products.toSorted((a, b) => b.name.localeCompare(a.name))
}

export function sortProductsByPriceAscending(products: Product[]) {
  return products.toSorted((a, b) => a.stock_rent - b.stock_rent)
}

export function sortProductsByPriceDescending(products: Product[]) {
  return products.toSorted((a, b) => b.stock_rent - a.stock_rent)
}

export function sortedProductsByMethod(
  sortMethod: string | null = "name-asc",
  products: Product[] | null
) {
  let sortedProducts = products || []
  switch (sortMethod) {
    case "name-asc":
      sortedProducts = sortProductsByNameAscending(sortedProducts)
      break
    case "name-desc":
      sortedProducts = sortProductsByNameDescending(sortedProducts)
      break
    case "price-asc":
      sortedProducts = sortProductsByPriceAscending(sortedProducts)
      break
    case "price-desc":
      sortedProducts = sortProductsByPriceDescending(sortedProducts)
      break
    default:
      sortedProducts = sortedProducts
      break
  }
  return sortedProducts
}
