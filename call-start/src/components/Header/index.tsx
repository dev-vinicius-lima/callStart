import Link from 'next/link'
import React from 'react'
import { FiLogOut, FiUser } from 'react-icons/fi'

export const Header = () => {
  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-md">
      <div className="w-full items-center flex justify-between max-w-7xl mx-auto">
        <Link href={'/'}>
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">CALL</span> START
          </h1>
        </Link>

        <div className="flex gap-4 items-baseline">
          <Link href={'/dashboard'}>
            <FiUser size={26} color="#4B5563" />
          </Link>
          <button>
            <FiLogOut size={26} color="#4B5563" />
          </button>
        </div>
      </div>
    </header>
  )
}
