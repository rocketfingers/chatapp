import { ref } from 'vue'
import { db } from './firebase.js'
import { user, isLoggedIn } from './authuser.js'
import { collection, query, orderBy, limit, onSnapshot, serverTimestamp, doc, setDoc } from 'firebase/firestore'

const messagesCollection = collection(db, 'messages')
const messagesQuery = query(messagesCollection, orderBy('createdAt', 'desc'), limit(100))

export const messages = ref([])
export const unsubscribe = () => {
  onSnapshot(messagesQuery, snapshot => {
    messages.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })
}
export const sendMessage = async txt => {
  if (!isLoggedIn.value) { return }

  const newMessageRef = doc(collection(db, 'messages'))

  const newMessage = {
    userName: user.value.displayName,
    userId: user.value.uid,
    userPhotoUrl: user.value.photoURL,
    text: txt,
    createdAt: serverTimestamp()
  }

  await setDoc(newMessageRef, newMessage)
}
