'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaSpinner } from 'react-icons/fa'
import { ClientButtonProps } from '..'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

const loadingIcon = <FaSpinner className="animate-spin" />

export const ClientButton: React.FC<ClientButtonProps> = ({ user, button }) => {
  // State
  const [buttonText, setButtonText] = useState(
    !user ? button.content.login : button.content.logOut,
  )
  const [isLoading, setIsLoading] = useState(false)

  // Routes
  const router = useRouter()

  // Functions
  const redirectLogin = async () => {
    setIsLoading(true)
    router.push(button.links.login)
    setIsLoading(false)
  }

  const redirectLogout = async () => {
    setIsLoading(true)
    await signOut()
    setIsLoading(false)
  }
  useEffect(() => {
    if (user) return setButtonText(button.content.logOut)
    if (!user) return setButtonText(button.content.login)
  }, [user])

  return (
    <Button
      variant={!user ? 'outline' : 'destructive'}
      className="w-24 md:w-32"
      onClick={
        buttonText === button.content.login ? redirectLogin : redirectLogout
      }
    >
      {!isLoading ? buttonText : loadingIcon}
    </Button>
  )
}
