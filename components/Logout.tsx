"use client"

import { signOut } from "next-auth/react"

const Logout = () => {
  return (
    <button onClick= {() => signOut({ callbackUrl: `${window.location.origin}`})} className="bg-blue-950 text-white rounded-[6px] px-[65px] py-[11px] ">
        Sign Out
    </button>
  )
}

export default Logout