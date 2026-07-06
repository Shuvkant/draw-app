import { useEffect, useState } from "react"
import { WS_URL } from "../app/config"

export function useSocket() {
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState<WebSocket>()
  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmQyMTY0ZC01M2ExLTQ5NDktYTU4Ni05Y2UxNzk1NmZiOWYiLCJpYXQiOjE3ODMyNDkzMTN9.-0zAxecoKeiKi5RDTFwYOAlo4CQ3KAHAQJ1Dt6ER5OM`)
    ws.onopen = () => {
      setLoading(false)
      setSocket(ws)
    }

  }, [])
  return {
    socket, loading
  }

}
