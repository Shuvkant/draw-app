"use client"

import { InitDraw } from "@/app/draw";
import { WS_URL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null)
  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTEzYjMxNi04YTI3LTRhMTAtYTAyYi0xMjFjOGU0MjYxZDciLCJpYXQiOjE3ODMyNDg2ODR9.A3xapN0YrVjbCLp3Sj9qlZlh-ldL7n-_oIs5WEY2cEI`)

    ws.onopen = () => {
      setSocket(ws)
      ws.send(JSON.stringify({
        type: "join_room",
        roomId
      }))
    }


  }, [])

  useEffect(() => {

    if (canvasRef.current) {
      InitDraw(canvasRef.current, roomId)
    }

  }, [canvasRef]);
  if (!socket) {
    return <div>
      connecting to the server .....
    </div>
  }

  return <div>
    <Canvas roomId={roomId} />
  </div>

}
