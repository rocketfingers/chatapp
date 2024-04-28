/* eslint-disable no-unused-vars */
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBFFlkY7V2J7chuC10lulu5hSOZv3lpoig',
  authDomain: 'chatapp-78d75.firebaseapp.com',
  projectId: 'chatapp-78d75',
  storageBucket: 'chatapp-78d75.appspot.com',
  messagingSenderId: '549890132682',
  appId: '1:549890132682:web:c4d72d8a18d87945eec233',
  measurementId: 'G-5R4FZ19DF3'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const provider = new GoogleAuthProvider()
const auth = getAuth()
const db = getFirestore(app)
export function LoginProm () {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result)
        // const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        resolve(user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code
        // const errorMessage = error.message
        // // The email of the user's account used.
        // const email = error.customData.email
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
        reject(error)
      })
  })
}

export { auth, app, provider, analytics, db }
