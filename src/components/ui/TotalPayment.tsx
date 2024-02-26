import { useState, useEffect } from "preact/hooks"
import { getSubtotal } from "@lib/cart"
import { formatPrice } from "@lib/format"

function useEvent(event: string, callback: EventListener) {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [event, callback])
}

export function SubTotal() {
  const [cartSubtotal, setCartSubtotal] = useState(getSubtotal())

  useEvent("cart:updated", () => {
    setCartSubtotal(getSubtotal())
  })

  return (
    <span class="text-neutral-500">
      {cartSubtotal ? formatPrice(cartSubtotal) : 0}
      <span class="text-sm">COP</span>
    </span>
  )
}

export function TotalPayment({ shippingCost }: { shippingCost: number }) {
  const [cartTotal, setCartTotal] = useState(getSubtotal() + shippingCost)

  useEvent("cart:updated", () => {
    setCartTotal(getSubtotal() + shippingCost)
  })

  return (
    <span class="text-neutral-500">
      {cartTotal ? formatPrice(cartTotal) : 0}
      <span class="text-sm">COP</span>
    </span>
  )
}
