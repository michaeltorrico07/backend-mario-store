import { UserUseCase, UpdateUser } from '../../domain/user'
import { FirebaseUserRepository } from '../outbound/firebaseUserRepository'

const UserRepository = new FirebaseUserRepository()

export const updateUserUseCase = async (setData: UpdateUser, id: string): Promise<UserUseCase> => {
  try {
    const updatedUser = await UserRepository.updateUser(setData, id)

    return { success: true, data: updatedUser, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
