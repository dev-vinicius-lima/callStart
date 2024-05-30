import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import AuthProvider from '../providers/auth'
import { ModalProvider } from '@/providers/modal'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Call Start - seu sistema de chamados',
  description: 'gerencie seus chamados e atendementos de forma simples!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
