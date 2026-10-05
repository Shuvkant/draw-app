"use client"
import Link from "next/link";
export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">
        Welcome to your Dashboard
      </h1>
      <div className="mt-5 p-3 flex flex-row gap-3">
        <Link href={"/dashboard/createroom"} className="bg-white hover:bg-gray-100 
          text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Create new room</Link>
        <Link href={"/dashboard/joinroom"} className="bg-white hover:bg-gray-100 text-gray-800
          font-semibold py-2 px-4 border border-gray-400 rounded shadow">Join Room</Link>
      </div>
    </div>
  );
}
