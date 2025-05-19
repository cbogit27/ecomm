export interface Product {
    id: string
  title: string
  price: number
  originalPrice?: number
  image: string
    description: string
  }

  
  
  export interface Collection {
    id: string
    name: string
    slug: string
    products: Product[]
  }
  
  // Response types for API calls
  export type CollectionResponse = Collection | null
  export type ProductResponse = Product | null