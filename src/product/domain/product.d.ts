export interface Product {
  id: string
  name: string
  category: 'Comida' | 'Bebida' | 'Snack'
  description: string
  image: string
  price: number
  inMenu: boolean
}

export type NewProduct = Omit<Product, 'id'>

export type UpdateProduct = Partial<Omit<Product, 'id'>>

export interface ProductUseCase {
  success: boolean
  data: Product | null | Product[] | string
  error: string | null
}

export interface ProductRepository {
  createProduct: (product: NewProduct) => Promise<Product>
  getProductById: (id: string) => Promise<Product | null>
  updateProduct: (setData: UpdateProduct, id: string) => Promise <Product | null>
  getAllProducts: (tags?: string[]) => Promise<Product[]>
}
