import React, { useEffect, useState, createContext } from 'react'
import Loading from '../components/Loading/Loading';
import { auth } from '../lib/firebase'


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    async function getAuth() {
      try {
        await auth().onAuthStateChanged(user => {
          setCurrentUser(user)
        })
        setPending(false)
      } catch (error) {
        alert('Ocorreu um erro ao tentar a autentificação')
      }
    }
    getAuth()
  }, [])

  if (pending) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
