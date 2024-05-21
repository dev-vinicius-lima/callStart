import nextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handle = nextAuth(authOptions)

export { handle as GET, handle as POST }
