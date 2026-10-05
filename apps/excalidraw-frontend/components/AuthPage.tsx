"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const endpoint = isSignin
        ? "http://localhost:3001/signin"
        : "http://localhost:3001/signup";

      const data = isSignin
        ? {
          email,
          password,
        }
        : {
          email,
          password,
          name,
        };

      if (isSignin) {

        const response = await axios.post(endpoint, data);
        const authHeader = response.data.token
        localStorage.setItem("authorization", authHeader)
        console.log(authHeader)


        console.log("Success:", response.data);

        router.push("/dashboard")

      }
      else {

        router.push("/signin")
      }


    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error:", error.response?.data);
        setError(error.response?.data.msg)
      } else {
        console.log("Something went wrong:", error);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-6 m-2 bg-gray-400 w-125 rounded">

        <form onSubmit={handleSubmit}>

          <div className="p-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-75 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="p-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-75 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {!isSignin && (
            <div className="p-2">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-75 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="bg-red-200 rounded p-2"
            >
              {isSignin ? "Sign In" : "Sign Up"}
            </button>
          </div>

        </form>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}

