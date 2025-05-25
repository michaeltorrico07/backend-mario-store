import admin from 'firebase-admin'
import { firebaseKey } from '../config/envConfig'

const serviceAccount = JSON.parse(firebaseKey)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export const db = admin.firestore()

async function checkFirestoreConnection (): Promise<void> {
  try {
    await db.collection('test').doc('check').set({ test: 'ok' })
    console.log('✅ Firestore is working!')
  } catch (error) {
    console.error('❌ Firestore connection error:', error)
  }
}

void checkFirestoreConnection()
