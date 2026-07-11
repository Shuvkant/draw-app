import { SignIn } from "./SignIn";
export default function Signup({ isSignin }: { isSignin: boolean }) {
  return <div>
    <SignIn isSignin={isSignin} />
  </div>
}


