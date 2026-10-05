"use client";

import axios from "axios";
import { useState } from "react";

export default function CreateRoom() {
  const [room, setRoom] = useState("");
  const [success, setSuccess] = useState("")

  const createRoom = async () => {
    if (!room) {
      setSuccess("Please enter the room name")
      return;
    }

    const authorization = localStorage.getItem("authorization");

    try {
      const response = await axios.post(
        "http://localhost:3001/room",
        {
          name: room,
        },
        {
          headers: {
            Authorization: authorization,
          },
        }
      );

      console.log(response.data);
      setSuccess(`${room} created with id ${response.data.roomId}`)
      console.log(setSuccess)
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  return (
    <div>
      <div className="m-5 p-2 flex flex-row">
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded"
          placeholder="Enter name of Room"
        />

        <button
          onClick={createRoom}
          className="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded"
        >
          Create Room
        </button>
      </div>
      <div>
        {success && (<p className="m-5 p-5">{success}</p>)}
      </div>
    </div>
  );
}
