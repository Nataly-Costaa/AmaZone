"use client"
import authAPI from "@/lib/api"

export default function Home() {
  return (
  <main className="w-full h-[100svh] flex justify-center items-center gap-x-2">
    <button onClick={() => {
      authAPI.login({
        email: "maria@email.com",
        password: "123456",
      })
    }}>Login</button>
    <button onClick={()=>{authAPI.logout()}}>Logout</button>
  </main>
  )
}
