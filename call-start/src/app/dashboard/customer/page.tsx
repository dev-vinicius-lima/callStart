import { Container } from '@/components/Container'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import CardCustomer from './components/Card'
import prisma from '@/lib/prisma'

const Customer = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/')
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return (
    <Container>
      <main className="mt-9 mb-3">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 hover:bg-blue-700 duration-200 px-4 py-1 rounded text-white"
          >
            Novo cliente
          </Link>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
          {customers.map((customer) => (
            <CardCustomer key={customer.id} customer={customer} />
          ))}
        </section>
      </main>
    </Container>
  )
}

export default Customer
