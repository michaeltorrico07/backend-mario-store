import { db } from '../../../infrastructure/db/firebase'
import { UserRepository, User, UpdateUser } from '../../domain/user'

export class FirebaseUserRepository implements UserRepository {
  async createUser (user: User): Promise<User> {
    const { id, ...userData } = user
    const userRef = db.collection('users').doc(id)
    await userRef.set({ ...userData, rol: 'USER' })
    return user
  }

  async getUser (id: string): Promise<User | null> {
    const snapshot = await db.collection('users').doc(id).get()
    const user = snapshot.data() as User
    return user
  }

  async updateUser (setData: UpdateUser, id: string): Promise<User | null> {
    const userRef = db.collection('users').doc(id)
    await userRef.update(setData)
    const updatedSnapshot = await userRef.get()
    const user = updatedSnapshot.data() as User
    return user
  }
}
