import { UserUseCase, User } from '../../domain/user'
import { FirebaseUserRepository } from '../outbound/firebaseUserRepository'

const UserRepository = new FirebaseUserRepository()

export const createUserUseCase = async (data: User): Promise<UserUseCase> => {
  try {
    const user = await UserRepository.createUser(data)

    return { success: true, data: user, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
