export type User = {
  id: string
  email: string
  fullName: string
  avatarUrl: string
}

export type Product = {
  id: string
  name: string
  stock_rent: number
  debut_rent: number
  price: number
  image_url: string
  category: {
    name: string
  }
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "canceled"
export type OrderWithProducts = Order & { products: CartItem[] }
export type Order = {
  id: string
  user: User
  products_id_quantity: Array<{ id: string; quantity: number }>
  status: string
  total: number
  created_at: string
}
export type OrderCreate = Omit<Order, "id" | "user" | "created_at"> & { user_id: string }

export type CartItem = Product & {
  quantity: number
}

export type PartialCartItem = Pick<Product, "id" | "price"> & {
  quantity: number
}

export type BodygramResponse = {
  entry: {
    avatar: {
      data: string
      format: "obj"
      type: "highResolution"
    }
    createdAt: number
    customScanId: string
    error: {
      code: string
    }
    id: string
    input: {
      photoScan: {
        age: number
        gender: string
        height: number
        weight: number
      }
    }
    measurements: Array<{
      name: string
      unit: "mm"
      value: number
    }>
    status: string
  }
}

export type BodygramRequestData = {
  age: number
  weight: number
  height: number
  gender: string
  frontPhoto: string
  rightPhoto: string
}

export type UserMeasure = {
  user_id: string
  measures: Array<{ name: string; value: string }>
  user_info: {
    age: number
    height: number
    weight: number
    gender: string
  }
}

// Types for sending order email
export type UserOrderData = {
  fullName: string
  email: string
  phone: string
  address: string
}

export type OrderData = {
  id: string
  total: number
  created_at: string
  products: {
    name: string
    price: number
    quantity: number
    image_url: string
  }[]
}

export type UserOrderDetails = {
  fullName: string
  email: string
  phone: string
  address: string
  cardName: string
  cardNumber: string
  cardExpiration: string
  cardCvv: string
}
