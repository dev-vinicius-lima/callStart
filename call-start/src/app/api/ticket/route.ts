import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: 'not authorized' }, { status: 401 })
  }

  const { id } = await request.json()
  const findTicket = await prisma.ticket.findFirst({
    where: {
      id: id as string,
    },
  })

  if (!findTicket) {
    return NextResponse.json({ error: 'ticket not found' }, { status: 404 })
  }

  try {
    await prisma.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: 'FECHADO',
      },
    })
    return NextResponse.json({ message: 'Ticket fechado com sucesso!' })
  } catch (error) {
    console.log(error)
  }
}

export async function POST(request: Request) {
  const { customerId, description, name } = await request.json()

  if (!customerId || !description || !name) {
    return NextResponse.json(
      { error: 'Preencha todos os campos' },
      { status: 400 },
    )
  }
  try {
    await prisma.ticket.create({
      data: {
        name,
        description,
        customerId,
        status: 'ABERTO',
      },
    })
    return NextResponse.json({ message: 'Chamado aberto com sucesso!' })
  } catch (error) {
    return NextResponse.json(
      { error: 'failed to create ticket' },
      { status: 400 },
    )
  }
}
