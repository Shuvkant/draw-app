import axios from "axios"
import { useState } from "react"

export async function SignIn({ isSignin }: { isSignin: boolean }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  async function signup() {
    const response = await axios.post("http://localhost:3000", {
      email,
      password,
      name
    })
    console.log(response)

  }
  return <div className="w-screen h-screen flex justify-center items-center">
    <div className="p-6 m-2 bg-gray-700 rounded">
      <div className="flex flex-col p-4 gap-3">
        <input className="outline-2 outline-offset-2 outline-solid rounded w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
        <input className="outline-2 outline-offset-2 outline-solid rounded w-full" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
        {!isSignin && <input className="outline-2 outline-offset-2 outline-solid rounded w-full" placeholder="name" onChange={(e) => setName(e.target.value)} />}
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => { signup }}>{isSignin ? "Sign In" : "Sign Up"}</button>
      </div>
    </div>
  </div>

}
