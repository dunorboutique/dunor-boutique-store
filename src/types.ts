export type Product = {
  id: string
  name: string
  price: number
  image_url: string
  category: {
    name: string
  }
}

export type CartItem = Product & {
  quantity: number
}
