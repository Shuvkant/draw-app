"use client";
import { WS_URL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMDNlZDgyMC0wODBkLTRjMmUtOTE0Mi0xYTczNjg0YjI0M2QiLCJpYXQiOjE3OTAzMTYzNjd9.sm9mmh8Ub9El-BZZ4pJio8zk1lzDCz-WbgVc8uXuNqA`)

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
