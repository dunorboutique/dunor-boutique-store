import type { CartItem } from "@types"

export function getCart<T = CartItem[]>(): T {
  return document.cookie.includes("user-cart")
    ? JSON.parse(
        decodeURIComponent(document.cookie).replace(
          /(?:(?:^|.*;\s*)user-cart\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        )
      )
    : []
}

export function setCart(cart: CartItem[]) {
  document.cookie = `user-cart=${encodeURIComponent(
    JSON.stringify(cart)
  )}; path=/; max-age=2592000; samesite=strict; secure`
}

export function getSubtotal() {
  const cart = getCart()
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
}

export function setItemQuantity(productId: string, quantity: number) {
  const cart = getCart()
  const currentProduct = cart.find(item => item.id === productId)
  if (currentProduct) currentProduct.quantity = quantity
  setCart(cart)
  window.dispatchEvent(new CustomEvent("cart:updated"))
}

export function addItemCart(productId: string, productPrice: number) {
  const cart = getCart()
  const currentProduct = cart.find(item => item.id === productId)
  if (currentProduct) currentProduct.quantity += 1
  else cart.push({ id: productId, price: productPrice, quantity: 1 } as CartItem)
  setCart(cart)
  window.dispatchEvent(new CustomEvent("cart:updated"))
}

export function removeItemCart(productId: string) {
  const cart = getCart()
  const newCart = cart.filter(item => item.id !== productId)
  setCart(newCart)
  window.dispatchEvent(new CustomEvent("cart:removed"))
}
