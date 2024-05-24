import { Container } from '@/components/Container'
import Link from 'next/link'
import React from 'react'

const DashboardHeader = () => {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 items-center">
        <Link
          href="/dashboard"
          className="text-white hover:font-bold duration-300"
        >
          chamados
        </Link>
        <Link
          href="/dashboard/customer"
          className="text-white hover:font-bold duration-300"
        >
          clientes
        </Link>
      </header>
    </Container>
  )
}

export default DashboardHeader
