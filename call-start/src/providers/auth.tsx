'use client'
import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import React from 'react'

const AuthProvider = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
