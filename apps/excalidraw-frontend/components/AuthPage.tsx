"use client"

import { SignIn } from "./SignIn";
import Signup from "./SignUp";

export async function AuthPage({ isSignin }: {
  isSignin: boolean
}) {
  return <div>
    {isSignin ? <SignIn isSignin={isSignin} /> : <Signup isSignin={isSignin} />}
  </div>
}
