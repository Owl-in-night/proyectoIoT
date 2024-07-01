import { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import { dataEncrypt } from '../utils/data-encrypt'
import { dataDecrypt } from '../utils/data-decrypt'

export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  return context
}

export function AuthProvider ({ children }) {
  // const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  const signin = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const signout = () => signOut(auth)
  

  //Decrypt
  const userStorage = window.localStorage.getItem("user");
  const [user, setUser] = useState(
    dataDecrypt(userStorage) || null
  );

  const SigninWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    googleProvider.setCustomParameters({ hd: 'uvg.edu.gt' });
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(true)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  //Encrypt
  useEffect(() => {
    window.localStorage.setItem("user", dataEncrypt(user));
  }, [user]);

  return (
    <authContext.Provider value={{ signup, signin, user, signout, loading, SigninWithGoogle, resetPassword }}>
      {children}
    </authContext.Provider>
  )
}
