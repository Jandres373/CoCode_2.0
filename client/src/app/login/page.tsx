import { LoginForm } from '@/components/layout/form/client/loginForm'
import React from 'react'

const page = () => {
  return (
    <div className="h-[100svh] w-[100svw] flex flex-col md:flex-row">
      <section className="border-4 border-red-500 border-dashed h-1/2 md:h-full md:w-1/2">
        image
      </section>
      <section className="border-4 border-blue-500 border-dashed h-1/2 md:h-full md:w-1/2">
        <LoginForm />
      </section>
    </div>
  )
}

export default page
