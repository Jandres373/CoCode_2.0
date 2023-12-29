'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import content  from '@/components/layout/form/content.json'

export const LoginForm = () => {
  // Constants
  const { toast } = useToast()
  const router = useRouter()

  // Functions
  const onLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const credentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      rememberMe: formData.get('rememberMe') === 'true', 
    }

    const response = await signIn('credentials', {
      ...credentials,
      redirect: true,
      callbackUrl: '/',
    })

    if (response?.error)
      toast({
        variant: 'destructive',
        title: 'Scheduled: Catch up',
        description: response?.error,
      })

    if (response?.ok) {
      return toast({ title: 'success', description: 'Logged in' })
    }
    return
  }

  return (
    <form onSubmit={(event) => onLoginSubmit(event)} className="p-5 grid gap-5">
      <Input type="email" name="email" placeholder="email address"></Input>
      <Input type="password" name="password" placeholder="password"></Input>
      <div className="flex items-center space-x-2 ">
        <Checkbox id="rememberMe" name="rememberMe" value={'true'} />
        <label
          htmlFor="rememberMe"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
      </div>
      <Button type="submit">{content.loginButton.logIn}</Button>
    </form>
  )
}
