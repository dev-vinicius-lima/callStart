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
