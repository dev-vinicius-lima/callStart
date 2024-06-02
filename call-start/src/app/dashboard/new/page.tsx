import { Container } from '@/components/Container'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

const NewTicket = async () => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect('/')
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  })

  const handleRegisterTicket = async (formData: FormData) => {
    'use server'
    const name = formData.get('name')
    const description = formData.get('description')
    const customerId = formData.get('customer')

    if (!name || !description || !customerId) {
      return NextResponse.json(
        { error: 'Preencha todos os campos' },
        { status: 400 },
      )
    }

    await prisma.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: 'ABERTO',
        userId: session?.user.id,
      },
    })

    redirect('/dashboard')
  }

  return (
    <>
      <head>
        <title>Novo chamado - Call Start</title>
      </head>
      <Container>
        <main className="mt-9 mb-2">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-white px-4 py-1 rounded bg-gray-900 hover:scale-105 duration-200"
            >
              Voltar
            </Link>
            <h1 className="text-3xl font-bold">Novo chamado</h1>
          </div>
          <form className="flex flex-col mt-6" action={handleRegisterTicket}>
            <label className="mb-1 font-medium text-xl">
              Nome do chamado
              <input
                type="text"
                placeholder="Digite o nome do chamado"
                required
                className="w-full border-2 rounded-md px-2 mb-3 h-11"
                name="name"
              />
            </label>
            <label className="mb-1 font-medium text-xl">
              Descreva o problema:
              <textarea
                placeholder="Descreva o problema..."
                required
                className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
                name="description"
              />
            </label>
            {customers.length !== 0 && (
              <>
                <label>Selecione o cliente</label>
                <select
                  className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white"
                  name="customer"
                >
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            {customers.length === 0 && (
              <Link href="/dashboard/customer/new">
                Você ainda não tem nem um cliente,
                <span className="text-blue-500 font-medium">
                  Cadastrar cliente
                </span>
              </Link>
            )}
            <button
              type="submit"
              className="bg-blue-500 font-bold px-2 h-11 rounded-md text-white my-4 hover:bg-blue-600 duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={customers.length === 0}
            >
              Cadastrar
            </button>
          </form>
        </main>
      </Container>
    </>
  )
}

export default NewTicket
