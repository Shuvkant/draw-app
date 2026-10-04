"use client";
import { WS_URL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhOWE5ZGQyMS1kZWU4LTQ3ZWUtYWU0Yy01ZGMxYjI3YTJhNzMiLCJpYXQiOjE3OTEwOTY0MDN9.USnItVUswqPuXgmMFcs9UvN4vNjNFtpXVZLe4CJq3mU`)

    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        type: "join_room",
        roomId
      });
      console.log(data);
      ws.send(data)
    }

  }, [])

  if (!socket) {
    return <div>
      Connecting to server....
    </div>
  }

  return <div>
    <Canvas roomId={roomId} socket={socket} />
  </div>
}
