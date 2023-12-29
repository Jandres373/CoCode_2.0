'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

//TODO tipar correctamente esto.
const UserSession = ({ children, session }: any) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
export default UserSession
