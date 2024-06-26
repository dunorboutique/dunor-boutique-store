import { useEffect, useState } from "react"
import { setItemQuantity } from "@lib/cart"

interface QuantityPickerProps {
  productId: string
  initialAmount: number
}

export default function QuantityPicker({ productId, initialAmount }: QuantityPickerProps) {
  const [quantity, setQuantity] = useState(initialAmount)

  useEffect(() => {
    setItemQuantity(productId, quantity)
  }, [quantity])

  return (
    <div id="picker" className="flex gap-0.5 items-center">
      <button
        className="flex justify-center items-center size-5 bg-neutral-200 rounded-full text-base font-light"
        onClick={() => setQuantity(quantity - 1)}
      >
        –
      </button>
      <span className="shrink-0 size-5 text-center">{quantity}</span>
      <button
        className="flex justify-center items-center size-5 bg-neutral-200 rounded-full text-xl font-light"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  )
}
