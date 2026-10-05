"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinRoom() {
  const router = useRouter();
  const [room, setRoom] = useState([]);

  const joinRoom = async () => {
    try {
      const authorization = localStorage.getItem("authorization");

      const response = await axios.get(
        "http://localhost:3001/rooms",
        {
          headers: {
            Authorization: authorization,
          },
        }
      );

      setRoom(response.data.msg);
    } catch (error) {
      console.error("Failed to get rooms:", error);
    }
  };


  const onClickhandler = (id: number) => {
    router.push(`/canvas/${id}`)

  }
  return (
    <div className="min-h-screen flex flex-col items-center p-10">
      <button
        onClick={joinRoom}
        className="mb-8 rounded border border-blue-500 px-5 py-2 font-semibold text-blue-700 hover:bg-blue-50"
      >
        List Available Rooms
      </button>

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="grid grid-cols-3 rounded-t-lg bg-gray-100 px-6 py-3 font-bold">
          <p>Room Name</p>
          <p>Room ID</p>
          <p>Join room</p>
        </div>

        {/* Rooms */}
        <div className="divide-y border border-gray-200">
          {room.map((room) => (
            <div
              key={room.id}
              className="grid grid-cols-3 items-center px-6 py-4 hover:bg-gray-50"
            >
              <p className="font-medium text-gray-800">
                {room.slug}
              </p>

              <p className="text-gray-500">
                {room.id}
              </p>
              <button onClick={() => onClickhandler(room.id)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Join room</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
