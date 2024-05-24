import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: 'not authorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'missing id' }, { status: 400 })
  }

  try {
    await prisma.customer.delete({
      where: {
        id: id as string,
      },
    })
    return NextResponse.json({ message: 'Cliente deletado com sucesso!' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'failed to delete customer' },
      { status: 400 },
    )
  }
}
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: 'not authorized' }, { status: 401 })
  }
  const { name, email, phone, address, userId } = await request.json()

  try {
    await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        address: address || '',
        userId,
      },
    })
    return NextResponse.json({ message: 'Cliente cadastrado com sucesso!' })
  } catch (error) {
    return NextResponse.json(
      { error: 'failed to create customer' },
      { status: 400 },
    )
  }
}
