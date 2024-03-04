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

export type PartialCartItem = Pick<Product, 'id' | 'price'> & {
  quantity: number
}

export type BodygramResponse = {
  entry: {
    avatar: {
      data: string
      format: "obj"
      type: "highResolution"
    },
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
