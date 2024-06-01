import { Container } from '@/components/Container'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import TicketItem from './components/Ticket'
import prisma from '@/lib/prisma'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect('/')
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: session.user.id,
      status: 'ABERTO',
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: 'asc',
    },
  })

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            href="/dashboard/new"
            className="bg-blue-500 hover:bg-blue-700 duration-200 px-4 py-1 rounded text-white"
          >
            Abrir chamado
          </Link>
        </div>
        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left hidden sm:block">
                DATA CADASTRO
              </th>
              <th className="font-medium text-left ">STATUS</th>
              <th className="font-medium text-left ">###</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <h1 className="text-gray-600 text-center text-lg mt-11">
            Nenhum Ticket aberto foi encontrado!
          </h1>
        )}
      </main>
    </Container>
  )
}

export default Dashboard
