import { useEffect, useState } from "preact/hooks"
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
    <div id="picker" class="flex gap-0.5 items-center">
      <button
        class="flex justify-center items-center size-5 bg-neutral-200 rounded-full text-base font-light"
        onClick={() => setQuantity(quantity - 1)}
      >
        –
      </button>
      <span class="shrink-0 size-5 text-center">{quantity}</span>
      <button
        class="flex justify-center items-center size-5 bg-neutral-200 rounded-full text-xl font-light"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  )
}
