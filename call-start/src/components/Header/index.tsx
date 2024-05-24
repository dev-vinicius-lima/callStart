'use client'
import Link from 'next/link'
import { FiLoader, FiLock, FiLogOut, FiUser } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

export const Header = () => {
  const { status, data } = useSession()
  function handleLogin() {
    signIn()
  }

  function handleLogout() {
    signOut()
  }
  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-md">
      <div className="w-full items-center flex justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">CALL</span> START
          </h1>
        </Link>

        {status === 'loading' && (
          <button>
            <FiLoader size={26} color="#4B5563" className="animate-spin" />
          </button>
        )}

        {status === 'unauthenticated' && (
          <button onClick={handleLogin}>
            <FiLock size={26} color="#4B5563" />
          </button>
        )}
        {status === 'authenticated' && (
          <div className="flex gap-2 justify-center items-CENTER">
            <Link
              href="/dashboard"
              className="text-xs flex gap-2 hover:text-blue-500 font-semibold"
            >
              Olá, {data?.user.name}
              <FiUser size={26} color="#4B5563" />
            </Link>
            <button onClick={handleLogout}>
              <FiLogOut size={26} color="#fd0707" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
