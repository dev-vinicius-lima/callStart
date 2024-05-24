import { Container } from '@/components/Container'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect('/')
  }

  return (
    <div>
      <Container>
        <h1>Página Dashboard</h1>
      </Container>
    </div>
  )
}

export default Dashboard
