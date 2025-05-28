export interface User {
  id: string
  name: string
  lastName: string
  email: string
  dni: number
}

export type UpdateUser = Partial<Omit<User, 'id'>>

export interface UserUseCase {
  success: boolean
  data: User | null
  error: string | null
}

export interface UserRepository {
  createUser: (user: User) => Promise<User>
  getUser: (id: string) => Promise<User | null>
  updateUser: (setData: UpdateUser, id: string) => Promise<User | null>
}
