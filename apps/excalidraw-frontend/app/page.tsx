import Link from "next/link"
export default function App() {
  return (
    <div>
      <div className="flex flex-row gap-3">
        <Link href="/signin">
          <button>SignIn</button></Link>
        <Link href="/signup">
          <button>SignUp</button></Link>
      </div>
      <div>Body section</div>
    </div>
  )
}
