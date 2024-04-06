import { useState } from "react"
import { useEvent } from "@hooks"
import { getSubtotal } from "@lib/cart"
import { formatPrice } from "@lib/format"

export function SubTotal() {
  const [cartSubtotal, setCartSubtotal] = useState(getSubtotal())

  useEvent("cart:updated", () => {
    setCartSubtotal(getSubtotal())
  })

  return (
    <span className="text-neutral-500">
      {cartSubtotal ? formatPrice(cartSubtotal) : 0}
      <span className="text-sm">COP</span>
    </span>
  )
}

export function ShippingCost({ shippingCost }: { shippingCost: number }) {
  return (
    <p className="flex justify-between">
      Gastos de envío:
      {shippingCost === 0 ? (
        <span className="text-green-600 font-medium">¡GRATIS!</span>
      ) : (
        <span>
          ${formatPrice(shippingCost)} <span className="text-sm">COP</span>
        </span>
      )}
    </p>
  )
}

export function TotalPayment({ shippingCost }: { shippingCost: number }) {
  const [cartTotal, setCartTotal] = useState(getSubtotal() + shippingCost)

  useEvent("cart:updated", () => {
    setCartTotal(getSubtotal() + shippingCost)
  })

  return (
    <span className="text-neutral-500">
      {cartTotal ? formatPrice(cartTotal) : 0}
      <span className="text-sm">COP</span>
    </span>
  )
}
