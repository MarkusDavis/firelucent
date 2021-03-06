import React, { useEffect, useState, createContext } from 'react'
import Loading from '../components/Loading/Loading.js'

import { db } from '../lib/firebase.js'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [pending, setPending] = useState(true)

  useEffect(() => {
    async function getItems() {
      try {
        await db
          .collection('posts')
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot => {
            setPosts(
              snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
              }))
            )
            setPending(false)
          })
      } catch (error) {
        alert('Ocorreu um erro ao buscar os items')
      }
    }
    getItems()
  }, [])

  if (pending) {
    return <Loading />
  }

  return (
    <PostContext.Provider value={{ posts }}>{children}</PostContext.Provider>
  )
}
