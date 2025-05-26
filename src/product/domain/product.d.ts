export interface Product {
  _uuid: string
  name: string
  tags: string[]
  description: string
  image: string
  price: number
}

export type NewProduct = Omit<Product, '_uuid'>

export type UpdateProduct = Partial<Omit<Product, '_uuid'>>

export interface ProductUseCase {
  success: boolean
  data: Product | null | Product[]
  error: string | null
}

export interface ProductRepository {
  createProduct: (product: Product) => Promise<Product>
  getProductById: (id: string) => Promise<Product | null>
  updateProduct: (setData: UpdateProduct, id: string) => Promise <Product | null>
  getAllProducts: (tags?: string[]) => Promise<Product[]>
}
