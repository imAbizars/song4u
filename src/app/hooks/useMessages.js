'use client'
import { useEffect, useState } from "react"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "@/app/lib/firebase/firebase"

export function useMessages() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true)
      try {
        const q = query(collection(db, "messages"))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setMessages(data)
      } catch (err) {
        console.error("Failed to fetch messages", err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [])

  return { messages, isLoading, error }
}
