"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col">
        <div className="p-2"> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center" onClick={() => { router.push(`/signup`) }}>sign Up</button>
        </div>
        <div className="p-2"> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center" onClick={() => { router.push(`/signin`) }}>sign In</button></div>
      </div>

    </div>
  );
}
